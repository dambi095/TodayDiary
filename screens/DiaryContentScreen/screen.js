import React from "react";
import { StyleSheet, Text, View } from "react-native";
import OptionsMenu from "react-native-options-menu";

// 일기 내용 보여주기 
const DiaryContentScreen = props => (
    <View style={styles.main}>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.titleFont}>제목 : {props.title} </Text>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={styles.font}> {props.write_date.substring(0, 10)} </Text>
                <Text style={styles.font}> {props.nickname} 의 일기 </Text>
                <OptionsMenu
                    button={MoreIcon}
                    buttonStyle={{ width: 20, height: 20, resizeMode: "contain" }}
                    options={["수정", "삭제", "취소"]}
                    actions={[() => {
                          props.navigation.navigate("WritingDiaryScreen", {
                            diary_num: props.diary_num,
                            page_num: props.page_num,
                            title: props.title,
                            contents: convertToObject(props.diaryContent)
                        });
                    }, () => { props.deleteContent(props.diary_num.toString(), props.page_num.toString()) }, () => {}]}
                />
            </View>
            <View style={styles.lineStyle} />
        </View>
        <CNRichTextView
            text={props.diaryContent}
            style={{ flex: 1 }} />
    </View>
);

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingBottom: 1,
        alignItems: 'stretch',
    },
    titleFont: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5
    },
    font: {
        fontSize: 15,
        fontWeight: '200'
    },
    button: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonFont: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    lineStyle: {
        backgroundColor: 'grey',
        height: 1,
        width: '95%',
        marginBottom: 5,
        // marginLeft: 15,
    }
})

export default DiaryContentScreen;