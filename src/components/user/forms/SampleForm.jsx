import React from "react";
import { Field, reduxForm } from "redux-form";
import FileInput from "../../input/FileInput";
class SampleForm extends React.Component {
    state = { photo: null };
    onFileInputChange = async value => {
        this.setState({
            photo: value
        });
        let formData = new FormData();
        formData.append("image", value);
        formData.append("name", "photo");
        fetch("http://localhost:3001/test/insert", {
            method: "POST",
            data: formData
        }).then(res => {
            console.log(res);
        });
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    id={"form__file"}
                    className={"form__file form__control"}
                    name={"photo"}
                    type={"file"}
                    label={"Upload your photo"}
                    accept={"image/jpeg,image/jpg"}
                    component={FileInput}
                    onChange={this.onFileInputChange.bind(this)}
                />
                <input type="submit" />
            </form>
        );
    }
}

export default reduxForm({
    form: "sample" // a unique identifier for this form
})(SampleForm);
