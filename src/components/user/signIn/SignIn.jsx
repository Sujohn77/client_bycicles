// LIBRARIES
import { ModalContent, ModalWindow } from "components/layout/modal";
import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// COMPONENTS
import { SignInForm } from "components/user/forms/SignInForm";
// MIDDLEWARES
import { signIn } from "./actions";
import { StylesProvider } from "@material-ui/styles";
import { Col } from "components/layout/grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

const SignIn = ({ accessUser, setLogin, signIn }) => {
    let [opened, setOpened] = useState(false);

    useEffect(() => {
        if (accessUser) {
            setOpened(false);
        }
    }, [accessUser]);

    let nodeRef = useRef(null);

    const onSubmit = values => {
        signIn(values);
    };

    const handleClick = opened => {
        if (!opened) {
            document.addEventListener("click", handleOutsideClick, false);
        } else {
            document.removeEventListener("click", handleOutsideClick, false);
        }
        setOpened(!opened);
    };

    const handleOutsideClick = e => {
        if (!nodeRef.current.contains(e.target)) {
            handleClick(true);
        }
    };

    return (
        <div ref={nodeRef}>
            <ModalWindow
                opened={opened}
                onClickOutside={() => setOpened(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <ModalContent>
                    <SignInForm onSubmit={onSubmit} />
                </ModalContent>
            </ModalWindow>
            <Col>
                <Button type="button" onClick={() => handleClick(false)} className="nav-btn">
                    Увійти
                </Button>
            </Col>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        accessUser: state.currentUser.access
    };
};

export default connect(mapStateToProps, { signIn })(SignIn);
