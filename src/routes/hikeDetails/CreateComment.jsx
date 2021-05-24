// import { Button } from "@material-ui/core";
import React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../../components/layout/input/Input";
import { createComment } from "redux/hikes/actions";
const mapStateToProps = state => ({});

let Form = ({ handleSubmit, intl }) => {
    let { formatMessage } = intl;

    let textAdd = formatMessage({ id: "app.buttons.add" });
    return (
        <form onSubmit={handleSubmit}>
            <Field name="message" component={Textarea} className="w-100" />
            <button className="w-100 btn" type="submit">
                {textAdd}
            </button>
        </form>
    );
};

const CreateComment = ({ intl, createComment, hikeId }) => {
    let { formatMessage } = intl;
    let textCreateComment = formatMessage({ id: "app.hikeDetails.createComment" });
    const onSubmit = values => {
        createComment(values.message, hikeId);
    };
    return (
        <div className="mt-3">
            <h4>{textCreateComment}</h4>
            <Form onSubmit={onSubmit} />
        </div>
    );
};

Form = reduxForm({
    form: "createComment"
})(injectIntl(Form));

export default connect(mapStateToProps, { createComment })(injectIntl(CreateComment));
