/**
 * Created by kyckyc on 2/10/17.
 */
import { combineReducers } from 'redux';
import { connect } from 'react-redux';
// import XRegExp from 'xregexp';
import { checkRequirement, checkBool, checkFloat, checkInt, checkString } from './validators';
import { arrayShouldBeLarger } from './const';
import { castValueToType, getType } from './helpers';

class FormConstructor {
    actions = null;
    reducers = {};
    selectors = {};
    formState = {};
    applicationState = {};
    postInProgress = false;
    postAction = () => {};
    dispatch = (args) => {
        throw `[FormConstructor] "dispatch" function was not defined, can't dispatch an action: ${args}`;
    };

    constructor(formName, formScheme, formValidatorFunc = null) {
        this.formName = formName;
        this.formScheme = formScheme;
        this.formValidatorFunc = formValidatorFunc;

        this.__complementScheme(this.formScheme);

        this.RESET_ALL = `@forms/${this.formName}/RESET_ALL_FIELDS`;
        this.RESET_ALL_ERRORS = `@forms/${this.formName}/RESET_ALL_ERRORS`;

        this.resetAllFields = { type: this.RESET_ALL };
        this.resetAllErrors = { type: this.RESET_ALL_ERRORS };

        this.reducers = combineReducers({
            fields: this.createFieldsReducers({ schema: this.formScheme }),
            errors: this.createFormErrorsReducer(),
        });

        this.actions = {
            fields: this.createFieldsActions({ schema: this.formScheme }),
            resetAllErrors: () => this.dispatch(this.resetAllErrors),
            resetAllFields: () => this.dispatch(this.resetAllFields),
            formSetErrors: (errors) => this.dispatch(::this.createFormErrorsAction(errors)),
            formValidate: (nextAction) => ::this.validateForm(nextAction),
            formDump: () => ::this.dumpForm(),
            formPost: ::this.post,
        };

        // Create connectHOC
        this.connect = connect(::this.__connectState, ::this.__connectDispatch, null, { forwardRef: true });
    }

    __complementScheme(schema) {
        for (let fieldName in schema) {
            if (schema[fieldName].type === 'array') {
                // Define entity type if not defined.
                if (schema[fieldName].entityType === undefined) {
                    schema[fieldName].entityType = getType(schema[fieldName].entitySchema) === 'object' ? 'object' : schema[fieldName].entitySchema;
                }
                if (schema[fieldName].entityType === 'object' && schema[fieldName].entitySchema === undefined) {
                    throw '[FormConstructor] entityType is set as `object`, but no `entitySchema` is provided';
                }
            }
        }
    }

    __connectState(state) {
        // console.debug('State equality: ', this.selectForm(state) == this.formState);
        this.formState = this.selectForm(state);
        this.applicationState = state;
        return {
            formState: this.formState,
        };
    }

    __connectDispatch(dispatch) {
        // console.debug('Dispatch fucntion equality: ', dispatch == this.dispatch);
        this.dispatch = dispatch;
        return {
            formActions: this.actions,
        };
    }

    createFieldsReducers({ schema, level = '' }) {
        let reducers = {};
        for (let fieldName in schema) {
            if (schema[fieldName].type === 'ref') {
                continue;
            }
            if (schema[fieldName].type === 'nested') {
                reducers[fieldName] = this.createFieldsReducers({
                    schema: schema[fieldName].schema,
                    level: `${level}/${fieldName}`,
                });
                continue;
            }
            if (schema[fieldName].type === 'array') {
                reducers[fieldName] = this.createArrayReducer({
                    fieldName,
                    level,
                    defaultValue: schema[fieldName].defaultValue,
                    required: schema[fieldName].required,
                    entitySchema: schema[fieldName].entitySchema,
                    entityType: schema[fieldName].entityType,
                });
                continue;
            }
            reducers[fieldName] = this.createFieldReducer({
                fieldName,
                level,
                defaultValue: schema[fieldName].defaultValue,
                required: schema[fieldName].required,
                type: schema[fieldName].type,
            });
        }
        return combineReducers(reducers);
    }

