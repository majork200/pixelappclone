import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { styles } from "./components/styles2";
import { DatabaseConnection } from "./components/database";

const db = DatabaseConnection.getConnection();

function LoginScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE name = ? AND senha = ?",
        [nome, senha],
        (_, { rows }) => {
          if (rows.length > 0) {
            navigation.navigate("HomeScreen");
          } else {
            Alert.alert("Erro", "Nome de usuário ou senha incorretos.");
          }
        },
        (_, error) => {
          console.error("Erro ao executar a consulta SQL:", error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Logar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#96A61C" }]}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
