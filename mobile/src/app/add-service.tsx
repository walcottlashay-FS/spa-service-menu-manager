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
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import AppButton from "../components/AppButton";
import { createService } from "../services/api";

export default function AddServiceScreen() {
  const router = useRouter();

  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  // Validates the form and sends the new service to the API.
  async function handleCreateService() {
    if (!serviceName || !category || !price) {
      setMessage("Please complete all fields before saving.");
      return;
    }

    try {
      await createService({
        serviceName,
        category,
        price: Number(price),
      });

      setServiceName("");
      setCategory("");
      setPrice("");
      setMessage("");

      router.push("/services" as never);
    } catch (error) {
      console.error("Error creating service:", error);
      setMessage("The service could not be added. Please try again.");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.page}
          contentContainerStyle={styles.pageContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formCard}>
            <Text style={styles.eyebrow}>New Service</Text>

            <Text style={styles.title}>Add a spa service.</Text>

            <Text style={styles.description}>
              Create a new service listing for your spa menu. Add the service
              name, category, and price so your menu stays current.
            </Text>

            {message ? <Text style={styles.message}>{message}</Text> : null}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Service Name</Text>
              <TextInput
                style={styles.input}
                value={serviceName}
                onChangeText={setServiceName}
                placeholder="Hydrating Glow Facial"
                placeholderTextColor="#9b9085"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Category</Text>
              <TextInput
                style={styles.input}
                value={category}
                onChangeText={setCategory}
                placeholder="Facial"
                placeholderTextColor="#9b9085"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="139"
                placeholderTextColor="#9b9085"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.buttonStack}>
              <AppButton title="Save Service" onPress={handleCreateService} />

              <AppButton
                title="Back to Services"
                variant="soft"
                onPress={() => router.push("/services" as never)}
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
  formCard: {
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

