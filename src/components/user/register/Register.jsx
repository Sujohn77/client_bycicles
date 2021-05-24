// LIBRARIES
import { ModalContent, ModalWindow } from "components/layout/modal";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// COMPONENTS
import { RegisterForm } from "components/user/forms/RegisterForm";
// MIDDLEWARES
import { signUp } from "./actions";
import { StylesProvider } from "@material-ui/styles";
import { Col } from "components/layout/grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import BaseModal from "../../../modules/modal/BaseModal";
import { stopSubmit } from "redux-form";
import { access } from "constants";

const Register = ({ signUp, open, setOpen, accessUser }) => {
    const onClick = () => setOpenModal(true);
    useEffect(() => {
        if (accessUser >= access.user) {
            setOpen(false);
        }
    }, [accessUser]);
    const onSubmit = data => {
        signUp(data);
    };
    return (
        <BaseModal initialOpened={open}>
            <RegisterForm onSubmit={onSubmit} />
        </BaseModal>
    );
};

export default connect(null, { signUp })(Register);
