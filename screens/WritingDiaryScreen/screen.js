import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, KeyboardAvoidingView, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const WritingDiaryScreen = props => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableWithoutFeedback style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={Keyboard.dismiss}>
                {props.image !== null ? (
                    <View>
                        {props.image &&
                            <Image source={{ uri: props.image }} resizeMode="stretch" style={{ width: width, height: height / 3 }} />}
                    </View>
                ) : (
                        <TouchableOpacity onPressOut={props.pickImage} style={{ backgroundColor: 'powderblue', alignItems: 'center' }}>
                            <Text style={styles.text}>사진을 등록하세요</Text>
                        </TouchableOpacity>
                    )}
            </TouchableWithoutFeedback>
            <KeyboardAvoidingView enabled style={{ flex: 1 }}>
                <TextInput maxLength={20}
                    placeholder=" 제목을 입력해주세요 (최대 20자)"
                    style={{ width: width }}
                    value={props.title}
                    onChangeText={props.onTitleChanged}
                />
                <TextInput maxLength={250}
                    multiline={true}
                    numberOfLines={2}
                    style={{ width: width }}
                    placeholder='하루를 적어주세요(최대 250자)'
                    value={props.contents}
                    onChangeText={props.onContentChanged}
                />
            </KeyboardAvoidingView>
            <View>
                <TouchableOpacity onPressOut={() => props.navigation.goBack()}>
                    <Text>취소</Text>
                </TouchableOpacity>
                {props.diaryContent[0].contents ? (
                    <TouchableOpacity onPressOut={props.insertContents}>
                        <Text>등록</Text>
                    </TouchableOpacity>
                ) : (
                <TouchableOpacity onPressOut={props.insertContents}>
                    <Text>수정</Text>
                </TouchableOpacity>)}

            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: 40,
        height: 30,
        backgroundColor: 'powderblue',
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    line: {
        backgroundColor: 'grey',
        height: 1,
        width: '95%',
        marginLeft: 6,
        marginBottom: 10
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 20
    }
});

export default WritingDiaryScreen;