import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textLogo}>RxWizard</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search for a medication"
          style={styles.searchBar}
        />
        <Ionicons name="search" style={styles.searchIcon} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  textLogo: {
    alignSelf: "center",
    marginVertical: 40,
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
  searchBar: {
    borderWidth: 1,
    width: "100%",
    height: 40,
    borderRadius: 20,
    padding: 10,
    paddingRight: 50,
    borderColor: "#000",
  },
  searchBarContainer: {
    alignSelf: "center",
    position: "relative",
    width: "80%",
  },
  searchIcon: {
    position: "absolute",
    right: 15,
    top: 10,
    fontSize: 20,
  },
});

export default Page;
