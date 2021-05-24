import React from "react";
import { guides, placeHolders, routes } from "constants";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { saveGuide, deleteGuide } from "./actions";
import styles from "./createTrip.module.scss";
import { getGuidesByNames } from "routes/guides/selectors";
import { difficulties, genders } from "../../constants";

const mapStateToProps = state => {
    return {
        guide: state.createGuide.data,
        lastTripId: state.hikes.data[state.hikes.data.length - 1].id
    };
};

@connect(mapStateToProps, { saveGuide, deleteGuide })
class СreateGuide extends React.Component {
    state = {
        editable: true
    };

    updateState() {
        let { guide } = this.props;
        this.setState({
            fio: guide.fio,
            phone: guide.phone,
            qualification: guide.qualification,
            gender: guide.gender,
            birthday: guide.birthday
        });
    }

    componentDidMount() {
        this.updateState();
    }

    onChange = state => e => {
        this.setState({ [state]: e.currentTarget.value });
    };

    toggleEdit() {
        this.setState({ editable: !this.state.editable });
    }

    saveGuide() {
        let { editable, ...guideData } = this.state;
        this.props.saveGuide(guideData, this.props.pageSize, this.props.currentPage);
        this.props.setCreateLine(false);
    }

    render() {
        const { fio, phone, qualification, gender, birthday } = this.state;
        const { lastGuideId, deleteGuide, currentPage, pageSize } = this.props;
        return (
            <tr className={styles.create_row}>
                <td>
                    <Input value={fio} onChange={this.onChange("fio")} />
                </td>

                <td>
                    <Input value={phone} onChange={this.onChange("phone")} />
                </td>
                <td>
                    <Input value={qualification} onChange={this.onChange("qualification")} />
                </td>
                <td>
                    <select value={gender} onChange={this.onChange("gender")}>
                        {genders.map(gender => {
                            return <option value={gender}>{gender}</option>;
                        })}
                    </select>
                </td>
                <td>
                    <TextField
                        id="date"
                        type="date"
                        value={birthday}
                        onChange={this.onChange("birthday")}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </td>
                <td className={styles.actions}>
                    <div className={styles.success}>
                        <SaveIcon onClick={this.saveGuide.bind(this)} />
                    </div>
                    {this.state.editable && (
                        <div className={styles.danger}>
                            <CloseIcon onClick={() => this.props.setCreateLine(false)} />
                        </div>
                    )}

                    <div className={styles.danger}>
                        <DeleteIcon onClick={() => deleteGuide({ id: lastTripId }, currentPage, pageSize)} />
                    </div>
                </td>
            </tr>
        );
    }
}

export default СreateGuide;
