import React from "react";
import { Text, View, TouchableOpacity, Dimensions, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const SearchBox = props => (
    <View>
        <SearchView>
            <TextInput
                onChangeText={props.changeSearchValue}
                onSubmitEditing={props.searchDiaryTitle}
                maxLength={20}
                value={props.searchValue}
                placeholder='일기장 제목을 입력해주세요' />
            <TouchableOpacity onPress={props.searchDiaryTitle}>
                <FontAwesome name="search" size={31} color={"#2f3640"} />
            </TouchableOpacity>
        </SearchView>
        <View>
            {props.diaryLength > 0 && props.search === true && (
                <SearchResultText>총 {props.diaryLength} 개의 다이어리가 검색되었습니다</SearchResultText>)}
        </View>
    </View>
)

const SearchView = styled.View`
    marginTop:20
    alignItems:center
    flexDirection: row
`;

const TextInput = styled.TextInput`
    width: 250
    borderRadius: 5
    marginBottom: 2
    marginRight: 5
    borderBottomWidth:1
    height:30
    paddingLeft:10%
    marginBottom: 5
`;

const SearchResultText = styled.Text`
    color: grey;
`

export default SearchBox;