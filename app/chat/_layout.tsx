import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Svg, { Path } from "react-native-svg";
import { Touchable, TouchableOpacity } from "react-native";

// Main layout component
export default function Layout() {
  return (
    <>
      {/* Root view for gesture handling */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Drawer component for side navigation */}
        <Drawer
          screenOptions={({ navigation }) => ({
            // Header configuration for each screen in the drawer
            headerLeft: ({}) => (
              // Button to open the drawer
              <TouchableOpacity
                style={{
                  marginLeft: 20,
                }}
                onPress={() => navigation.openDrawer()}
              >
                {/* Hamburger menu icon */}
                <Svg width="26" height="26" viewBox="0 0 24 24">
                  <Path
                    fill="#000"
                    d="M3 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"
                  />
                </Svg>
              </TouchableOpacity>
            ),
          })}
        >
          {/* Drawer screen configuration */}
          <Drawer.Screen
            name="index"
            options={{
              title: "Chat",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}
