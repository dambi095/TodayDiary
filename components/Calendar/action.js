import React, { Component } from "react";
import Calendar from "./screen";

class Action extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date:"",
            week:""
        }
    }

    render() {
        return <Calendar
            {...this.props}
            {...this.state}
        />
    }

}

export default Action;