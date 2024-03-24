import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {Icon} from "react-native-elements"
import { useNavigation } from "@react-navigation/native";

const AIScreen = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <TouchableOpacity onPress = {() => navigation.navigate("Home")}>
        <Icon
          style = {{borderColor: "#00CCBB", borderWidth: 3}}
          className = "borderColor-[#00CCBB] rounded-full w-10 h-10 justify-center ml-8 mt-5"
          name = "arrowleft"
          color = "#00CCBB"
          type = "antdesign"
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AIScreen