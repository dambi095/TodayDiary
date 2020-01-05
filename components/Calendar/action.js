import React, { Component } from "react";
import Calendar from "./screen";

const moment = require("moment");

class Action extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: [],
            week: [],
            diary_num: "",
            selectedStyle: "",
            isLeapYear: "", // 윤년 여부
            selectedDay: "",
        }
    }

    componentDidMount = async () => {
        let date = new Date(moment(date).format("YYYY-MM-DD"));
        let week = this.makeWeekArr(date);

        this.setState({
            date, week, selectedDay: date,
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

        return week;
    };

    onPressArrowLeft = () => {
        console.log("onPressArrowLeft()");
        let newDate = new Date(this.state.date.valueOf() - 86400000 * 7);
        let newWeek = this.makeWeekArr(newDate);

        this.setState({
            date: newDate, week: newWeek, selectedDay: newDate
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

    getDiaryList = async (selected) => {
        console.log(" getDiaryList () :", selected);
        const { getDiarylist, diary_num, selectedDate } = this.props;
        selectedDate(moment(selected).format("YYYY-MM-DD"));
        this.setState({ selectedDay: selected, selectedStyle: true })
        await getDiarylist(diary_num, selected);
    }

    render() {
        return <Calendar
            {...this.props}
            {...this.state}
            onPressArrowLeft={this.onPressArrowLeft}
            onPressArrowRight={this.onPressArrowRight}
            getDiaryList={this.getDiaryList}
        />
    }

}

export default Action;