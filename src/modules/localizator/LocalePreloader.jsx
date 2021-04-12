/**
 * Created by kyckyc on 12.10.18.
 */
import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
// import XRegExp from 'xregexp';
import { bindActionCreators } from 'redux';

import { Route, withRouter } from 'react-router-dom';
import { setLanguage, setPlatform } from './actions';

import PropTypes from 'prop-types';

export const LocaleContext = React.createContext('en');

const mapDispatchToProps = (dispatch) => {
    return { ...bindActionCreators({ setLanguage, setPlatform }, dispatch), dispatch };
};

@withRouter
@connect(null, mapDispatchToProps)
class LocalePreloader extends React.Component {
    /**
     *
     */
    static contextTypes = {};
    static propTypes = {
        onLangChange: PropTypes.object,
    };

    static defaultProps = {
        onLangChange: {},
    };

    static mixins = [];
    static langXP = RegExp('^/(de|fr|ko|ru|sv|zh|zh-hant|zh-hans|pt|es|pl)/.*?$');

    state = {
        currentLanguage: null,
        nextLanguage: null,
        nextLocation: null,
        currentLocation: null,
        bootstraped: false,
        location: null,
    };

    localeMessages = {};
    polyfillPluralRequired = false;
    polyfillRelativeTimeRequired = false;

    constructor(props) {
        super(props);
    }

    static extractLocale(pathname) {
        // // console.debug(`[LP] Extracting locale, pathname: ${pathname}`);
        const result = pathname.match(LocalePreloader.langXP);
        // console.debug(result);
        if (!!result) {
            let lang = result[1];
            pathname = pathname.substr(lang.length + 1);
            // Fallback for old code
            if (lang === 'zh') {
                lang = 'zh-hant';
            }
            return { lang, pathname };
        }
        return { lang: 'en', pathname };
    }

    /**
     * Invoked after a component is instantiated as well as before it is re-rendered
     * It can return an object to update state, or null to indicate that the new props do not require any state updates.
     * @param props
     * @param state
     */
    static getDerivedStateFromProps(props, state) {
        if (state === {}) {
            return null;
        }
        // console.debug(props.location);
        let location = { ...props.location };
        let { lang, pathname } = LocalePreloader.extractLocale(location.pathname);
        location.pathname = pathname;
        location.lang = lang;
        // // console.debug(props.location);
        if (state.currentLanguage == null) {
            // in case of bootstrapping
            // console.debug('[LP-D] Derived, bootstrapping state.');
            return {
                currentLanguage: lang,
                nextLanguage: lang,
                currentLocation: location,
                nextLocation: location,
            };
        }
        if (state.nextLanguage !== lang) {
            // console.debug(`[LP-D] Update nextLanguage and location: ${lang} | ${location.pathname}`);
            return {
                nextLanguage: lang,
                nextLocation: location,
            };
        }
        // console.debug(`[LP-D] Update only the next location: ${props.location.pathname}`);
        return {
            nextLocation: location,
        };
    }

    async componentDidUpdate() {
        // console.debug('[LP] Did update');
        // console.debug(`[LP] didUpdate, currentLanguage: ${this.state.currentLanguage}, nextLanguage: ${this.state.nextLanguage}`);
        const { nextLanguage, nextLocation } = this.state;
        const newIntlRequired = this.localeMessages[nextLanguage] === undefined;
        // console.debug(this.state.currentLocation);
        // console.debug(this.state.nextLocation);
        const routeChanged = this.state.currentLocation.key !== this.state.nextLocation.key;
        if (newIntlRequired) {
            let lang, polyfillFor;
            lang = polyfillFor = this.state.nextLanguage;

            if (polyfillFor === 'zh-hant' || polyfillFor === 'zh-hans') {
                polyfillFor = 'zh';
            }
            // console.debug(`[LP] Require '${lang}' locale.`);
            try {
                let awaitFor = [];
                awaitFor.push(import(/* webpackChunkName: "locale-messages-" */ `locales/${lang}.json`));
                awaitFor.push(this.processHooks(lang));
                if (this.polyfillRelativeTimeRequired) {
                    awaitFor.push(import(/* webpackChunkName: "locale-relative-" */ `./localeData/intl-relativetimeformat/${polyfillFor}.js`));
                }
                if (this.polyfillPluralRequired) {
                    awaitFor.push(import(/* webpackChunkName: "locale-plural-" */ `./localeData/intl-pluralrules/${polyfillFor}.js`));
                }
                const [locale] = await Promise.all(awaitFor);
                this.localeMessages[lang] = locale.default;
            } catch (e) {
                console.warn(e);
                this.props.dispatch(this.props.onError);
                return;
            }
        }
        // Route is changed and requested language is still the same.
        if (routeChanged && nextLanguage === this.state.nextLanguage) {
            this.renderRoute(nextLanguage, nextLocation);
        }
    }

