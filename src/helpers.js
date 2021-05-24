import { FormattedMessage } from "react-intl";
import React from "react";

export const getQueryStringParams = query => {
    return query
        ? (/^[?#]/.test(query) ? query.slice(1) : query).split("&").reduce((params, param) => {
              let [key, value] = param.split("=");
              params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
              return params;
          }, {})
        : {};
};

export const required = value => {
    return value ? undefined : <FormattedMessage id={"app.validation.required"} />;
};
export const maxLength = max => value =>
    value && value.length > max ? <FormattedMessage id={"app.validation.maxLength"} values={{ max }} /> : undefined;
export const minValue = min => value =>
    value && value.length < min ? <FormattedMessage id={"app.validation.minLength"} values={{ min }} /> : undefined;
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? (
        <FormattedMessage id={"app.validation.email"} />
    ) : undefined;

export const imageHref = value =>
    value &&
    value.indexOf("upload/image") === -1 &&
    !value.match(
        new RegExp(
            /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
        )
    ) ? (
        <FormattedMessage id={"app.validation.href"} />
    ) : undefined;
