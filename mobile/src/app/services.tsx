import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppButton from "../components/AppButton";
import ServiceCard from "../components/ServiceCard";
import {
  deleteService,
  getServices,
  updateService,
  type SpaService,
} from "../services/api";

export default function ServicesScreen() {
  const router = useRouter();

  const [services, setServices] = useState<SpaService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editId, setEditId] = useState("");
  const [editServiceName, setEditServiceName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // Loads the current spa service records when the Services screen opens.
  async function loadServices() {
    try {
      setLoading(true);

      const data = await getServices();

      setServices(data);
      setError("");
    } catch (error) {
      console.error("Error loading services:", error);
      setError("Services could not be loaded. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Deletes a selected service and refreshes the menu list.
  async function handleDeleteService(id: string) {
    try {
      await deleteService(id);
      await loadServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      setError("Service could not be removed. Please try again.");
    }
  }

  // Opens the inline edit form with the selected service data.
  function handleStartEdit(service: SpaService) {
    setEditId(service._id);
    setEditServiceName(service.serviceName);
    setEditCategory(service.category);
    setEditPrice(String(service.price));
  }

  // Clears the edit form and returns the service card to normal view.
  function handleCancelEdit() {
    setEditId("");
    setEditServiceName("");
    setEditCategory("");
    setEditPrice("");
  }

  // Sends updated service details to the API and refreshes the menu.
  async function handleUpdateService() {
    if (!editServiceName || !editCategory || !editPrice) {
      setError("Please complete all edit fields before saving.");
      return;
    }

    try {
      await updateService(editId, {
        serviceName: editServiceName,
        category: editCategory,
        price: Number(editPrice),
      });

      handleCancelEdit();
      await loadServices();
    } catch (error) {
      console.error("Error updating service:", error);
      setError("Service could not be updated. Please try again.");
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Current Menu</Text>

          <Text style={styles.title}>Spa Services</Text>

          <Text style={styles.description}>
            View, edit, and remove services currently saved to your spa menu.
            This screen loads live service records from the connected API.
          </Text>

          <View style={styles.headerActions}>
            <AppButton
              title="Add New Service"
              variant="soft"
              onPress={() => router.push("/add-service" as never)}
            />
          </View>
        </View>

        {loading ? <ActivityIndicator size="large" /> : null}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {!loading && services.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No services found</Text>
            <Text style={styles.emptyText}>
              Add your first spa service to begin building your mobile menu.
            </Text>
          </View>
        ) : null}

        {services.map((service) =>
          editId === service._id ? (
            <View style={styles.editCard} key={service._id}>
              <Text style={styles.editTitle}>Edit Service</Text>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Service Name</Text>
                <TextInput
                  style={styles.input}
                  value={editServiceName}
                  onChangeText={setEditServiceName}
                  placeholder="Service name"
                  placeholderTextColor="#9b9085"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Category</Text>
                <TextInput
                  style={styles.input}
                  value={editCategory}
                  onChangeText={setEditCategory}
                  placeholder="Category"
                  placeholderTextColor="#9b9085"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Price</Text>
                <TextInput
                  style={styles.input}
                  value={editPrice}
                  onChangeText={setEditPrice}
                  placeholder="Price"
                  placeholderTextColor="#9b9085"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.actionRow}>
                <Pressable
                  style={styles.saveButton}
                  onPress={handleUpdateService}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>

                <Pressable
                  style={styles.cancelButton}
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <ServiceCard
              key={service._id}
              service={service}
              onDelete={handleDeleteService}
              onEdit={handleStartEdit}
            />
          )
        )}
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
  header: {
    marginBottom: 24,
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
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 12,
  },
  description: {
    color: "#675c52",
    fontSize: 16,
    lineHeight: 25,
  },
  headerActions: {
    marginTop: 16,
  },
  error: {
    color: "#8f3f3f",
    backgroundColor: "#f8dddd",
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
  },
  emptyCard: {
    backgroundColor: "#fffaf2",
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#e3d8c8",
  },
  emptyTitle: {
    color: "#332c27",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  emptyText: {
    color: "#675c52",
    fontSize: 15,
    lineHeight: 24,
  },
  editCard: {
    backgroundColor: "#fffaf2",
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e3d8c8",
  },
  editTitle: {
    color: "#332c27",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 14,
  },
  label: {
    color: "#332c27",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dfd4c4",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#332c27",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: "#7c8f63",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  cancelButton: {
    backgroundColor: "#efe6d8",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d6cbbd",
  },
  cancelButtonText: {
    color: "#332c27",
    fontSize: 15,
    fontWeight: "800",
  },
});

