import React, { useState } from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";
import Mytext from "./components/Mytext";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const ViewProduct = () => {
  let [inputProductName, setInputProductName] = useState("");
  let [productData, setProductData] = useState([]);

  let searchProduct = () => {
    setProductData([]);
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_produto WHERE produto_name COLLATE BINARY = ?",
        [inputProductName],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            // Aqui, você cria uma lista de produtos se houver mais de um resultado
            let products = [];
            for (let i = 0; i < len; i++) {
              products.push(results.rows.item(i));
            }
            setProductData(products);
          } else {
            alert("Produto não encontrado !");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Filtro de Produto" />
          <Mytextinput
            placeholder="Entre com o Nome do Produto"
            onChangeText={(inputProductName) =>
              setInputProductName(inputProductName)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Buscar Produto" customClick={searchProduct} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10,
            }}
          >
            {productData.length > 0 ? (
              <FlatList
                data={productData}
                keyExtractor={(item) => item.produto_id.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Text>Código ID do Produto: {item.produto_id}</Text>
                    <Text>Nome do Produto: {item.produto_name}</Text>
                    <Text>Marca do Produto: {item.produto_marca}</Text>
                    <Text>Preço do Produto: {item.produto_preco}</Text>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "black",
                        marginVertical: 5,
                      }}
                    />
                  </View>
                )}
              />
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewProduct;
