import React, { Component } from "react";
import WritingDiaryScreen from './screen'
// import { getInitialObject } from "react-native-cn-richtext-editor";
import { ImagePicker, Permissions, Video } from 'expo';
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
            focused_title: '',
            image: null,
            isModalVisible: null,
            //편집기 관련 
            selectedTag: 'body',
            selectedStyles: [],
            contents: (contents) ? contents : [getInitialObject()],
            diary_num,
            page_num,
        };

        this.editor = null;
    }

    render() {
        return (
            <WritingDiaryScreen
                {...this.state}
                onStyleKeyPress={this._onStyleKeyPress}
                onSelectedTagChanged={this._onSelectedTagChanged}
                onSelectedStyleChanged={this._onSelectedStyleChanged}
                onValueChanged={this._onValueChanged}
                onTitleChanged={this._onTitleChanged}
                insertContents={this._insertContents}
                renderImageSelector={this._renderImageSelector}
                renderFontSizeSelector={this._renderFontSizeSelector}
                onRemoveImage={this._onRemoveImage}
                insertImage={this._insertImage}
                inputEditor={this._inputEditor}
                focused={this._focused}
                unfocused={this._unfocused}
                toggleModal={this._toggleModal}
                handleChoosePhoto={this._handleChoosePhoto}
                handleCamera={this._handleCamera}
                handelChooseVideo={this._handelChooseVideo}
                changeContent={this._changeContent}
            />

        );
    }

    // 이미지 관련 모달 show/hide 
    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    // true : 타이틀 입력 시 Text Editor 안보이도록
    _focused = () => {
        this.setState({
            focused_title: true
        })
    }

    // Text Editor 보이도록 
    _unfocused = () => {
        this.setState({
            focused_title: false
        })
    }

    _onStyleKeyPress = (toolType) => {
        this.editor.applyToolbar(toolType);
    }

    _onSelectedTagChanged = (tag) => {
        this.setState({
            selectedTag: tag
        })
    }

    // 적용된 스타일 값이 넘어온다 Bold 클릭 시 styles='bold'
    _onSelectedStyleChanged = (styles) => {
        this.setState({
            selectedStyles: styles,
        })
        return this.state.selectedStyles
    }

    _inputEditor = (input) => {
        this.editor = input;
    }

    // 텍스트 입력 시 
    _onValueChanged = (value) => {

        /*
        value 데이터 형태 
        value = [{
            "id":"y0Jek8b7X",
            "component":"text",
            "content":[{'id':'EdaYCD42Q',
                        'text':'T',
                        'len':1,
                        'stype':[],
                        'styleList':[{"fontSize":20}],'tag':'body','NewLine':true
        }]}]
        
        형태로 쌓여나간다. 
        */
        this.setState({
            contents: value
        });
    }

    // 제목 입력 시 
    _onTitleChanged = (value) => {
        this.setState({
            title: value
        })
    }

    // 글쓰기 저장 
    _insertContents = async () => {
        const { insertDiaryContents } = this.props;
        const result = await insertDiaryContents(this.state.diary_num, this.state.title, this.state.contents);
        if (result) {
            this.props.navigation.navigate("DiaryContentsScreen", {
                title: this.state.title,
                write_date: this.props.diaryContent[0].write_date,
                nickname: this.props.diaryContent[0].nickname,
                page_num: JSON.stringify(result), // 작성한 일기의 page_num 값 
                diary_num: this.state.diary_num,
                diaryContent: this.props.diaryContent[0].contents
            });
            this.setState({ page_num: JSON.stringify(result) });
        }
    }

    // 갤러리에서 비디오 선택 시 
    _handelChooseVideo = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Videos',
            allowsEditing: true,
            aspect: [4, 4],
            base64: false,
        });

        this._insertVideo(result.uri);

        this.setState({ // 이미지 적용 시 모달 사라지도록 
            isModalVisible: false
        });
    }

    // 갤러리에서 사진 선택 시 
    _handleChoosePhoto = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
            base64: false,
        });

        this._insertImage(result.uri);

        this.setState({ // 이미지 적용 시 모달 사라지도록 
            isModalVisible: false
        });
    }

    // 카메라 기능 
    _handleCamera = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            base64: false,
        });
        console.log(result);

        this._insertImage(result.uri);

        this.setState({
            isModalVisible: false
        });

    }

    askPermissionsAsync = async () => {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        this.setState({
            hasCameraPermission: camera.status === 'granted',
            hasCameraRollPermission: cameraRoll.status === 'granted'
        });
    };

    _onRemoveImage = ({ url, id }) => {
        // do what you have to do after removing an image
        console.log(`image removed (url : ${url})`);
    }

    _insertImage(url) {
        this.editor.insertImage(url);
    }

    _insertVideo(url, id, height, width) {
        const { focusInputIndex } = this.state;
        const { value } = this.props;
        let index = focusInputIndex + 1;

        const myHeight = (this.state.layoutWidth - 4 < width) ? height * ((this.state.layoutWidth - 4) / width) : height;
        this.contentHeights[index] = myHeight + 4;

        const item = {
            id: shortid.generate(),
            imageId: id,
            component: 'video',
            url,
            size: {
                height,
                width,
            },
        };

        let newContents = value;
    }

    // 컨텐츠 수정 시 
    _changeContent = () => {
        console.log("changeContent()");
        const { updateDiaryContents } = this.props;
        const result = updateDiaryContents(this.state.diary_num, this.state.page_num, this.state.title, this.state.contents);

        if (result) {
            this.props.navigation.navigate("DiaryContentsScreen", {
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