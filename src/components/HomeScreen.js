import { SafeAreaView, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

function BoardScreen() {
  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      getData().catch((e) => console.log(e));
    });
  }, [db]);

  async function getData() {
    const result = await db.getAllAsync(`SELECT * FROM UserData;`);
    console.log(result);
  }

  return <SafeAreaView style={styles.container}></SafeAreaView>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BoardScreen;
