import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";

const Page = () => {
  const [data, setData] = useState([]);
  const { query } = useLocalSearchParams();

  useEffect(() => {
    console.log(query);

    axios
      .post("http://192.168.1.37:3000/search", { query: "paracetamol" })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View>
      <Text>{data}</Text>
    </View>
  );
};

export default Page;
