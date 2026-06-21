import { Pressable, StyleSheet, Text } from "react-native";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "soft";
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
}: AppButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        variant === "soft" ? styles.softButton : styles.primaryButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          variant === "soft" ? styles.softText : styles.primaryText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#7c8f63",
  },
  softButton: {
    backgroundColor: "#efe6d8",
    borderWidth: 1,
    borderColor: "#d6cbbd",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  primaryText: {
    color: "#ffffff",
  },
  softText: {
    color: "#332c27",
  },
});