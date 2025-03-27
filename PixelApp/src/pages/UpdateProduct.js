import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from "react-native";

import Mytext from "./components/Mytext";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const UpdateProduct = ({ navigation }) => {
  let [inputProductId, setInputProductId] = useState("");
  let [productName, setProductName] = useState("");
  let [productMarca, setProductMarca] = useState("");
  let [productPreco, setProductPreco] = useState("");

  let updateAllStates = (name, marca, preco) => {
    setProductName(name);
    setProductMarca(marca);
    setProductPreco(preco);
  };

  let searchProduct = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_produto where produto_id = ?",
        [inputProductId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.produto_name,
              res.produto_marca,
              res.produto_preco
            );
          } else {
            alert("Produto não encontrado!");
            updateAllStates("", "", "");
          }
        }
      );
    });
  };

  let updateProduct = () => {
    if (!inputProductId) {
      alert("Por Favor informe o Código ID do Produto!");
      return;
    }
    if (!productName) {
      alert("Por favor informe o Nome do Produto !");
      return;
    }
    if (!productMarca) {
      alert("Por Favor informe a Marca do Produto !");
      return;
    }
    if (!productPreco) {
      alert("Por Favor informe o preço do Produto !");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE table_produto set produto_name=?, produto_marca=? , produto_preco=? where produto_id=?",
        [productName, productMarca, productPreco, inputProductId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Sucesso",
              "Produto atualizado com sucesso !!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Erro ao atualizar o Produto");
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
              <Mytext text="Filtro de Produtos" />
              <Mytextinput
                placeholder="Entre com o Código ID do Produto"
                style={{ padding: 10 }}
                onChangeText={(inputProductId) =>
                  setInputProductId(inputProductId)
                }
              />
              <Mybutton title="Buscar um Produto" customClick={searchProduct} />
              <Mytextinput
                placeholder="Entre com o Nome do Produto"
                value={productName}
                style={{ padding: 10 }}
                onChangeText={(productName) => setProductName(productName)}
              />

              <Mytextinput
                value={productMarca}
                placeholder="Entre com a Marca do Produto"
                onChangeText={(productMarca) => setProductMarca(productMarca)}
                style={{ padding: 10 }}
              />

              <Mytextinput
                placeholder="Entre com o preço do Produto"
                value={"" + productPreco}
                onChangeText={(productPreco) => setProductPreco(productPreco)}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mybutton title="Atualizar Produto" customClick={updateProduct} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateProduct;
