import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ChatMessage = ({
  message,
  emitter,
  loading,
}: {
  message: string;
  emitter: string;
  loading: boolean;
}) => {
  return (
    <View style={emitter === "rx" ? styles.rx : styles.user}>
      <Text style={emitter === "rx" ? styles.rxText : styles.userText}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rx: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  user: {
    backgroundColor: "#fa745d",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  rxText: {
    color: "#000",
  },
  userText: {
    color: "#fff",
  },
});

export default ChatMessage;
