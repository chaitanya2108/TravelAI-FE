import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { config } from "../config";
import { Ionicons } from "@expo/vector-icons";

export const SignupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleBack = () => {
    router.back();
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Alert.alert("Error", "All fields are required");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const signupUrl = `${config.API_BASE_URL}${config.AUTH_ENDPOINTS.SIGNUP}`;
      console.log("Making API call to:", signupUrl);
      console.log("Sending data:", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      const response = await axios.post(
        signupUrl,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      console.log("Response:", response.data);

      Alert.alert(
        "Success",
        "Congratulations! You have successfully signed up!",
        [
          {
            text: "OK",
            onPress: () => router.back(), // Return to login page
          },
        ]
      );
    } catch (error: any) {
      console.error("Error details:", error);
      console.error("Error message:", error.message);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response) {
        Alert.alert(
          "Signup Failed",
          error.response.data?.message ||
            "Please check your information and try again."
        );
      } else if (error.request) {
        Alert.alert(
          "Connection Error",
          "Could not connect to the server. Please check if the server is running and accessible."
        );
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
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

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Confirm Password"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry={!showConfirmPassword}
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={24}
              color="rgba(255, 255, 255, 0.7)"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            isLoading && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
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
  submitButton: {
    backgroundColor: "#35238F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  submitButtonDisabled: {
    backgroundColor: "#35238F80",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    alignItems: "center",
  },
  backButtonText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
