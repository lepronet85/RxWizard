import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Svg, { Path } from "react-native-svg";
import { Touchable, TouchableOpacity } from "react-native";

export default function Layout() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={({ navigation }) => ({
            headerLeft: ({}) => (
              <TouchableOpacity
                style={{
                  marginLeft: 20,
                }}
                onPress={() => navigation.openDrawer()}
              >
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
