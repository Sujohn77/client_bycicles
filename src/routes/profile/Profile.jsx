import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./profile.module.scss";
import { updateProfile } from "./actions";
import { Field, reduxForm } from "redux-form";
import { Button } from "@material-ui/core";

import classNames from "classnames";
import { currentUser } from "redux/currentUser/reducers";
import { Input, Select } from "components/layout/input/Input";
import { updateUser } from "redux/currentUser/actions";
import { genders } from "constants";
import { injectIntl } from "react-intl";
@injectIntl
class Form extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(prevProps, prevState) {
        let { phone, email, gender, birthday } = this.props.currentUser;
        const { change, initialValues } = this.props;

        if (prevProps.initialValues !== initialValues) {
            for (var key in initialValues) {
                if (initialValues.hasOwnProperty(key)) {
                    if (key === "birthday" && initialValues[key]) {
                        change(key, new Date(initialValues[key]).toISOString().split("T")[0]);
                    } else {
                        change(key, initialValues[key]);
                    }
                }
            }
        }
    }

    render() {
        let { formatMessage } = this.props.intl;
        let textName = formatMessage({ id: "app.profile.name" });
        let textSurname = formatMessage({ id: "app.profile.surname" });
        let textPhone = formatMessage({ id: "app.profile.phone" });
        let textEmail = formatMessage({ id: "app.profile.email" });
        let textGender = formatMessage({ id: "app.profile.gender" });
        let textBirthday = formatMessage({ id: "app.profile.birthday" });
        let textSave = formatMessage({ id: "app.buttons.save" });
        return (
            <form className={styles.profile} onSubmit={this.props.handleSubmit}>
                <div>
                    <b>{textName} </b>
                    <div className="ml-1">
                        <Field component={Input} type="text" name="name" />
                    </div>
                </div>
                <div>
                    <b>{textSurname}</b>
                    <div className="ml-1">
                        <Field component={Input} type="text" name="surname" />
                    </div>
                </div>
                <div>
                    <b>{textPhone}</b>
                    <div className="ml-1">
                        <Field component={Input} type="text" name="phone" />
                    </div>
                </div>
                <div>
                    <b>{textGender} </b>
                    <div className="ml-1">
                        <Field component={Select} opts={genders} type="text" name="gender" />
                    </div>
                </div>
                <div>
                    <b>{textEmail} </b>
                    <div className="ml-1">
                        <Field component={Input} type="text" name="email" />
                    </div>
                </div>
                <div>
                    <b>{textBirthday} </b>
                    <div className="ml-1">
                        <Field component={Input} type="date" name="birthday" />
                    </div>
                </div>
                <div>
                    <Button type="submit">{textSave}</Button>
                </div>
            </form>
        );
    }
}

let Profile = ({ fetchProfile, currentUser, userId, handleSubmit, updateProfile, updateUser, intl }) => {
    const [initialValues, setInitialValues] = useState(currentUser.phone || "");
    useEffect(() => {
        let { formatMessage } = intl;
        document.title = formatMessage({ id: "app.profile.title" });
    }, []);
    useEffect(() => {
        let { phone, email, gender, birthday, name, surname } = currentUser;
        if (currentUser) {
            if (gender === "male") {
                gender = 0;
            } else if (gender === "female") {
                gender = 1;
            }
        }

        currentUser && setInitialValues({ phone, email, gender, birthday, name, surname });
    }, [currentUser]);

    const renderField = (field, value, handler) => {
        return <Field component="input" value={value} onChange={handler} />;
    };
    const onSubmit = data => {
        updateUser(data);
        updateProfile({ id: currentUser._id, ...data });
    };
    if (!currentUser) {
        return <div></div>;
    }
    let { formatMessage } = intl;
    let textContentTitle = formatMessage({ id: "app.profile.content.title" });
    return (
        <div>
            <h3>{textContentTitle}</h3>
            <ProfileForm onSubmit={onSubmit} currentUser={currentUser} initialValues={initialValues} />
        </div>
    );
};
const mapStateToProps = state => ({
    profile: state.profile.data,
    currentUser: state.currentUser.data
});

const ProfileForm = reduxForm({
    form: "profile",
    enableReinitialize: true
})(Form);

export default injectIntl(connect(mapStateToProps, { updateProfile, updateUser })(Profile));
