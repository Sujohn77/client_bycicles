import { Button, StylesProvider, SvgIcon, Table } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import styles from "./hikeRoutes.module.scss";
import { fetchHikeRoutes } from "../../redux/hikeRoutes/actions";
import { apiRoot, difficulties } from "../../constants";
import { getHikeRoutes } from "../../redux/hikeRoutes/selectors";
import { Field, reduxForm } from "redux-form";
import BaseModal from "modules/modal/BaseModal";
import { createHikeRoute } from "./actions";
import { FormattedMessage, injectIntl } from "react-intl";
import { Input, Select } from "../../components/layout/input/Input";
import { imageHref, required } from "../../helpers";

let HikeRoutes = ({ hikeRoutes, currentPage, fetchHikeRoutes, createHikeRoute, intl }) => {
    let [rows, setRows] = useState();
    let [pageSize, setPageSize] = useState(5);
    let [createLIne, setCreateLine] = useState(false);
    let [open, setOpen] = useState(false);
    let [initialValues, setInitialValues] = useState(false);
    let [columns, setColumns] = useState([]);
    const [routeId, setRouteId] = useState(null);
    useEffect(() => {
        let { formatMessage } = intl;
        let textFio = formatMessage({ id: "app.filters.fio" });
        let textPhone = formatMessage({ id: "app.filters.phone" });
        let textHikeName = formatMessage({ id: "app.filters.hikeName" });
        let textAge = formatMessage({ id: "app.filters.age" });
        let textGender = formatMessage({ id: "app.filters.gender" });
        let textActions = formatMessage({ id: "app.filters.actions" });
        document.title = formatMessage({ id: "app.routes.title" });
        setColumns([
            { field: "fio", headerName: textFio },
            { field: "phone", headerName: textPhone },
            { field: "qualification", headerName: textHikeName },
            { field: "gender", headerName: textGender },
            {
                field: "birthday",
                headerName: textAge,
                type: "number"
            },
            { field: "actions", headerName: textActions, elem: "button" }
        ]);
        setInitialValues({ difficulty: difficulties[0] });
        fetchHikeRoutes();
    }, []);

    useEffect(() => {
        setRows(
            hikeRoutes &&
                hikeRoutes.map((hikeRoute, key) => (
                    <div key={key} onClick={() => editRoute(hikeRoute)}>
                        <h4>{hikeRoute.name}</h4>
                        <img src={apiRoot + hikeRoute.img} alt={"маршрут"} />
                    </div>
                ))
        );
    }, [hikeRoutes]);

    const editRoute = route => {
        setInitialValues(route);
        setRouteId(route._id);
        setOpen(!open);
    };

    const onSubmit = route => {
        createHikeRoute(route, routeId);
        setOpen(false);
    };

    // const OnPageChanged = pageNumber => {
    //     setGuidePage(pageNumber);
    //     filterGuides(filters, pageNumber, pageSize);
    // };
    let { formatMessage } = intl;
    let textTitle = formatMessage({ id: "app.routes.content.title" });
    let textСreateRouteButton = formatMessage({ id: "app.routes.createRoute" });

    return (
        <div className={styles.routes__container}>
            <div className={styles.header}>
                <h3>{textTitle}</h3>
                <Button onClick={() => setOpen(true)}>{textСreateRouteButton}</Button>
            </div>

            <div className={styles.content}>{rows}</div>

            <BaseModal initialOpened={open} size="sm">
                <CreateRoute onSubmit={onSubmit} initialValues={initialValues} />
            </BaseModal>
        </div>
    );
};

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        let { initialValues, change } = this.props;

        if (prevProps.initialValues !== initialValues) {
            for (var key in initialValues) {
                if (initialValues.hasOwnProperty(key)) {
                    change(key, initialValues[key]);
                }
            }
        }
    }

    render() {
        const { handleSubmit, error, submitting } = this.props;
        let { formatMessage } = this.props.intl;
        let textCreateRouteTitle = formatMessage({ id: "app.routes.createRoute.content.title" });
        let textName = formatMessage({ id: "app.routes.createRoute.name" });
        let textPhoto = formatMessage({ id: "app.routes.createRoute.photo" });
        let textDifficulty = formatMessage({ id: "app.routes.createRoute.difficulty" });
        let textPlan = formatMessage({ id: "app.routes.createRoute.plan" });
        let textSave = formatMessage({ id: "app.buttons.save" });
        let textCancel = formatMessage({ id: "app.buttons.cancel" });
        return (
            <div>
                <h4>{textCreateRouteTitle}</h4>

                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="text-center ">{textName}</div>
                        <Field
                            placeholder={"Албанія 100м"}
                            name="name"
                            component={Input}
                            type="text"
                            validate={[required]}
                        />
                    </div>

                    <div>
                        <div className=" text-center ">{textPhoto}</div>
                        <Field
                            placeholder={"https://example.com/image.png"}
                            name="img"
                            component={Input}
                            type="text"
                            validate={[required, imageHref]}
                        />
                    </div>
                    <div>
                        <div className="text-center ">{textDifficulty}</div>
                        <Field
                            placeholder={"Cкладність"}
                            name="difficulty"
                            component={Select}
                            type="text"
                            opts={difficulties}
                        />
                    </div>
                    <div>
                        <div className="text-center">{textPlan}</div>
                        <Field placeholder={"Опис"} name="description" component="textarea" type="text" />
                    </div>
                    {error && <span className={styles.common__error}>{error}</span>}
                    <div className={styles.submit_buttons}>
                        <Button type="submit" value="Submit" disabled={submitting}>
                            {textSave}
                        </Button>
                        <Button type="submit" value="Submit">
                            {textCancel}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export const CreateRoute = reduxForm({
    form: "createRoute",
    enableReinitialize: true
})(injectIntl(Form));

const mapStateToProps = state => {
    return {
        hikeRoutes: getHikeRoutes(state)
    };
};

HikeRoutes = connect(mapStateToProps, { fetchHikeRoutes, createHikeRoute })(injectIntl(HikeRoutes));

export { HikeRoutes };
