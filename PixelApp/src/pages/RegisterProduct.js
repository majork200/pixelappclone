import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const RegisterProduct = ({ navigation }) => {
  let [productName, setProductName] = useState("");
  let [productMarca, setProductMarca] = useState("");
  let [productPreco, setProductPreco] = useState("");

  let registerProduct = () => {
    if (!productName) {
      alert("Por favor preencha o nome do Produto!");
      return;
    }
    if (!productMarca) {
      alert("Por favor preencha a Marca do Produto!");
      return;
    }
    if (!productPreco) {
      alert("Por favor preencha o preço do Produto!");
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO table_produto (produto_name, produto_marca, produto_preco) VALUES (?,?,?)",
        [productName, productMarca, productPreco],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Sucesso",
              "Produto Registrado com Sucesso !!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Erro ao tentar Registrar o Produto !!!");
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: "space-between" }}
            >
              <Mytextinput
                placeholder="Nome do Produto"
                onChangeText={(productName) => setProductName(productName)}
                style={{ padding: 10 }}
              />

              <Mytextinput
                placeholder="Marca do Produto"
                onChangeText={(productMarca) => setProductMarca(productMarca)}
                style={{ padding: 10 }}
              />

              <Mytextinput
                placeholder="Preço do Produto"
                onChangeText={(productPreco) => setProductPreco(productPreco)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />

              <Mybutton title="Salvar" customClick={registerProduct} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterProduct;
