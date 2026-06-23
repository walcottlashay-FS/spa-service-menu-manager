import { Stack } from "expo-router";

// Main navigation layout for the mobile app.
export default function RootLayout() {
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