    createFieldsActions({ schema, level = '' }) {
        let actions = {};
        for (let fieldName in schema) {
            if (schema[fieldName].type === 'ref') {
                continue;
            }
            if (schema[fieldName].type === 'nested') {
                actions[fieldName] = this.createFieldsActions({
                    schema: schema[fieldName].schema,
                    level: `${level}/${fieldName}`,
                });
                continue;
            }
            if (schema[fieldName].type === 'array') {
                // Map actions
                actions[fieldName] = {
                    set: this.createArrayAction({ fieldName, level, type: 'set' }),
                    push: this.createArrayAction({ fieldName, level, type: 'push' }),
                    delete: this.createArrayAction({ fieldName, level, type: 'delete' }),
                    setErrors: this.createArrayAction({ fieldName, level, type: 'errors' }),
                    setFieldValue: this.createArrayAction({ fieldName, level, type: 'fieldValue' }),
                    setFieldErrors: this.createArrayAction({ fieldName, level, type: 'fieldErrors' }),
                    reset: this.createArrayAction({ fieldName, level, type: 'reset' }),
                };
                // Map validators
                actions[fieldName]['validate'] = this.createArrayValidator({
                    level,
                    fieldName,
                    entitySchema: schema[fieldName].entitySchema,
                    entityType: schema[fieldName].entityType,
                    validationFunc: schema[fieldName].validationFunc,
                    setErrors: actions[fieldName]['arraySetErrors'],
                    setFieldErrors: actions[fieldName]['arraySetFieldErrors'],
                });
                continue;
            }
            // Map actions
            actions[fieldName] = {
                setValue: this.createFieldAction({ fieldName, level, type: 'setValue' }),
                setRequired: this.createFieldAction({ fieldName, level, type: 'setRequired' }),
                setErrors: this.createFieldAction({ fieldName, level, type: 'setErrors' }),
                reset: this.createFieldAction({ fieldName, level, type: 'reset' }),
            };
            // Map field validator
            actions[fieldName]['validate'] = this.createFieldValidator({
                level,
                fieldName,
                validationFunc: schema[fieldName].validationFunc,
                setErrors: actions[fieldName]['setErrors'],
            });
        }
        return actions;
    }

    createFieldAction({ fieldName, level, type }) {
        let FIELD_SET_VALUE = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_SET_VALUE`;
        let FIELD_SET_SET_REQUIREMENT = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_SET_REQUIREMENT`;
        let FIELD_SET_ERRORS = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_SET_ERRORS`;
        let FIELD_RESET = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_RESET`;
        if (type === 'setValue') {
            return (value) => {
                if (!!value && value.target) {
                    value = value.target.value;
                }
                this.dispatch({
                    type: FIELD_SET_VALUE,
                    value,
                });
            };
        }
        if (type === 'setRequired') {
            return (required) => {
                this.dispatch({
                    type: FIELD_SET_SET_REQUIREMENT,
                    required,
                });
            };
        }
        if (type === 'setErrors') {
            return (errors) => {
                this.dispatch({
                    type: FIELD_SET_ERRORS,
                    errors,
                });
            };
        }
        if (type === 'reset') {
            return () => {
                this.dispatch({
                    type: FIELD_RESET,
                });
            };
        }
        throw '[Forms] Wrong Action type';
    }

    createFieldReducer({ fieldName, level, defaultValue = '', required = false, type }) {
        let FIELD_SET_VALUE = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_SET_VALUE`;
        let FIELD_SET_SET_REQUIREMENT = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_SET_REQUIREMENT`;
        let FIELD_SET_ERRORS = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_SET_ERRORS`;
        let FIELD_RESET = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_RESET`;
        return (state = { errors: [], value: defaultValue, required, type }, action) => {
            switch (action.type) {
                case FIELD_SET_VALUE:
                    return { ...state, value: action.value, errors: [] };
                case FIELD_SET_SET_REQUIREMENT:
                    return { ...state, required: action.required };
                case FIELD_SET_ERRORS:
                    return { ...state, errors: action.errors };
                case this.RESET_ALL_ERRORS:
                    return { ...state, errors: [] };
                case FIELD_RESET:
                case this.RESET_ALL:
                    return { ...state, value: defaultValue, errors: [] };
                default:
                    return state;
            }
        };
    }

