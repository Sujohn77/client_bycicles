/**
 * Created by kyckyc on 02.11.18.
 */
import React, { Component } from 'react';
import { LocaleContext } from './LocalePreloader';

/**
 *
 * @param Component
 * @returns {*|string}
 */
function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}

/**
 *
 * @param WrappedComponent
 * @param options
 * @returns {{WrappedComponent, displayName, new(): withIntl, prototype: withIntl}}
 */
export default function withLocale(WrappedComponent, options = {}) {
    const { langPropName = 'lang', withRef = false } = options;

    return class withIntl extends Component {
        static displayName = `withIntl(${getDisplayName(WrappedComponent)})`;
        static WrappedComponent = WrappedComponent;

        wrappedInstance = (ref) => {
            this.wrappedInstance.current = ref;
        };

        getWrappedInstance() {
            return this.wrappedInstance.current;
        }

        render() {
            return (
                <LocaleContext.Consumer>
                    {(lang) => {
                        return (
                            <WrappedComponent
                                {...{
                                    ...this.props,
                                    [langPropName]: lang,
                                }}
                                ref={withRef ? this.wrappedInstance : null}
                            />
                        );
                    }}
                </LocaleContext.Consumer>
            );
        }
    };
}
