import React, { Component } from "react";
import SearchBox from "./screen";
import { Alert } from "react-native";
class Action extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: "",
            diaryLength: "",
            search: false
        }
    }

    componentDidMount = async () => { }

    render() {
        return <SearchBox
            {...this.props}
            {...this.state}
            changeSearchValue={this.changeSearchValue}
            searchDiaryTitle={this.searchDiaryTitle}
        />
    }

    changeSearchValue = (text) => {
        this.setState({
            searchValue: text
        })
    }

    searchDiaryTitle = async () => {
        const { searchDiaryTitle } = this.props;
        const result = await searchDiaryTitle(this.state.searchValue);
        if (result == 0) {
            Alert.alert("검색 결과가 없습니다");
            this.setState({ diaryLength: result , search: false })
        } else {
            this.setState({ diaryLength: result , search: true })
        }
        this.setState({ searchValue: ""});
    }


}

export default Action;