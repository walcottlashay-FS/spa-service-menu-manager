import { Stack, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f7f1e8",
        },
        headerTintColor: "#332c27",
        headerTitleStyle: {
          fontWeight: "800",
        },
        contentStyle: {
          backgroundColor: "#f7f1e8",
        },
        headerRight: () => (
          <Pressable
            onPress={() => console.log("Menu pressed")}
            style={{ paddingHorizontal: 12 }}
          >
            <Text style={{ fontSize: 26, color: "#332c27" }}>☰</Text>
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Spa Menu Studio",
        }}
      />

      <Stack.Screen
        name="services"
        options={{
          title: "Spa Services",
        }}
      />

      <Stack.Screen
  name="add-service"
  options={{
    title: "Add Service",
  }}
/>
    </Stack>
  );
}