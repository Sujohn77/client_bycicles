/**
 * Created by kyckyc on 05.02.19.
 */
import React from 'react';
import classNames from 'classnames';
import styles from './widgetModal.module.scss';

export const ModalBody = ({ children, className }) => {
    return <div className={classNames({ [styles.widgetModal__body]: true, [className]: !!className })}>{children}</div>;
};
