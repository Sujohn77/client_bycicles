import React, { useState, memo } from "react";
import styles from "./header.module.scss";

import { SignIn } from "components/user/signIn";
import { Register } from "components/user/register";
import homeImg from "imgs/home.png";
import { access } from "constants";
import { Link, useHistory } from "react-router-dom";
import { getAccessUser, getUserEmail } from "redux/hikes/selectors";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { injectIntl } from "react-intl";
import { IntlContext } from "../../IntWrapper/IntlWrapper";
import classNames from "classnames";
import { signOut } from "../../../redux/currentUser/actions";
import signOutImg from "imgs/sign-out.png";
const Header = ({ accessUser, email, intl, signOut }) => {
    const { switchToRussian, switchToUkrainian, locale } = React.useContext(IntlContext);
    const [openLoginModal, setLoginModal] = useState(false);
    const [openRegisterModal, setRegisterModal] = useState(false);
    const [activeLang, setActiveLang] = useState(locale === "ru" ? "active_russian" : "active_ukrainian");

    const history = useHistory();

    const changeRoute = () => {
        history.push("/");
    };
    let { formatMessage } = intl;
    let textLogin = formatMessage({ id: "app.header.login" });
    let textRegister = formatMessage({ id: "app.header.register" });
    let textHome = formatMessage({ id: "app.header.home" });
    let textEnterAs = formatMessage({ id: "app.header.enterAs" });
    let textSignOut = formatMessage({ id: "app.header.signOut" });
    console.log(activeLang);
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <div onClick={changeRoute}>
                    <img src={homeImg} width="30" />
                </div>

                <div className="ml-2">
                    <span
                        className={classNames({ [activeLang]: true })}
                        onClick={() => {
                            switchToUkrainian();
                            // setActiveLang("active_ukrainian");
                            console.log("changed: " + "active_ukrainian");
                        }}
                    >
                        УКР
                    </span>
                    {" | "}
                    <span
                        className={classNames({ [activeLang]: true })}
                        onClick={() => {
                            switchToRussian();
                            // setActiveLang("active_russian");
                            console.log("changed: " + "active_russian");
                        }}
                    >
                        РУС
                    </span>
                </div>

                {accessUser >= access.user && (
                    <>
                        <span onClick={changeRoute} className="ml-5 mr-5">
                            {textHome}
                        </span>
                        <Button className={styles.signOut} onClick={signOut}>
                            <span>{textSignOut}</span>
                            <img src={signOutImg} className="ml-3" alt="#" width={30} />
                        </Button>
                    </>
                )}
            </div>
            {email && (
                <Button>
                    <Link
                        to={{
                            pathname: "/profile"
                        }}
                        className="text-center"
                    >
                        {textEnterAs} {email}
                    </Link>
                </Button>
            )}
            <div>
                <Button type="button" onClick={() => setLoginModal(true)} className="nav-btn">
                    {textLogin}
                </Button>
            </div>
            <div>
                <Button type="button" onClick={() => setRegisterModal(true)} className="nav-btn">
                    {textRegister}
                </Button>
            </div>
            {openLoginModal && <SignIn accessUser={accessUser} open={openLoginModal} setOpen={setLoginModal} />}
            {openRegisterModal && (
                <Register accessUser={accessUser} open={openRegisterModal} setOpen={setRegisterModal} />
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    accessUser: getAccessUser(state),
    email: getUserEmail(state)
});

export default injectIntl(connect(mapStateToProps, { signOut })(memo(Header)));
