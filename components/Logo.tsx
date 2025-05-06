import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>TravelAI</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
