import React from "react";
import { guides, placeHolders, routes } from "constants";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { Input, Select, MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { saveTrip, deleteTrip } from "./actions";
import styles from "./createTrip.module.scss";
import { getGuidesByNames } from "routes/guides/selectors";
import { apiRoot, difficulties } from "../../constants";
import { getRouteNames } from "redux/hikeRoutes/selectors";
import { FormSelect } from "components/layout/forms/select/FormSelect";
import { getHikeNames } from "../../redux/hikes/selectors";
import { getRouteByName } from "../../redux/hikeRoutes/selectors";
const mapStateToProps = state => {
    return {
        trip: state.createTrip.data,
        lastTripId: state.hikes.data[state.hikes.data.length - 1].id,
        guides: getGuidesByNames(state),
        routeNames: getRouteNames(state),
        hikeNames: getHikeNames(state),
        routeByName: getRouteByName(state)
    };
};

@connect(mapStateToProps, { saveTrip, deleteTrip })
class СreateTrip extends React.Component {
    state = {
        editable: true,
        hiddenPhoto: true
    };

    updateState() {
        let { trip, guides, routeNames } = this.props;
        let initialRoute = this.props.routeByName(routeNames[0]);
        this.setState({
            id: trip._id,
            name: trip.name,
            dateFrom: trip.dateFrom,
            dateTo: trip.dateTo,
            countBicycle: trip.countBicycle,
            difficulty: difficulties[trip.difficulty] || difficulties[initialRoute.difficulty],
            price: trip.price,
            guide: trip.guide || guides[0],
            route: trip.route || routeNames[0],
            photo: trip.img || initialRoute.img
        });
    }

    componentDidMount() {
        this.updateState();
    }

    onChange = state => e => {
        if (state === "route") {
            let route = this.props.routeByName(e.target.value);
            this.setState({ difficulty: difficulties[route.difficulty], photo: route.img, [state]: e.target.value });
            return;
        }
        this.setState({ [state]: e.target.value });
    };

    toggleEdit() {
        this.setState({ editable: !this.state.editable });
    }

    saveTrip() {
        let { editable, hiddenPhoto, ...tripData } = this.state;
        this.props.saveTrip(tripData);
        this.setState({ hiddenPhoto: true });
        this.props.setCreateLine(false);
    }

    showInputUrl() {
        this.setState({ hiddenPhoto: false });
    }

    render() {
        const {
            id,
            name = "",
            dateFrom,
            dateTo,
            countBicycle,
            difficulty,
            guide,
            route,
            photo,
            hiddenPhoto,
            price
        } = this.state;
        const { lastTripId, deleteTrip, guides, routeNames, hikeNames } = this.props;

        return (
            <tr className={styles.create_row}>
                <td>
                    <TextField type="text" value={name} onChange={this.onChange("name")} />
                </td>

                <td>
                    <Input value={price} onChange={this.onChange("price")} />
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
                    <Input value={countBicycle} onChange={this.onChange("countBicycle")} />
                </td>
                <td>
                    <Input value={difficulty} disabled />
                </td>
                <td>
                    <FormSelect className={`w-100`} onChange={this.onChange("guide")}>
                        {guides.map((value, key) => (
                            <option key={key} className={styles.root} value={value} selected={value === guide}>
                                {value}
                            </option>
                        ))}
                    </FormSelect>
                </td>
                <td>
                    <FormSelect value={route} className={`w-100`} onChange={this.onChange("route")}>
                        {routeNames.map((value, key) => (
                            <option key={key} classes={{ root: styles.root }} value={value}>
                                {value}
                            </option>
                        ))}
                    </FormSelect>
                </td>
                <td>
                    <div>Туристи</div>
                </td>
                <td>
                    {/* {hiddenPhoto && <label htmlFor="photo">Фото</label>}
                    <input
                        id="photo"
                        type="text"
                        value={photo || ""}
                        hidden={hiddenPhoto}
                        onChange={this.onChange("photo")}
                    /> */}
                    {photo && <img src={apiRoot + photo} />}
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
                        <DeleteIcon onClick={() => deleteTrip({ id })} />
                    </div>
                </td>
            </tr>
        );
    }
}

export default СreateTrip;
