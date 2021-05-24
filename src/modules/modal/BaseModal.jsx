// LIBRARIES
import { ModalContent, ModalWindow } from "components/layout/modal";
import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// COMPONENTS

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { getCurrentUser } from "redux/currentUser/selectors";
import "./baseModal.scss";
const BaseModal = ({ children, initialOpened = false, size = "none", setOpen }) => {
    let [opened, setOpened] = useState(false);
    let nodeRef = useRef(null);

    const handleClick = opened => {
        if (!opened) {
            document.addEventListener("click", handleOutsideClick, false);
        } else {
            document.removeEventListener("click", handleOutsideClick, false);
        }
        setOpened(!opened);
        // setOpen(!opened);
    };

    useEffect(() => {
        setOpened(initialOpened);
    }, [initialOpened]);

    const handleOutsideClick = e => {
        if (!nodeRef.current.contains(e.target)) {
            handleClick(true);
        }
    };

    return (
        <div ref={nodeRef}>
            <ModalWindow
                className={"modal-size-" + size}
                opened={opened}
                onClickOutside={() => setOpened(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <ModalContent>{children}</ModalContent>
            </ModalWindow>
        </div>
    );
};

export default BaseModal;
