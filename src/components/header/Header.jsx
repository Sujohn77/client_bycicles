import React from "react";
import styles from "./header.module.scss";

import { SignIn } from "components/user/signIn";
import { Register } from "components/user/register";
import homeImg from "imgs/home.png";

const Header = ({ children }) => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src={homeImg} width="30" />
                <div className="ml-1">
                    <span>УКР</span> | <span>РУС</span>
                </div>
                <span>Домашня сторінка</span>
            </div>
            <SignIn />
            <Register />
        </div>
    );
};

export default Header;
