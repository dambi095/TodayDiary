import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, KeyboardAvoidingView, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const WritingDiaryScreen = props => {
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableWithoutFeedback style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={Keyboard.dismiss}>
                    {props.image !== null && props.image !== undefined ? (
                        <View>
                            <TouchableOpacity onPressOut={props.pickImage} style={{ backgroundColor: 'powderblue', alignItems: 'center', width: width, height: height / 3 }}>

                                {props.image &&
                                    <Image source={{ uri: props.image }} resizeMode="stretch" style={{ width: width, height: height / 3 }} />}

                            </TouchableOpacity>
                        </View>
                    ) : (
                            <TouchableOpacity onPressOut={props.pickImage} style={{ backgroundColor: 'powderblue', alignItems: 'center', width: width, height: height / 3 }}>
                                <Text style={styles.text}>사진을 등록하세요</Text>
                            </TouchableOpacity>
                        )}
                </TouchableWithoutFeedback>
                <KeyboardAvoidingView enabled style={{ flex: 1, marginTop: "5%" }}>
                    <TextInput maxLength={20}
                        placeholder=" 제목을 입력해주세요 (최대 20자)"
                        style={{ width: width }}
                        value={props.title}
                        onChangeText={props.onTitleChanged}
                    />
                    <TextInput maxLength={250}
                        multiline={true}
                        numberOfLines={2}
                        style={{ width: width, marginTop: "5%" }}
                        placeholder='하루를 적어주세요(최대 250자)'
                        value={props.contents}
                        onChangeText={props.onContentChanged}
                    />
                </KeyboardAvoidingView>
                <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                    <TouchableOpacity onPressOut={() => props.navigation.goBack()} style={{ width: width / 2 }}>
                        <Text>취소</Text>
                    </TouchableOpacity>
                    {props.isModified !== true ? (
                        <TouchableOpacity onPressOut={props.insertContents}>
                            <Text>등록</Text>
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity onPressOut={props.changeContent}>
                                <Text>수정</Text>
                            </TouchableOpacity>)}

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};


const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 20
    }
});

export default WritingDiaryScreen;