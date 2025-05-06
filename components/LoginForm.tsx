import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export const LoginForm = () => {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        placeholderTextColor="#A0A0A0"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Sign up with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "85%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    backdropFilter: "blur(10px)",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "white",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  loginButton: {
    backgroundColor: "#35238F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: "#000721",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#35238F",
  },
  googleButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  googleButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPassword: {
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
