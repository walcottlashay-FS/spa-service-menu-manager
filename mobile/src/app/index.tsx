
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import AppButton from "../components/AppButton";
import { useAuth } from "../context/AuthContext";

// Mobile home screen for the spa service manager.
export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>Spa Menu Studio</Text>

          <Text style={styles.title}>Welcome to your spa menu manager.</Text>

          <Text style={styles.description}>
            Keep your spa services organized in one place. Login to view your
            service list, update prices, add new treatments, or remove outdated
            menu items.
          </Text>

          {user ? (
            <View style={styles.userBox}>
              <Text style={styles.userText}>You are logged in as {user.name}</Text>
            </View>
          ) : null}

          <View style={styles.buttonStack}>
            {user ? (
              <>
                <AppButton
                  title="Open Service Dashboard"
                  onPress={() => router.push("/services" as never)}
                />

                <AppButton title="Logout" variant="soft" onPress={logout} />
              </>
            ) : (
              <>
                <AppButton
                  title="Login"
                  onPress={() => router.push("/login" as never)}
                />

                <AppButton
                  title="Create Account"
                  variant="soft"
                  onPress={() => router.push("/register" as never)}
                />
              </>
            )}
          </View>
        </View>

        <View style={styles.dashboardSection}>
          <Text style={styles.sectionTitle}>What you can do</Text>

          <View style={styles.toolGrid}>
            <View style={styles.toolCard}>
              <Text style={styles.toolNumber}>01</Text>
              <Text style={styles.toolTitle}>Sign in securely</Text>
              <Text style={styles.toolText}>
                Create an account or login before accessing your spa service
                dashboard.
              </Text>
            </View>

            <View style={styles.toolCard}>
              <Text style={styles.toolNumber}>02</Text>
              <Text style={styles.toolTitle}>Manage your service menu</Text>
              <Text style={styles.toolText}>
                View your current services, categories, and pricing from a
                protected dashboard.
              </Text>
            </View>

            <View style={styles.toolCard}>
              <Text style={styles.toolNumber}>03</Text>
              <Text style={styles.toolTitle}>Make quick updates</Text>
              <Text style={styles.toolText}>
                Add new services, edit existing details, or remove services you
                no longer offer.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Private access for your menu</Text>
          <Text style={styles.noteText}>
            Your service dashboard is protected, so only logged-in users can
            make changes to the spa menu.
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
  userBox: {
    backgroundColor: "#e8ddcd",
    borderRadius: 18,
    padding: 14,
    marginTop: 18,
  },
  userText: {
    color: "#332c27",
    fontSize: 15,
    fontWeight: "800",
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

