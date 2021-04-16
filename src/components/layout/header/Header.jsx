import React from "react";
import styles from "./header.module.scss";

import { SignIn } from "components/user/signIn";
import { Register } from "components/user/register";
import homeImg from "imgs/home.png";
import { access } from "../../../constants";
import { Link, useHistory } from "react-router-dom";
import { getAccessUser, getUserEmail } from "../../../redux/trips/selectors";
import { connect } from "react-redux";

const Header = ({ accessUser, email }) => {
    const history = useHistory();

    const routeHome = () => {
        history.push("/");
    };
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src={homeImg} width="30" onClick={routeHome} />
                <div className="ml-1">
                    <span>УКР</span> | <span>РУС</span>
                </div>
                {accessUser == access.admin && <span className="ml-1">Домашня сторінка</span>}
            </div>
            {email && (
                <Link
                    to={{
                        pathname: "/profile"
                    }}
                    className="text-center"
                >
                    Ви увійшли як {email}
                </Link>
            )}
            <SignIn />
            <Register />
        </div>
    );
};

const mapStateToProps = state => ({
    accessUser: getAccessUser(state),
    email: getUserEmail(state)
});

export default connect(mapStateToProps)(Header);
