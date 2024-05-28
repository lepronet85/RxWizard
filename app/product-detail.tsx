// import { View, Text } from "react-native";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { router, useLocalSearchParams } from "expo-router";

// const Page = () => {
//   const [data, setData] = useState([]);
//   const { query } = useLocalSearchParams();

//   useEffect(() => {
//     console.log(query);

//     axios
//       .post("http://192.168.1.37:3000/search", { query })
//       .then((res) => {
//         setData(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <View>
//       <Text>{JSON.stringify(data)}</Text>
//     </View>
//   );
// };

// export default Page;

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