    createArrayAction({ fieldName, level, type }) {
        let ARRAY_SET = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_SET`;
        let ARRAY_PUSH = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_PUSH`;
        let ARRAY_DELETE = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_DELETE`;
        let ARRAY_SET_ERRORS = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_ARRAY_SET_ERRORS`;
        let ARRAY_SET_FIELD_VALUE = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_ARRAY_SET_FIELD_VALUE`;
        let ARRAY_SET_FIELD_ERRORS = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_ARRAY_SET_FIELD_ERRORS`;
        let ARRAY_RESET = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_ARRAY_RESET`;
        if (type === 'set') {
            return (value) => {
                this.dispatch({
                    type: ARRAY_SET,
                    value,
                });
            };
        }
        if (type === 'push') {
            return (item, index = -1) => {
                this.dispatch({
                    type: ARRAY_PUSH,
                    item,
                    index,
                });
            };
        }
        if (type === 'delete') {
            return (index = -1) => {
                this.dispatch({
                    type: ARRAY_DELETE,
                    index,
                });
            };
        }
        if (type === 'errors') {
            return (errors) => {
                this.dispatch({
                    type: ARRAY_SET_ERRORS,
                    errors,
                });
            };
        }
        if (type === 'fieldValue') {
            return (id, field, value) => {
                if (!!value && value.target) {
                    value = value.target.value;
                }
                this.dispatch({
                    type: ARRAY_SET_FIELD_VALUE,
                    id,
                    field,
                    value,
                });
            };
        }
        if (type === 'fieldErrors') {
            return (index, field, errors) => {
                this.dispatch({
                    type: ARRAY_SET_FIELD_ERRORS,
                    index,
                    field,
                    errors,
                });
            };
        }
        if (type === 'reset') {
            return () => {
                this.dispatch({
                    type: ARRAY_RESET,
                });
            };
        }
    }

    __mapArrayIntoRedux(value, entitySchema, entityType) {
        // Map array in redux store
        let entities = {};
        let ids = [];
        if (entityType === 'object') {
            // console.debug('[FormConstructor] default value is objects, parse their content and schema');
            value.forEach((item, index) => {
                let __item = {};
                Object.keys(item).forEach((_key) => {
                    __item[_key] = {
                        value: item[_key],
                        errors: [],
                        required: entitySchema[_key]['required'],
                        type: entitySchema[_key]['type'],
                    };
                });
                entities[index] = __item;
                ids.push(index);
            });
        } else {
            // console.debug('[FormConstructor] default value is not array of objects, put directly');
            value.forEach((item, index) => {
                entities[index] = item;
                ids.push(index);
            });
        }
        return { ids, entities };
    }

    createArrayReducer({ fieldName, level, defaultValue = null, required = 0, entitySchema, entityType }) {
        let ARRAY_SET = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_SET`;
        let ARRAY_PUSH = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_PUSH`;
        let ARRAY_DELETE = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_DELETE`;
        let ARRAY_SET_ERRORS = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_ARRAY_SET_ERRORS`;
        let ARRAY_SET_FIELD_VALUE = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_ARRAY_SET_FIELD_VALUE`;
        let ARRAY_SET_FIELD_ERRORS = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_ARRAY_SET_FIELD_ERRORS`;
        let ARRAY_RESET = `@forms/${this.formName}${level}/${fieldName.toUpperCase()}_ARRAY_RESET`;

        let initialIds = [];
        let initialEntities = {};
        if (defaultValue !== null) {
            ({ ids: initialIds, entities: initialEntities } = this.__mapArrayIntoRedux(defaultValue, entitySchema, entityType));
        }
        return (state = { errors: [], entities: initialEntities, ids: initialIds, required }, action) => {
            let freeId = 0;
            while (state.ids.indexOf(freeId) !== -1) {
                freeId += 1;
            }
            let targetIndex = action.index === -1 ? state.ids.length : action.index;
            switch (action.type) {
                case ARRAY_SET:
                    return {
                        ...state,
                        ...this.__mapArrayIntoRedux(action.value, entitySchema, entityType),
                        errors: [],
                    };
                case ARRAY_PUSH:
                    let __itemToPush;
                    if (entityType === 'object') {
                        // Convert item to the form format factor.
                        __itemToPush = {};
                        Object.keys(action.item).forEach((_key) => {
                            __itemToPush[_key] = {
                                value: action.item[_key],
                                required: entitySchema[_key]['required'],
                                type: entitySchema[_key]['type'],
                                errors: [],
                            };
                        });
                    } else {
                        __itemToPush = action.item;
                    }
                    return {
                        ...state,
                        entities: {
                            ...state.entities,
                            [freeId]: __itemToPush,
                        },
                        ids: [...state.ids.slice(0, targetIndex), freeId, ...state.ids.slice(targetIndex)],
                        errors: [],
                    };
                case ARRAY_DELETE:
                    let { [state.ids[targetIndex]]: omit, ...entities } = state.entities;
                    return {
                        ...state,
                        entities,
                        ids: state.ids.filter((item, index) => index !== targetIndex),
                        errors: [],
                    };
                case ARRAY_SET_ERRORS:
                    return {
                        ...state,
                        errors: action.errors,
                    };
                case ARRAY_SET_FIELD_VALUE:
                    if (entityType !== 'object') {
                        console.error("[FormConstructor] You can't set field value for non object type");
                        return state;
                    }
                    return {
                        ...state,
                        entities: {
                            ...state.entities,
                            [action.id]: {
                                ...state.entities[action.id],
                                [action.field]: {
                                    ...state.entities[action.id][action.field],
                                    value: action.value,
                                    errors: [],
                                },
                            },
                        },
                    };
                case ARRAY_SET_FIELD_ERRORS:
                    if (entityType !== 'object') {
                        console.error("[FormConstructor] You can't set field errors for non object type");
                        return state;
                    }
                    return {
                        ...state,
                        entities: {
                            ...state.entities,
                            [state.ids[action.index]]: {
                                ...state.entities[state.ids[action.index]],
                                [action.field]: {
                                    ...state.entities[state.ids[action.index]][action.field],
                                    errors: action.errors,
                                },
                            },
                        },
                    };
                case this.RESET_ALL_ERRORS:
                    let newState = { ...state, errors: [] };
                    if (entityType === 'object') {
                        // Remove all errors from all object fields.
                        let _entity;
                        newState.ids.forEach((entityId) => {
                            _entity = newState.entities[entityId];
                            Object.keys(_entity).forEach((_key) => {
                                _entity[_key]['errors'] = [];
                            });
                        });
                    }
                    return newState;
                case ARRAY_RESET:
                case this.RESET_ALL:
                    return {
                        errors: [],
                        entities: initialEntities,
                        ids: initialIds,
                    };
                default:
                    return state;
            }
        };
    }

    createFormErrorsAction(errors) {
        let FORM_ERROR = `@forms/${this.formName}/FORM_SET_ERRORS`;
        return {
            type: FORM_ERROR,
            errors,
        };
    }

    createFormErrorsReducer() {
        let FORM_ERROR = `@forms/${this.formName}/FORM_SET_ERRORS`;
        return (state = [], action) => {
            if (RegExp(`^@forms\/${this.formName}.*?(SET_FIELD_VALUE|SET_VALUE)$`).test(action.type)) {
                return [];
            }
            if (action.type === this.RESET_ALL_ERRORS || action.type === this.RESET_ALL) {
                return [];
            }
            if (action.type === FORM_ERROR) {
                return action.errors;
            }
            return state;
        };
    }

    selectForm(state) {
        return state.application.forms[this.formName];
    }

    selectFieldByLevel(partOfState, level, fieldName) {
        level.split('/').forEach((__level) => {
            if (__level !== '') {
                partOfState = partOfState[__level];
            }
        });
        return partOfState[fieldName];
    }

    createFieldValidator({ level, fieldName, validationFunc, setErrors }) {
        // console.debug('Create validator for: ', fieldName);
        return () => {
            let field = this.selectFieldByLevel(this.formState, level, fieldName);
            // console.debug('Seleced field:', field);
            this.basicFieldValidation({ field, validationFunc, setErrors });
        };
    }

    createArrayValidator({ level, fieldName, entitySchema, validationFunc, setArrayErrors, setFieldErrors }) {
        return () => {
            let array = this.selectFieldByLevel(this.formState, level, fieldName);
            this.basicArrayValidation({ array, entitySchema, validationFunc, setArrayErrors, setFieldErrors });
        };
    }

    /**
     *
     * @param field
     * @param validationFunc
     * @param setErrors
     * @param state
     * @returns {Boolean}
     */
    basicFieldValidation({ field, validationFunc = null, setErrors }) {
        // console.debug('validate field: ', field, validationFunc);
        let required = field.required || false;
        let value = field.value;
        let type = field.type;

        let errors = [];

        // Check filed requirement
        if (required) {
            errors = errors.concat(checkRequirement(value, type));
            // console.debug('requirement errors:', errors);
            if (errors.length > 0) {
                setErrors(errors);
                return true;
            }
        } else if (/^\s*$/.test(value) || value === undefined) {
            // Empty or undefined value and not required, omit additional validation
            return false;
        }

        // Checking primitive type
        if (value !== null) {
            switch (type) {
                case 'int':
                    errors = errors.concat(checkInt(value));
                    break;
                case 'float':
                    errors = errors.concat(checkFloat(value));
                    break;
                case 'bool':
                    errors = errors.concat(checkBool(value));
                    break;
            }
        }

        // console.debug('type errors', errors);
        // Then specific validation function, if we have some.
        if (errors.length === 0 && validationFunc !== null) {
            // console.debug('Call validation func, ', validationFunc);
            errors = errors.concat(validationFunc(value, this.applicationState) || []);
        }
        if (errors.length > 0) {
            setErrors(errors);
            return true;
        }
        return false;
    }

    /**
     *
     * @param field
     * @param schema
     * @param setArrayErrors
     * @param setFieldErrors
     * @param state
     * @returns {boolean}
     */
    basicArrayValidation({ array, entitySchema, validationFunc = null, setArrayErrors, setFieldErrors }) {
        let required = array.required || 0;
        let _ids = array.ids;
        let _entities = array.entities;
        let _type = array.type;

        // Validate array size
        if (_ids.length < required) {
            setArrayErrors([arrayShouldBeLarger]);
            return true;
        }

        // Validate array entries.
        let havingErrors = false;
        _ids.forEach((id, index) => {
            if (_type === 'object') {
                Object.keys(_entities[id]).forEach((fieldName) => {
                    let fieldHaveErrors = this.basicFieldValidation({
                        field: _entities[id][fieldName],
                        validationFunc: entitySchema[fieldName].validationFunc,
                        setErrors: (errors) => {
                            setFieldErrors(index, fieldName, errors);
                        },
                    });
                    if (fieldHaveErrors) {
                        havingErrors = true;
                    }
                });
            } else {
                havingErrors = this.basicFieldValidation({
                    field: _entities[id],
                    setErrors: setArrayErrors,
                });
            }
        });
        if (havingErrors) {
            return true;
        }

        // Global array validation
        if (validationFunc !== null) {
            let errors = validationFunc(_ids.map((id) => _entities[id])) || [];
            if (errors.length > 0) {
                setArrayErrors(errors);
                return true;
            }
        }
        return false;
    }

    recursiveFieldsValidation({ formState, actions = this.actions.fields, schema = this.formScheme }) {
        // console.debug('recursiveFieldsValidation');
        let havingErrors = false;
        for (let fieldName in schema) {
            // console.debug(fieldName);
            if (schema[fieldName].type === 'ref') {
                continue;
            }
            if (schema[fieldName].type === 'nested') {
                havingErrors =
                    this.recursiveFieldsValidation({
                        formState: formState[fieldName],
                        schema: schema[fieldName].schema,
                        actions: actions[fieldName],
                    }) || havingErrors;
                continue;
            }
            if (schema[fieldName].type === 'array') {
                havingErrors =
                    this.basicArrayValidation({
                        array: formState[fieldName],
                        entitySchema: schema[fieldName].entitySchema,
                        validationFunc: schema[fieldName].validationFunc,
                        setArrayErrors: actions[fieldName]['setErrors'],
                        setFieldErrors: actions[fieldName]['setFieldErrors'],
                    }) || havingErrors;
                continue;
            }
            // console.debug('basic');
            havingErrors =
                this.basicFieldValidation({
                    field: formState[fieldName],
                    validationFunc: schema[fieldName].validationFunc,
                    setErrors: actions[fieldName]['setErrors'],
                }) || havingErrors;
        }
        return havingErrors;
    }

    validateForm(nextAction = null) {
        let formErrors = null;
        let fieldsHavingErrors = this.recursiveFieldsValidation({ formState: this.formState.fields });
        if (!fieldsHavingErrors && this.formValidatorFunc !== null) {
            formErrors = this.formValidatorFunc(this.formState);
            if (formErrors !== null) {
                this.actions['formSetErrors'](formErrors);
            }
        }
        if (nextAction !== null) {
            return nextAction(formErrors === null && fieldsHavingErrors, this.dispatch);
        }
        // console.debug(formErrors, fieldsHavingErrors);
        return formErrors === null && !fieldsHavingErrors;
    }

    recursiveErrorLoad({ errors, schema = this.formScheme, actions = this.actions.fields }) {
        for (let fieldName in schema) {
            let fieldNameFromBackend = schema[fieldName].sendAs || fieldName;
            if (!errors.hasOwnProperty(fieldNameFromBackend)) {
                continue;
            }
            let errorsForField = errors[fieldNameFromBackend];
            // console.debug('[FormConstructor] Load errors for: ', fieldName, actions);
            if (schema[fieldName].type === 'ref') {
                if (schema[fieldName].ref instanceof FormConstructor) {
                    schema[fieldName].ref.recursiveErrorLoad({
                        errors: errorsForField,
                    });
                }
                continue;
            }
            if (schema[fieldName].type === 'nested') {
                this.recursiveErrorLoad({
                    errors: errorsForField,
                    schema: schema[fieldName].schema,
                    actions: actions[fieldName],
                });
                continue;
            }
            if (schema[fieldName].type === 'array') {
                // errorsForField is object, so it's represent something like {0: {value: [errors]}, 1: {value: [errors]} ...}
                if (getType(errorsForField) === 'object') {
                    // And entityType is object
                    if (schema[fieldName].entityType === 'object') {
                        // Iterate through errorsForField
                        Object.keys(errorsForField).forEach((_index) => {
                            // Iterate through entitySchema
                            for (let arrayFieldName in schema[fieldName].entitySchema) {
                                // Get field name that entry of errorsForField should have
                                let arrayFieldNameFromBackend = schema[fieldName].entitySchema[arrayFieldName].sendAs || arrayFieldName;
                                // If these name is present in errorsForField entry, set correponding errors.
                                if (errorsForField[_index].hasOwnProperty(arrayFieldNameFromBackend)) {
                                    actions[fieldName]['setFieldErrors'](_index, arrayFieldName, errorsForField[_index][arrayFieldNameFromBackend]);
                                }
                            }
                        });
                    } else {
                        // Entity type is not an object, but we got errors as object, probably something like: {0: [error], 1: {value: [error]} ...}
                        // conjuct them into one array and put into array errors field.
                        let _errors = [];
                        Object.keys(errorsForField).forEach((_index) => {
                            _errors.concat(this.__streamlineErrors(errorsForField[_index]));
                        });
                    }
                    // errorsForField is object, robably it's a string or array
                } else {
                    actions[fieldName]['setErrors'](this.__streamlineErrors(errorsForField));
                }

                continue;
            }
            actions[fieldName]['setErrors'](this.__streamlineErrors(errors[fieldNameFromBackend]));
        }
    }

    __streamlineErrors(errors) {
        let objType = getType(errors);
        switch (objType) {
            case 'string':
                return [errors];
            case 'array':
                return errors;
            default:
                console.error('[Form Constructor] Unsupported type of errors: ', objType, errors);
                return [];
        }
    }

    loadErrors(errors) {
        // Process field errors.
        if (errors === null) {
            console.warn('[Form Constructor] Errors is null');
            return;
        }
        if (getType(errors) === 'object') {
            this.recursiveErrorLoad({ errors });
            if (errors.hasOwnProperty('_form')) {
                console.debug('having form errors');
                this.actions['formSetErrors'](this.__streamlineErrors(errors['_form']));
            }
        } else {
            this.actions['formSetErrors'](this.__streamlineErrors(errors));
        }
    }

    recursiveFieldsDump({ state, schema }) {
        let dump = {};
        for (let fieldName in schema) {
            // console.debug('Dumping field:', fieldName);
            if (schema[fieldName].type === 'ref') {
                if (schema[fieldName].ref instanceof FormConstructor) {
                    dump[schema[fieldName].sendAs || fieldName] = schema[fieldName].ref.dumpForm();
                }
                continue;
            }
            if (schema[fieldName].type === 'nested') {
                this.recursiveFieldsDump({
                    state: state[fieldName],
                    schema: schema[fieldName].schema,
                });
                continue;
            }
            if (schema[fieldName].type === 'array') {
                dump[schema[fieldName].sendAs || fieldName] = [];
                state[fieldName].ids.forEach((id) => {
                    if (schema[fieldName].entityType === 'object') {
                        dump[schema[fieldName].sendAs || fieldName].push(
                            this.recursiveFieldsDump({
                                state: state[fieldName].entities[id],
                                schema: schema[fieldName].entitySchema,
                            })
                        );
                    } else {
                        // Do not send undefined and non string fields that contain only spaces.
                        // TODO: decouple into function
                        let arrayEntity = state[fieldName].entities[id];
                        let entitySchema = schema[fieldName].entitySchema;
                        if (arrayEntity !== undefined && !(entitySchema !== 'string' && /^\s*$/.test(arrayEntity))) {
                            dump[schema[fieldName].sendAs || fieldName].push(castValueToType(arrayEntity, entitySchema));
                        }
                    }
                });
                continue;
            }
            let fieldValue = state[fieldName].value;
            let fieldType = state[fieldName].type;
            // Do not send undefined and non string fields that contain  nothing or only spaces.
            // TODO: decouple into function
            let omitEmptyString = fieldType === 'string' && /^\s*$/.test(fieldValue) && schema[fieldName].omitEmpty;
            let omitEmptyNonString = fieldType !== 'string' && /^\s*$/.test(fieldValue);
            if (fieldValue !== undefined && !omitEmptyString && !omitEmptyNonString) {
                dump[schema[fieldName].sendAs || fieldName] = castValueToType(fieldValue, fieldType);
            }
        }
        return dump;
    }

    dumpForm() {
        // console.debug('[FormConstructor] dumping form: ', this.formName);
        return this.recursiveFieldsDump({ state: this.formState.fields, schema: this.formScheme });
    }

    mapStateToProps(state) {
        this.formState = this.selectForm(state);
        this.applicationState = state;
        return this.formState;
    }

    mapDispatchToProps(dispatch) {
        this.dispatch = dispatch;
        return this.actions;
    }

    /**
     *
     * @param event
     * @param onSuccess
     * @param onError
     * @param args
     * @param dispatch
     * @param getState
     */
    post({ event, onSuccess, onError, ...args }) {
        if (typeof event !== 'undefined') {
            event.preventDefault();
        }
        if (this.postAction !== null) {
            if (!this.postInProgress && this.validateForm()) {
                this.dispatch(this.resetAllErrors);
                this.postInProgress = true;
                this.dispatch(
                    this.postAction({
                        _form: this,
                        onSuccess: (...params) => {
                            this.postInProgress = false;
                            if (!!onSuccess) {
                                onSuccess(...params);
                            }
                        },
                        onError: ({ errors, ...something }, ...params) => {
                            this.postInProgress = false;
                            this.loadErrors(errors);
                            if (!!onError) {
                                onError({ errors, ...something }, ...params);
                            }
                        },
                        ...args,
                    })
                );
            }
        } else {
            throw "[Forms] postAction isn't defined";
        }
    }
}

export default FormConstructor;
