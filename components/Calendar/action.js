import React, { Component } from "react";
import Calendar from "./screen";

class Action extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: [],
            week: []
        }
    }

    componentDidMount = () => {
        let now = new Date();
        let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let week = this.makeWeekArr(date);
        this.setState({
            date, week
        })
    }

    makeWeekArr = date => {
        console.log(" makeWeekArr () ");
        let day = date.getDay();
        let week = [];
        let obj = new Object;
        for (let i = 0; i < 7; i++) {
            obj = {};
            let newDate = new Date(date.valueOf() + 86400000 * (i - day));
            obj["index"] = i;
            obj["newDate"] = newDate;
            week[i] = obj;
        }

        console.log("array", this.state.week);

        return week;
    };

    onPressArrowLeft = () => {
        console.log(" onPressArrowLeft () ");
        let newDate = new Date(this.state.date.valueOf() - 86400000 * 7);
        let newWeek = this.makeWeekArr(newDate);

        this.setState({
            date: newDate, week: newWeek
        })
    };

    onPressArrowRight = () => {
        console.log(" onPressArrowRight () ");
        let newDate = new Date(this.state.date.valueOf() + 86400000 * 7);
        let newWeek = this.makeWeekArr(newDate);
        this.setState({
            date: newDate, week: newWeek
        })
    };


    render() {
        return <Calendar
            {...this.props}
            {...this.state}
            onPressArrowLeft={this.onPressArrowLeft}
            onPressArrowRight={this.onPressArrowRight}
        />
    }

}

export default Action;