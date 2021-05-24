import React from "react";
import Highcharts from "highcharts";
export default class HighChart extends React.Component {
    instance;

    constructor(props) {
        super(props);
        this.options = {
            chart: {
                type: "pie"
            },
            credits: {
                enabled: false
            },
            title: {
                text: this.props.title
            },
            series: [
                {
                    data: []
                }
            ]
        };
    }

    componentDidMount() {
        this.instance = Highcharts.chart(this.props.id, this.options);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.options = {
                ...this.options,
                series: [
                    {
                        data: this.props.data.map(d => ({ name: d.name, y: d.value }))
                    }
                ]
            };
            this.instance = Highcharts.chart(this.props.id, this.options);
        }
    }

    render() {
        return (
            <div>
                <div id={this.props.id} />
            </div>
        );
    }
}
