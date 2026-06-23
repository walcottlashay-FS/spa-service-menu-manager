
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import AppButton from "../components/AppButton";

// Mobile dashboard landing screen for the spa service manager.
export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>Spa Menu Studio</Text>

          <Text style={styles.title}>Manage your spa services with ease.</Text>

          <Text style={styles.description}>
            A simple mobile dashboard for keeping spa services, categories, and
            pricing organized as your menu changes.
          </Text>

          <View style={styles.buttonStack}>
            <AppButton
              title="View Services"
              onPress={() => router.push("/services" as never)}
            />

            <AppButton
              title="Add New Service"
              variant="soft"
              onPress={() => router.push("/add-service" as never)}
            />
          </View>
        </View>

        <View style={styles.dashboardSection}>
          <Text style={styles.sectionTitle}>Manager Tools</Text>

          <View style={styles.toolGrid}>
            <View style={styles.toolCard}>
              <Text style={styles.toolNumber}>01</Text>
              <Text style={styles.toolTitle}>Review Menu</Text>
              <Text style={styles.toolText}>
                View current services saved to your spa menu.
              </Text>
            </View>

            <View style={styles.toolCard}>
              <Text style={styles.toolNumber}>02</Text>
              <Text style={styles.toolTitle}>Update Pricing</Text>
              <Text style={styles.toolText}>
                Edit prices when treatments or seasonal offers change.
              </Text>
            </View>

            <View style={styles.toolCard}>
              <Text style={styles.toolNumber}>03</Text>
              <Text style={styles.toolTitle}>Organize Services</Text>
              <Text style={styles.toolText}>
                Keep facials, massage, peels, and wellness services categorized.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Built for daily spa operations</Text>
          <Text style={styles.noteText}>
            Use this app to keep your service list clean, current, and easy to
            manage from a mobile-friendly workflow.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f1e8",
  },
  page: {
    flex: 1,
    backgroundColor: "#f7f1e8",
  },
  pageContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerCard: {
    padding: 24,
    borderRadius: 28,
    backgroundColor: "#fffaf2",
    borderWidth: 1,
    borderColor: "#ddd3c3",
    marginBottom: 24,
  },
  eyebrow: {
    color: "#7c8f63",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  title: {
    color: "#332c27",
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 36,
    marginBottom: 14,
  },
  description: {
    color: "#675c52",
    fontSize: 16,
    lineHeight: 25,
  },
  buttonStack: {
    gap: 12,
    marginTop: 24,
  },
  dashboardSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#332c27",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 14,
  },
  toolGrid: {
    gap: 12,
  },
  toolCard: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5dccc",
  },
  toolNumber: {
    color: "#7c8f63",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 8,
  },
  toolTitle: {
    color: "#332c27",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  toolText: {
    color: "#675c52",
    fontSize: 15,
    lineHeight: 23,
  },
  noteCard: {
    backgroundColor: "#e8ddcd",
    borderRadius: 24,
    padding: 20,
  },
  noteTitle: {
    color: "#332c27",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  noteText: {
    color: "#5d534a",
    fontSize: 15,
    lineHeight: 24,
  },
});

