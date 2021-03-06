import React, { Component } from "react";
import WritingDiaryScreen from './screen'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Alert } from "react-native";
class Action extends Component {

    constructor(props) {
        super(props);
        const {
            navigation: {
                state: {
                    params: { title, image, contents, diary_num, isModified, page_num }
                }
            }
        } = props;

        this.state = {
            title: title,
            image: image,
            isModalVisible: null,
            contents: contents,
            diary_num,
            page_num,
            isModified
        };
    }

    render() {
        return (
            <WritingDiaryScreen
                {...this.state}
                {...this.props}
                onTitleChanged={this._onTitleChanged}
                onContentChanged={this._onContentChanged}
                pickImage={this._pickImage}
                insertContents={this._insertContents}
                changeContent={this._changeContent}
            />

        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    // 제목 입력 시 
    _onTitleChanged = (value) => {
        this.setState({
            title: value
        })
    }

    // 글 내용 입력 시 
    _onContentChanged = (value) => {
        this.setState({
            contents: value
        })
    }

    // 글쓰기 저장 
    _insertContents = async () => {
        const { insertDiaryContents } = this.props;
        console.log("this.props: ", this.props);
        if (this.state.title !== "" && this.state.contents !== "") {
            const result = await insertDiaryContents(this.state.diary_num, this.state.title, this.state.contents, this.state.image);

            if (result) {
                this.props.navigation.navigate("ContentScreen");
            }
        }
        else {
            Alert.alert("제목 또는 내용을 입력해주세요")
        }

    }

    // 컨텐츠 수정 시 
    _changeContent = async () => {
        const { updateDiaryContents, diaryContent } = this.props;
        const result = updateDiaryContents(this.state.diary_num, this.state.page_num, this.state.title, this.state.contents, this.state.image,  diaryContent[0].write_date);

        if (this.state.title !== "" && this.state.contents !== "") {
            if (result) {
                this.props.navigation.navigate("ContentScreen");
            }
        } else {
            Alert.alert("제목 또는 내용을 입력해주세요")
        }
    }
}

export default Action;