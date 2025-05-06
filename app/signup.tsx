import React from "react";
import { View } from "react-native";
import { Logo } from "../components/Logo";
import { SignupForm } from "../components/SignupForm";
import { Background } from "../components/Background";

const SignupScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Background />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "flex-start",
          paddingVertical: 40,
        }}
      >
        <Logo />
        <SignupForm />
      </View>
    </View>
  );
};

export default SignupScreen;
