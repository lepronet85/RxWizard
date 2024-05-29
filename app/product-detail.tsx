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
      <View style={styles.medicationImageContainer}>
        <Image
          source={{
            uri: medication?.imageUrl,
            width: 150,
            height: 150,
          }}
        />
      </View>
      <ScrollView style={styles.medicationDetailContainer}>
        <View>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Name: </Text>
            {medication?.name}
          </Text>
        </View>
        <View style={styles.subdetail}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Description: </Text>
            {medication?.description}
          </Text>
        </View>
        <View style={styles.subdetail}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Usage: </Text>
            {medication?.usage}
          </Text>
        </View>
        <View style={styles.subdetail}>
          <Text style={{ fontWeight: "bold" }}>Side Effects: </Text>
          {medication?.side_effects.map((effect, index) => (
            <View
              key={index}
              style={{ marginLeft: 20, flexDirection: "row", gap: 10 }}
            >
              <Text style={{ fontWeight: "bold" }}>-</Text>
              <Text>{effect} </Text>
            </View>
          ))}
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
  medicationImageContainer: {
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#e1e1e1",
    borderStyle: "dotted",
  },
  medicationDetailContainer: {
    width: "80%",
    alignSelf: "center",
    paddingVertical: 20,
  },
  subdetail: {
    marginTop: 10,
  },
});

export default Page;
