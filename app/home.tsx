import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textLogo}>RxWizard</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search for a medication"
          style={styles.searchBar}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" style={styles.searchIcon} />
      </View>
      <Link
        href={`/product-detail?query=${searchQuery}`}
        asChild
        style={styles.searchBtn}
      >
        <TouchableOpacity>
          <Text style={styles.searchBtnText}>Search</Text>
        </TouchableOpacity>
      </Link>
      <Link href={"/chat"} style={styles.chatIconContainer}>
        <Ionicons name="chatbox-ellipses" style={styles.chatIcon} />
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  searchBtn: {
    backgroundColor: "#fa745d",
    width: "80%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  searchBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  chatIconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  chatIcon: {
    fontSize: 60,
    color: "#fa745d",
  },
});

export default Page;
