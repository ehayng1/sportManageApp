import { StyleSheet, Text, View, Pressable } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserList } from "./UserList";

export function Events({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: wp("5%") }}>
          <Text style={{ fontWeight: 700, fontSize: 24 }}>Events</Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ marginRight: wp("5%") }}>
          <Pressable onPress={() => navigation.navigate("UserList")}>
            <Text style={{ color: "green", fontSize: 16 }}>Give Points</Text>
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <>
      {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}> */}
      <View style={{ margin: 20 }}>
        <Text
          style={{
            fontWeight: "400",
            marginBottom: 15,
          }}
        >
          UPCOMING EVENTS
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: hp("20%"),
            marginBottom: hp("2%"),
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              marginTop: 15,
              marginLeft: 40,
            }}
          >
            Event details for today
          </Text>
        </View>
        <Text
          style={{
            fontWeight: "400",
            marginBottom: 15,
          }}
        >
          PREVIOUS EVENTS
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: hp("60%"),
            marginBottom: hp("2%"),
            borderRadius: 10,
          }}
        ></View>
      </View>
    </>
  );
}

const Stack = createStackNavigator();
export default function EventTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Events"
        component={Events}
        options={{ headerTitleAlign: "center", title: "" }}
      />
      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{
          title: " ",
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
