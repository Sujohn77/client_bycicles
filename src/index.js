import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./redux/store";
import { defineMessages } from "react-intl";

import { addLocaleData } from "react-intl";

import messages_ua from "./translations/ua.json";
import messages_ru from "./translations/ru.json";
import { Col } from "./components/layout/grid";

import App from "./App";

import { IntlProvider } from "react-intl";
import { IntlProviderWrapper } from "./components/IntWrapper/IntlWrapper";

const messages = {
    ua: messages_ua,
    ru: messages_ru
};
// const localeMessages = locale === "en" ? enMessages : jaMessages;

const lang = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
    <Router>
        <IntlProviderWrapper>
            <Provider store={store}>
                <App />
            </Provider>
        </IntlProviderWrapper>
    </Router>,
    document.getElementById("root")
);
