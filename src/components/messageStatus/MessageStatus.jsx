import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import styles from "./messageStatus.module.scss";

export const MessageStatus = ({ message = "", status = "" }) => {
    const [active, setActive] = useState(true);
    const closeMessage = () => {
        setActive(false);
    };

    useEffect(() => {
        active && document.addEventListener("click", closeMessage);
        return () => {
            document.removeEventListener("click", closeMessage);
        };
    }, [active]);

    return (
        <div className={classNames(styles.message, { [styles.active]: active })}>
            <Alert color={status} variant={status}>
                <FormattedMessage id={message} />
            </Alert>
        </div>
    );
};

export default MessageStatus;
