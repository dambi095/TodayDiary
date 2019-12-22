import React, { Component } from "react";
import WritingDiaryScreen from './screen'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class Action extends Component {

    constructor(props) {
        super(props);
        const {
            navigation: {
                state: {
                    params: { diary_num, page_num, title, contents }
                }
            }
        } = props;

        this.state = {
            title,
            image: null,
            isModalVisible: null,
            contents: contents,
            diary_num,
            page_num,
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

        console.log(result);

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
        const result = await insertDiaryContents(this.state.diary_num, this.state.title, this.state.contents, this.state.image);

        if (result) {
            this.props.navigation.navigate("DiaryContentScreen");
        }
    }

    // 컨텐츠 수정 시 
    _changeContent = () => {
        console.log("changeContent()");
        const { updateDiaryContents } = this.props;
        const result = updateDiaryContents(this.state.diary_num, this.state.page_num, this.state.title, this.state.contents);

        if (result) {
            this.props.navigation.navigate("DiaryContentScreen", {
                title: this.state.title,
                write_date: this.props.diaryContent[0].write_date,
                nickname: this.props.diaryContent[0].nickname,
                page_num: this.props.diaryContent[0].page_num,
                diary_num: this.state.diary_num,
                diaryContent: ''
            });
        }
    }

}

export default Action;