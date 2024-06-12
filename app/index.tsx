import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

// Page component for displaying onboarding animation and navigating to home screen

const Page = () => {
  const animation = useRef(null);
  const router = useRouter();

  // Navigate to the home screen after a delay
  useEffect(() => {
    setTimeout(() => {
      router.navigate("home");
    }, 5000);
  });

  return (
    <View style={styles.container}>
      {/* Onboarding image */}
      <Image
        source={require("../assets/images/onboarding.jpg")}
        style={styles.img}
      />
      {/* Loading animation */}
      <LottieView
        autoPlay
        loop
        ref={animation}
        style={{
          width: 200,
          height: 100,
        }}
        source={require("../assets/animations/loading.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 300,
    height: 300,
  },
});

export default Page;
