import React from "react";
import Types from "prop-types";

import ruTranslation from "translations/ru";
import uaTranslation from "translations/ua";
import { IntlProvider } from "react-intl";

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
    constructor(...args) {
        super(...args);

        this.switchToUkrainian = () => {
            localStorage.setItem("lang", "ua");
            this.setState({ locale: "ua", messages: uaTranslation });
        };

        this.switchToRussian = () => {
            localStorage.setItem("lang", "ru");
            this.setState({ locale: "ru", messages: ruTranslation });
        };

        // pass everything in state to avoid creating object inside render method (like explained in the documentation)
        this.state = {
            locale: localStorage.getItem("lang") === "ru" ? localStorage.getItem("lang") : "ua",
            messages: localStorage.getItem("lang") === "ru" ? ruTranslation : uaTranslation,
            switchToUkrainian: this.switchToUkrainian,
            switchToRussian: this.switchToRussian
        };
    }

    componentDidUpdate;

    render() {
        const { children } = this.props;
        const { locale, messages } = this.state;
        return (
            <Context.Provider value={this.state}>
                <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale="ua">
                    {children}
                </IntlProvider>
            </Context.Provider>
        );
    }
}

export { IntlProviderWrapper, Context as IntlContext };
