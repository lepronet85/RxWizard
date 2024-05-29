import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import axios from "axios";

import { Medication } from "../types";

const Page = () => {
  const [medication, setMedication] = useState<Medication>();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    axios
      .get(`http://192.168.1.37:3000/search/${id}`)
      .then((response) => {
        setMedication(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textLogo}>RxWizard</Text>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: medication?.imageUrl,
              width: 100,
              height: 100,
            }}
          />
        </View>
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