    async processHooks(lang) {
        // console.debug(`generate hooks for lang: ${lang}`);
        let promises = [];
        for (let key in this.props.onLangChange) {
            promises.push(
                new Promise((resolve) => {
                    this.props.dispatch(this.props.onLangChange[key](resolve, lang));
                })
            );
        }
        return Promise.all(promises)
            .then()
            .catch((error) => {
                console.warn(error);
            });
    }

    renderRoute(nextLanguage, nextLocation) {
        if (this.state.currentLanguage !== nextLanguage) {
            // console.debug('[LP] Updating store with a new language: ', nextLanguage);
            this.props.setLanguage(nextLanguage);
        }
        // console.debug('[LP] Render new language and location: ', nextLanguage, nextLocation);
        this.setState({
            currentLanguage: nextLanguage,
            currentLocation: nextLocation,
        });
    }

    async componentDidMount() {
        // Parsing embed locale.
        let localeMessages = JSON.parse(document.getElementById('application-locale-messages').innerText);
        let lang, polyfillFor;
        lang = polyfillFor = localeMessages.lang;
        if (lang === 'zh') {
            lang = 'zh-hant';
        }
        if (polyfillFor === 'zh-hant' || polyfillFor === 'zh-hans') {
            polyfillFor = 'zh';
        }
        this.localeMessages[lang] = localeMessages.messages;
        // Reject browsers without Intl support
        // Add polyfill ?
        if (!global.Intl) return;

        // Polyfills for plural and relative time.
        let awaitFor = [];
        if (!Intl.PluralRules) {
            this.polyfillPluralRequired = true;
            awaitFor.push(
                import(/* webpackChunkName: "polyfillIntlPlurals" */ '@formatjs/intl-pluralrules/polyfill').then(() =>
                    import(/* webpackChunkName: "locale-plural-" */ `./localeData/intl-pluralrules/${polyfillFor}.js`)
                )
            );
        }
        if (!Intl.RelativeTimeFormat) {
            this.polyfillRelativeTimeRequired = true;
            awaitFor.push(
                import(/* webpackChunkName: "polyfillIntlRelativeTime" */ '@formatjs/intl-relativetimeformat/polyfill').then(() =>
                    import(/* webpackChunkName: "locale-relative-" */ `./localeData/intl-relativetimeformat/${polyfillFor}.js`)
                )
            );
        }
        await Promise.all(awaitFor);
        this.props.setLanguage(lang);
        this.setState({
            bootstraped: true,
        });
        // App is rendered at this point.
    }

    render() {
        const { children } = this.props;
        const { currentLocation, currentLanguage, bootstraped } = this.state;

        if (!bootstraped) {
            // console.debug('[LP] Ommit render for now, not bootstraped');
            return null;
        }
        // console.debug(`[LP] Render: pathname: ${!!currentLocation ? currentLocation.pathname : null}, currentLanguage: ${currentLanguage}`);

        // use a controlled <Route> to trick all descendants into
        // rendering the old location
        return (
            <LocaleContext.Provider value={currentLanguage}>
                <IntlProvider locale={currentLanguage} messages={this.localeMessages[currentLanguage]}>
                    <Route location={currentLocation} render={() => children} />
                </IntlProvider>
            </LocaleContext.Provider>
        );
    }
}

export { LocalePreloader };
