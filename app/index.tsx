import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { Background } from "../components/Background";
import { Logo } from "../components/Logo";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../config";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleLogin = async () => {
    try {
      console.log("Attempting login with:", { email, password });
      const loginUrl = `${config.API_BASE_URL}${config.AUTH_ENDPOINTS.LOGIN}`;
      const response = await axios.post(
        loginUrl,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 10000,
        }
      );

      console.log("Login response:", response.data);
      if (response.status === 200) {
        Alert.alert("Success", "Congratulations! You have logged in!");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        Alert.alert(
          "Login Failed",
          error.response.data?.message ||
            "Please check your credentials and try again."
        );
      } else if (error.request) {
        // The request was made but no response was received
        Alert.alert(
          "Connection Error",
          "Could not connect to the server. Please check if the server is running and accessible."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      console.log("Initiating Google login");

      // Construct the Google login URL
      const googleLoginUrl = `${config.API_BASE_URL}${config.AUTH_ENDPOINTS.GOOGLE_LOGIN}`;

      // Open the URL in the device's browser
      const supported = await Linking.canOpenURL(googleLoginUrl);

      if (supported) {
        await Linking.openURL(googleLoginUrl);
      } else {
        Alert.alert("Error", "Cannot open Google login URL. Please try again.");
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      Alert.alert(
        "Error",
        "Failed to initiate Google login. Please try again."
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Background />
      <View style={styles.mainContainer}>
        <Logo />
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="rgba(255, 255, 255, 0.7)"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.googleButton,
              isGoogleLoading && styles.submitButtonDisabled,
            ]}
            onPress={handleGoogleLogin}
            disabled={isGoogleLoading}
          >
            <Text style={styles.googleButtonText}>
              {isGoogleLoading ? "Signing in..." : "Sign up with Google"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-start",
    paddingVertical: 40,
  },
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
  passwordContainer: {
    position: "relative",
    marginBottom: 15,
  },
  passwordInput: {
    paddingRight: 50, // Make room for the eye icon
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
});
