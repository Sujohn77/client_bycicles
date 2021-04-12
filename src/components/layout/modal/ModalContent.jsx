/**
 * Created by kyckyc on 05.02.19.
 */
import React from "react";
import classNames from "classnames";
import styles from "./widgetModal.module.scss";

export const ModalContent = ({ children, className }) => {
    return (
        <div
            className={classNames({
                [styles.widgetModal__content]: true,
                [className]: !!className
            })}
        >
            {children}
        </div>
    );
};
