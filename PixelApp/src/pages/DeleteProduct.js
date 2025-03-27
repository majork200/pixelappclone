import React, { useState } from "react";
import { View, Alert, SafeAreaView } from "react-native";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const DeleteProduct = ({ navigation }) => {
  let [inputProductId, setInputProductId] = useState("");

  let deleteProduct = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM table_produto where produto_id=?",
        [inputProductId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Sucesso",
              "Produto Excluído com Sucesso !",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert("Por favor entre com um código ID de Produto válido !");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Entre com o Código do Produto"
            onChangeText={(inputProductId) => setInputProductId(inputProductId)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Excluir Produto" customClick={deleteProduct} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteProduct;
