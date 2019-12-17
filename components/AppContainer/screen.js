import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar } from "react-native";
import RootNavigation from "../../navigation/RootNavigation";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";

class AppContainer extends Component {
    state = {
        isModalVisible: false
    };
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        initApp: PropTypes.func.isRequired
    };
    componentDidMount() {
        const { isLoggedIn, initApp } = this.props;
        if (isLoggedIn) {
            initApp();
        }
    }

    render() {
        const { isLoggedIn, profile } = this.props;
        console.log("appContainer isLoggedIn :: " + isLoggedIn);

        return (
            <View style={styles.container}>
                <StatusBar hidden={false} />
                {isLoggedIn && profile ? (
                    <RootNavigation
                        screenProps={{
                            toggleModal: this._toggleModal,
                            isModalVisible: this.state.isModalVisible,
                            profile: profile
                        }}
                    />
                ) : (
                        <LoggedOutNavigation />
                    )}
            </View>
        );
    }

    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});

export default AppContainer;
