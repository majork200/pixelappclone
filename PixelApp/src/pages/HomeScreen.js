import React, { useEffect } from "react";
import { View, SafeAreaView, Text } from "react-native";
import MyImageButton from "./components/MyImageButton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_produto'",
        [],
        function (tx, res) {
          if (res.rows.length === 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_produto", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_produto(produto_id INTEGER PRIMARY KEY AUTOINCREMENT, produto_name VARCHAR(20), produto_marca VARCHAR(255), produto_preco REAL)",
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#D4D93D" }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <MyImageButton
              title={
                <Text style={{ color: "#2F400A" }}>Registrar um Produto</Text>
              }
              btnColor="white"
              customClick={() => navigation.navigate("Register")}
            />

            <MyImageButton
              title={
                <Text style={{ color: "#2F400A" }}>Atualizar um Produto</Text>
              }
              btnColor="white"
              customClick={() => navigation.navigate("Update")}
            />

            <MyImageButton
              title={
                <Text style={{ color: "#2F400A" }}>Visualizar um Produto</Text>
              }
              btnColor="white"
              customClick={() => navigation.navigate("View")}
            />
            <MyImageButton
              title={
                <Text style={{ color: "#2F400A" }}>
                  Visualizar Todos Produtos
                </Text>
              }
              btnColor="white"
              customClick={() => navigation.navigate("ViewAll")}
            />
            <MyImageButton
              title={
                <Text style={{ color: "#2F400A" }}>Excluir um Produto</Text>
              }
              btnColor="white"
              customClick={() => navigation.navigate("Delete")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
