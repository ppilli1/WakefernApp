// remote packages imports
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import sanityClient from "../sanity";
import { Icon } from "react-native-elements";

// icons imports
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";

// component imports
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  // when the UI loads, hide the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // when the component loads, fetch the data
  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  // debug the data you just fetched
  console.log(featuredCategories);

  return (
    <SafeAreaView className="bg-white">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="w-7 h-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        {/*<UserIcon size={35} color="#00CCBB" />*/}
        <TouchableOpacity onPress = {() => navigation.navigate("AIScreen")}>
        <Icon
          style = {{borderColor: "#00CCBB", borderWidth: 3}}
          className = "borderColor-[#00CCBB] rounded-full w-10 h-10 justify-center"
          name = "robot"
          color = "#00CCBB"
          type = "material-community"
        />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row items-center flex-1 space-x-2 bg-gray-200 p-2">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
            color="#00CCBB"
          />
        </View>

        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Feautured Categories */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
