import { Stack } from "expo-router";

// Root layout component for the app's navigation stack
export default function RootLayout() {
  return (
    <Stack>
      {/* Index screen */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      {/* Home screen */}
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      {/* Product detail screen */}
      <Stack.Screen
        name="product-detail"
        options={{
          headerShown: false,
        }}
      />
      {/* Chat screen */}
      <Stack.Screen
        name="chat"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
