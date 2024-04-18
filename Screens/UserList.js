import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export function UserList() {
  const [point, setPoint] = useState(0);

  return (
    <ScrollView style={{ padding: wp("3%") }}>
      <View
        style={{
          backgroundColor: "white",
          padding: wp("3%"),
          marginBottom: hp("3%"),
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: hp("2%"), fontWeight: 600 }}>
          Users
        </Text>
        <Text style={{ fontSize: 18, marginBottom: hp("1%") }}> Email: </Text>
        <Text style={{ fontSize: 18, marginBottom: hp("1%") }}> Points: </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            marginTop: hp("2%"),
            gap: wp("4%"),
          }}
        >
          <Pressable
            onPress={() => setPoint(point - 1)}
            style={{
              backgroundColor: "green",
              padding: wp("3%"),
              borderRadius: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
              - 3
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setPoint(point - 1)}
            style={{
              backgroundColor: "green",
              padding: wp("3%"),
              borderRadius: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
              - 1
            </Text>
          </Pressable>
          <View>
            {/* <Text style={{ fontSize: 20 }}>{point}</Text> */}
            <TextInput
              style={styles.input}
              onChangeText={setPoint}
              value={point}
            />
          </View>
          <Pressable
            onPress={() => setPoint(point + 1)}
            style={{
              backgroundColor: "green",
              padding: wp("3%"),
              borderRadius: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
              + 1
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setPoint(point + 1)}
            style={{
              backgroundColor: "green",
              padding: wp("3%"),
              borderRadius: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
              + 3
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={{
            backgroundColor: "green",
            padding: wp("3%"),
            borderRadius: 10,
            marginTop: hp("3%"),
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Give Points</Text>
        </Pressable>
        {/* <Button title="+3"></Button> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
  },
});
