import React, { Component } from "react";
import SearchBox from "./screen";

class Action extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: ""
        }
    }

    componentDidMount = async () => {}

    render() {
        return <SearchBox
            {...this.props}
            {...this.state}
            changeSearchValue={this.changeSearchValue}
            searchDiaryTitle={this.searchDiaryTitle}
        />
    }

    changeSearchValue = async(text) => {
        this.setState({
            searchValue: text
        })
    }

    searchDiaryTitle = () => {
        const { searchDiaryTitle } = this.props;
        searchDiaryTitle(this.state.searchValue); 
    }

}

export default Action;