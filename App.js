import React, { useEffect, useState, Suspense } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import StatsScreen from "./src/components/StatsScreen";
import HabitsScreen from "./src/components/HabitsScreen";
import BoardScreen from "./src/components/HomeScreen";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { ActivityIndicator } from "react-native";
import { SQLiteProvider } from "expo-sqlite";

const loadDataBase = async () => {
  const dbName = "test.db";
  const dbAsset = require("./assets/test.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [dbLoaded, setDbLoaded] = useState();

  useEffect(() => {
    loadDataBase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Suspense
          fallback={
            <View style={{ flex: 1, backgroundColor: "red" }}>
              <ActivityIndicator size={"large"} />
              <Text>Loading data...</Text>
            </View>
          }
        >
          <SQLiteProvider
            databaseName="test.db"
            /* assetSource={{ assetId: require("./assets/test.db") }} */
            useSuspense
          >
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Board") {
                    iconName = focused ? "today" : "today-outline";
                  } else if (route.name === "Habits") {
                    iconName = focused ? "list" : "list-outline";
                  } else if (route.name === "Stats") {
                    iconName = focused ? "stats-chart" : "stats-chart-outline";
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
              })}
            >
              <Tab.Screen
                name="Board"
                component={BoardScreen}
                options={{
                  headerTitle: "Board of the day",
                  headerLargeTitle: true,
                }}
              />
              <Tab.Screen name="Habits" component={HabitsScreen} />
              <Tab.Screen name="Stats" component={StatsScreen} />
            </Tab.Navigator>
          </SQLiteProvider>
        </Suspense>
      </NavigationContainer>
    </SafeAreaView>
  );
}
