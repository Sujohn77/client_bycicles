/**
 * Created by kyckyc on 3/6/17.
 */
import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./widgetModal.module.scss";

export const ModalWindow = forwardRef(({ children, opened = false, onClickOutside, className = "" }, ref) => (
    <div
        ref={ref}
        className={classNames({
            [styles.modal]: true,
            [styles.opened]: opened
        })}
        onTouchStart={onClickOutside}
        onMouseDown={onClickOutside}
    >
        <div
            className={styles.widgetModal + " " + className}
            onMouseDown={event => event.stopPropagation()}
            onTouchStart={event => event.stopPropagation()}
        >
            {children}
        </div>
    </div>
));
