import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import AppButton from "../components/AppButton";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.pageContent}
      >
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Spa Menu Studio</Text>

          <Text style={styles.title}>Manage your spa menu from anywhere.</Text>

          <Text style={styles.description}>
            A mobile service menu manager built for spa managers, estheticians,
            and wellness business owners who need a simple way to keep services,
            categories, and pricing organized.
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What this app manages</Text>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Service Names</Text>
            <Text style={styles.featureText}>
              Keep facials, peels, massage, body treatments, and wellness
              services clearly listed.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Categories</Text>
            <Text style={styles.featureText}>
              Organize services by treatment type so the menu stays easy for a
              spa manager to review.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Pricing</Text>
            <Text style={styles.featureText}>
              Update service pricing when your spa menu changes or seasonal
              offers are added.
            </Text>
          </View>
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
    paddingBottom: 40,
  },
  heroCard: {
    margin: 20,
    padding: 24,
    borderRadius: 28,
    backgroundColor: "#fffaf2",
    borderWidth: 1,
    borderColor: "#ddd3c3",
  },
  eyebrow: {
    color: "#7c8f63",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  title: {
    color: "#332c27",
    fontSize: 38,
    fontWeight: "800",
    lineHeight: 42,
    marginBottom: 18,
  },
  description: {
    color: "#675c52",
    fontSize: 17,
    lineHeight: 28,
  },
  buttonStack: {
    gap: 12,
    marginTop: 24,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#332c27",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
  },
  featureCard: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e5dccc",
  },
  featureTitle: {
    color: "#332c27",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 8,
  },
  featureText: {
    color: "#675c52",
    fontSize: 15,
    lineHeight: 24,
  },
});
