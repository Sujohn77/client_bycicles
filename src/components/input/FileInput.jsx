import React from "react";
import { Form } from "redux-form";

class FileInput extends React.Component {
    onChange = e => {
        e.preventDefault();
        const {
            input: { onChange }
        } = this.props;

        onChange(e.target.files[0]);
    };

    render() {
        let {
            meta: { touched, error },
            input: { value },
            ...props
        } = this.props; // достаем value из props.input

        return (
            <>
                <input
                    {...props.input}
                    id={props.id}
                    className={props.className}
                    label={props.label}
                    onChange={this.onChange.bind(this)}
                    type={props.type}
                    accept={props.accept}
                />
                {touched && error && <div className="form__error form__text">{error}</div>}
            </>
        );
    }
}

export default FileInput;
