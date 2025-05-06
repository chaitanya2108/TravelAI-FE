import React from "react";
import { View, Image, StyleSheet } from "react-native";

export const Background = () => {
  return (
    <>
      <View style={styles.topHalf} />
      <View style={styles.bottomHalf} />
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/gradient-tropical-sunset-background_52683-131844.png")}
          style={styles.image}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topHalf: {
    flex: 1,
    backgroundColor: "#35238F",
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "#000721",
  },
  imageContainer: {
    position: "absolute",
    width: "100%",
    top: "50%",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    resizeMode: "cover",
  },
});
