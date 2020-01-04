import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar } from "react-native";
import RootNavigation from "../../navigation/RootNavigation";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";

class AppContainer extends Component {
    static propTypes = {
        initApp: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { isLoggedIn, initApp, logOut, getTodayTime } = this.props;
        getTodayTime();
        if (isLoggedIn === true) {
            initApp();
        } else {
            logOut()
        }
    }

    render() {
        const { isLoggedIn, profile, logOut } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} />
                {isLoggedIn === true && profile ? (
                    <RootNavigation
                        screenProps={{
                            logOut
                        }}
                    />
                ) : (
                        <LoggedOutNavigation />
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});

export default AppContainer;
