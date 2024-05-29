import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import axios from "axios";
import { Medication } from "../types";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Medication[]>([]);
  const [noResult, setNoResult] = useState<number>(1);
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setLoaded(true);

    axios
      .post("http://192.168.1.37:3000/search", {
        query: searchQuery,
      })
      .then((response) => {
        setNoResult(response.data.length);
        setSearchResults(response.data);
        setLoaded(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // 192.168.1.37
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
      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        {!loaded ? (
          <Text style={styles.searchBtnText}>Search</Text>
        ) : (
          <ActivityIndicator size={24} color={"#fff"} />
        )}
      </TouchableOpacity>
      <ScrollView style={styles.resultArea}>
        {noResult ? (
          searchResults.map((result) => (
            <View key={result?._id}>
              <Link
                href={`/product-detail?id=${result?._id}`}
                style={styles.resultLink}
              >
                <Text style={styles.reultLinkText}>{result?.name}</Text>
              </Link>
            </View>
          ))
        ) : (
          <Text style={{ alignSelf: "center" }}>Aucun résultat</Text>
        )}
      </ScrollView>
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
  resultArea: {
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
  resultLink: {
    marginVertical: 4,
  },
  reultLinkText: {
    color: "#1a0dab",
    textDecorationLine: "underline",
  },
});

export default Page;
