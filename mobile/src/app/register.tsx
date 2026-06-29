import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import AppButton from "../components/AppButton";
import { useAuth } from "../context/AuthContext";

const API_URL =
  "https://spa-service-menu-manager-api.onrender.com/api/auth/register";

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Creates a new user account and logs the user into the mobile app.
  async function handleRegister() {
    if (!name || !email || !password) {
      setMessage("Please fill in all fields before registering.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed. Please try again.");
        return;
      }

      login(data.user, data.token);
      setMessage("");

      router.push("/services" as never);
    } catch (error) {
      console.error("Register error:", error);
      setMessage("Something went wrong while registering.");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
          <View style={styles.card}>
            <Text style={styles.eyebrow}>Create Account</Text>

            <Text style={styles.title}>Register to get started.</Text>

            <Text style={styles.description}>
              Create an account to access the protected spa service dashboard.
            </Text>

            {message ? <Text style={styles.message}>{message}</Text> : null}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Test User"
                placeholderTextColor="#9b9085"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="email@example.com"
                placeholderTextColor="#9b9085"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="password"
                placeholderTextColor="#9b9085"
                secureTextEntry
              />
            </View>

            <View style={styles.buttonStack}>
              <AppButton title="Register" onPress={handleRegister} />

              <AppButton
                title="Already Have an Account?"
                variant="soft"
                onPress={() => router.push("/login" as never)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f1e8",
  },
  keyboardView: {
    flex: 1,
  },
  page: {
    flex: 1,
    backgroundColor: "#f7f1e8",
  },
  pageContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#fffaf2",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "#ddd3c3",
  },
  eyebrow: {
    color: "#7c8f63",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    color: "#332c27",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 38,
    marginBottom: 12,
  },
  description: {
    color: "#675c52",
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 22,
  },
  message: {
    color: "#8f3f3f",
    backgroundColor: "#f8dddd",
    padding: 12,
    borderRadius: 14,
    marginBottom: 18,
    fontWeight: "700",
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    color: "#332c27",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dfd4c4",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#332c27",
  },
  buttonStack: {
    gap: 12,
    marginTop: 10,
  },
});
