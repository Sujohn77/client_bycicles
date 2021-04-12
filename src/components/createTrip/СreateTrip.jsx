import React from "react";
import { guiders, placeHolders, routes } from "../../constants";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { saveTrip, deleteTrip } from "./actions";
import styles from "./createTrip.module.scss";

const mapStateToProps = state => {
    return {
        lastTripId: state.trips.data[state.trips.data.length - 1].id
    };
};

let lastdate = new Date();
lastdate.setDate(lastdate.getDate() + 7);
lastdate.toLocaleDateString("en-US") + 7;

@connect(mapStateToProps, { saveTrip, deleteTrip })
class СreateTrip extends React.Component {
    state = {
        editable: true,
        name: "Назва походу",
        dateFrom: new Date().toLocaleDateString("en-US"),
        dateTo: lastdate,
        countBicycles: 20,
        difficulty: 3,
        guide: guiders[0],
        route: routes[0],
        hiddenPhoto: true
    };

    onChange = state => e => {
        this.setState({ [state]: e.currentTarget.value });
    };

    toggleEdit() {
        this.setState({ editable: !this.state.editable });
    }

    saveTrip() {
        let { editable, hiddenPhoto, ...tripData } = this.state;
        this.props.saveTrip(tripData);
        this.setState({ hiddenPhoto: true });
    }

    showInputUrl() {
        this.setState({ hiddenPhoto: false });
    }

    render() {
        const { name, dateFrom, dateTo, countBicycles, difficulty, guide, route, photo, hiddenPhoto } = this.state;
        const { lastTripId, deleteTrip } = this.props;
        return (
            <tr className={styles.create_row}>
                <td>№</td>
                <td>
                    <Input value={name} onChange={this.onChange(name)} />
                </td>
                <td>
                    <TextField
                        id="date"
                        type="date"
                        value={dateFrom}
                        onChange={this.onChange("dateFrom")}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </td>
                <td>
                    <TextField
                        id="date"
                        type="date"
                        value={dateTo}
                        onChange={this.onChange("dateTo")}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </td>
                <td>
                    <Input value={countBicycles} onChange={this.onChange("countBicycles")} />
                </td>
                <td>
                    <Input value={difficulty} onChange={this.onChange("difficulty")} />
                </td>
                <td>
                    <select value={guide} onChange={this.onChange("guide")}>
                        {guiders.map(opt => {
                            return <option value={opt}>{opt}</option>;
                        })}
                    </select>
                </td>
                <td>
                    <select value={route} onChange={this.onChange("route")}>
                        {routes.map(opt => {
                            return <option value={opt}>{opt}</option>;
                        })}
                    </select>
                </td>
                <td>
                    <div>Туристи</div>
                </td>
                <td>
                    {hiddenPhoto && (
                        <label htmlFor="photo" onClick={this.showInputUrl.bind(this)}>
                            Фото
                        </label>
                    )}
                    <input
                        id="photo"
                        type="text"
                        value={photo || ""}
                        hidden={hiddenPhoto}
                        onChange={this.onChange("photo")}
                    />
                </td>
                <td>
                    <div>Коментарі</div>
                </td>
                <td className={styles.actions}>
                    <div className={styles.success}>
                        <SaveIcon onClick={this.saveTrip.bind(this)} />
                    </div>
                    {this.state.editable && (
                        <div className={styles.danger}>
                            <CloseIcon onClick={() => this.props.setCreateLine(false)} />
                        </div>
                    )}

                    <div className={styles.danger}>
                        <DeleteIcon onClick={() => deleteTrip({ id: lastTripId })} />
                    </div>
                </td>
            </tr>
        );
    }
}

export default СreateTrip;
