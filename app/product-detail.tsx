import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { Skeleton } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

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
        {medication?.imageUrl ? (
          <Image
            source={{
              uri: medication?.imageUrl,
              width: 150,
              height: 150,
            }}
          />
        ) : (
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="wave"
            width={150}
            height={150}
          />
        )}
      </View>
      <ScrollView style={styles.medicationDetailContainer}>
        <View>
          {medication?.name ? (
            <Text>
              <Text style={{ fontWeight: "bold" }}>Name: </Text>
              {medication?.name}
            </Text>
          ) : (
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              style={{ width: "100%" }}
              height={20}
            />
          )}
        </View>
        <View style={styles.subdetail}>
          {medication?.description ? (
            <Text>
              <Text style={{ fontWeight: "bold" }}>Description: </Text>
              {medication?.description}
            </Text>
          ) : (
            <View>
              <Skeleton
                LinearGradientComponent={LinearGradient}
                animation="wave"
                style={{ width: "100%" }}
                height={10}
              />
              <Skeleton
                LinearGradientComponent={LinearGradient}
                animation="wave"
                style={{ width: "70%", marginVertical: 5 }}
                height={10}
              />
              <Skeleton
                LinearGradientComponent={LinearGradient}
                animation="wave"
                style={{ width: "30%" }}
                height={10}
              />
            </View>
          )}
        </View>
        <View style={styles.subdetail}>
          {medication?.usage ? (
            <Text>
              <Text style={{ fontWeight: "bold" }}>Usage: </Text>
              {medication?.usage}
            </Text>
          ) : (
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              style={{ width: "40%" }}
              height={10}
            />
          )}
        </View>
        <View style={styles.subdetail}>
          {medication?.side_effects ? (
            <>
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
            </>
          ) : (
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              style={{ width: "20%" }}
              height={10}
            />
          )}
        </View>
        <View style={styles.subdetail}>
          {medication?.interactions ? (
            <>
              <Text style={{ fontWeight: "bold" }}>Interactions: </Text>
              {medication?.interactions.map((interaction, index) => (
                <View
                  key={index}
                  style={{ marginLeft: 20, flexDirection: "row", gap: 10 }}
                >
                  <Text style={{ fontWeight: "bold" }}>-</Text>
                  <Text>{interaction} </Text>
                </View>
              ))}
            </>
          ) : (
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              style={{ width: "20%" }}
              height={10}
            />
          )}
        </View>
      </ScrollView>
      <Link href={`/chat?id=${id}`} style={styles.chatIconContainer}>
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
