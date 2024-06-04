import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import ChatMessage from "@/components/ChatMessage";
import LottieView from "lottie-react-native";
import { Medication } from "@/types";
import { Image } from "react-native";

const Page = () => {
  const [text, setText] = useState<string>("");
  const [height, setHeight] = useState<number>(40);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [medication, setMedication] = useState<Medication>();
  const [animatedText, setAnimatedText] = useState<string>("");

  const { id } = useLocalSearchParams();

  const animation = useRef<LottieView>(null);

  const handleContentSizeChange = (event: {
    nativeEvent: { contentSize: { height: number } };
  }) => {
    const currentHeight = event.nativeEvent.contentSize.height;
    setHeight(currentHeight <= 206 ? currentHeight : 206);
  };

  const handleSendMessage = () => {
    if (!text.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        message: text.trim(),
        emitter: "user",
      },
    ]);

    setText("");
    setHeight(40);
    Keyboard.dismiss();

    setTimeout(() => {
      setLoading(true);
    }, 1000);

    axios
      .post("http://192.168.1.37:3000/chat", {
        message: text,
        medicationId: id,
      })
      .then((response) => {
        setLoading(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            message: response.data.message,
            emitter: "rx",
          },
        ]);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    axios
      .get(`http://192.168.1.37:3000/search/${id}`)
      .then((response) => {
        setLoading(false);
        setMedication(response.data);
        // console.log(response.data);

        const message = `Bonjour et bienvenue! Je suis votre assistant virtuel, prêt à vous aider avec toutes vos questions sur ${response.data.name}. Comment puis-je vous assister aujourd'hui?`;

        const messageArray = message.split("");

        let i = 0;

        const interval = setInterval(() => {
          setAnimatedText((prevText) => prevText + messageArray[i]);
          i++;

          if (i === messageArray.length) {
            clearInterval(interval);
          }
        }, 5);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textLogo}>RxWizard</Text>
      <View
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: "#f1f1f1",
        }}
      >
        <ScrollView
          style={{
            padding: 20,
          }}
        >
          {medication && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#f1f1f1",
                padding: 10,
                borderRadius: 10,
                alignSelf: "flex-start",
                marginBottom: 10,
              }}
            >
              <Image
                source={{ uri: medication?.imageUrl }}
                width={60}
                height={60}
              />
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    textAlign: "justify",
                  }}
                >
                  {animatedText}
                </Text>
              </View>
            </View>
          )}
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.message}
              emitter={message.emitter}
              loading={loading}
            />
          ))}
          {loading && (
            <View
              style={{
                backgroundColor: "#f1f1f1",
                borderRadius: 10,
                alignSelf: "flex-start",
                marginBottom: 10,
              }}
            >
              <LottieView
                autoPlay
                loop
                ref={animation}
                style={{
                  width: 50,
                  height: 30,
                }}
                source={require("../..//assets/animations/dots-loader.json")}
              />
            </View>
          )}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Type your message here..."
          style={[styles.searchBar, { height }]}
          multiline={true}
          onChangeText={setText}
          onContentSizeChange={handleContentSizeChange}
          value={text}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Ionicons name="send" size={30} color="#fa745d" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textLogo: {
    alignSelf: "center",
    marginVertical: 20,
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginTop: 10,
  },
  searchBar: {
    borderWidth: 1,
    width: "80%",
    borderRadius: 20,
    padding: 10,
    paddingRight: 50,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
});

export default Page;
