import { Pressable, StyleSheet, Text, View } from "react-native";
import type { SpaService } from "../services/api";

type ServiceCardProps = {
  service: SpaService;
  onDelete: (id: string) => void;
  onEdit: (service: SpaService) => void;
};

// Displays one spa service card with Edit and Remove actions.
export default function ServiceCard({
  service,
  onDelete,
  onEdit,
}: ServiceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.category}>{service.category}</Text>

      <Text style={styles.name}>{service.serviceName}</Text>

      <Text style={styles.price}>${service.price}</Text>

      {service.created_at ? (
        <Text style={styles.date}>
          Added {new Date(service.created_at).toLocaleDateString()}
        </Text>
      ) : null}

      <View style={styles.buttonRow}>
        <Pressable style={styles.editButton} onPress={() => onEdit(service)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(service._id)}
        >
          <Text style={styles.deleteButtonText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fffaf2",
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e3d8c8",
  },
  category: {
    color: "#7c8f63",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  name: {
    color: "#332c27",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  price: {
    color: "#332c27",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  date: {
    color: "#82776d",
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  editButton: {
    backgroundColor: "#efe6d8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d6cbbd",
  },
  editButtonText: {
    color: "#332c27",
    fontSize: 15,
    fontWeight: "800",
  },
  deleteButton: {
    backgroundColor: "#f8dddd",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e4b7b7",
  },
  deleteButtonText: {
    color: "#8f3f3f",
    fontSize: 15,
    fontWeight: "800",
  },
});

