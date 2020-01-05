import React from "react";
import { Text, View, TouchableOpacity, Dimensions, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const SearchBox = props => (
    <SearchView>
        <TextInput 
        onChangeText={props.changeSearchValue}
        onSubmitEditing={props.searchDiaryTitle}
        maxLength={20} 
        value={props.searchValue}
        placeholder='일기장 제목을 입력해주세요' />
    </SearchView>
)

const SearchView = styled.View`
`;

const TextInput = styled.TextInput`
    width: 250;
    borderRadius: 5;
    marginBottom: 2;
    marginRight: 5;
`;

export default SearchBox;