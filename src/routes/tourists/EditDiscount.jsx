import React, { useState } from "react";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import { saveDiscount } from "./actions";
import { Input } from "@material-ui/core";
const EditDiscount = ({ id, saveDiscount, initialValue }) => {
    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState(initialValue);
    const editValue = () => {
        setEditable(true);
    };

    const saveValue = () => {
        setEditable(false);
        saveDiscount(id, value);
    };

    return (
        <div>
            {!editable && (
                <div>
                    {value}
                    <EditIcon onClick={editValue} />
                </div>
            )}
            {editable && (
                <div>
                    <Input value={value} onChange={e => setValue(e.target.value)} />
                    <SaveIcon onClick={saveValue} />
                </div>
            )}
        </div>
    );
};

export default connect(null, { saveDiscount })(EditDiscount);
