import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./components/styles2";
import { DatabaseConnection } from "./components/database";

function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [endereco, setEndereco] = useState("");
  const [datanascimento, setDataNascimento] = useState("");
  const [cpf, setCPF] = useState("");
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  useEffect(() => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, senha TEXT, endereco TEXT, datanascimento TEXT, cpf TEXT)",
        [],
        () => {
          console.log('Tabela "users" criada com sucesso.');
        },
        (error) => {
          console.error('Erro ao criar a tabela "users":', error);
        }
      );
    });
  }, []);

  const handleCadastro = () => {
    const db = DatabaseConnection.getConnection();

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (name, email, senha, endereco, datanascimento, cpf) VALUES (?, ?, ?, ?, ?, ?)",
        [nome, email, senha, endereco, datanascimento, cpf],
        (_, result) => {
          console.log("Funcionário cadastrado com sucesso!");
          setCadastroSucesso(true);
          setTimeout(() => {
            setCadastroSucesso(false);
            navigation.navigate("Login");
          }, 3000);
        },
        (_, error) => {
          console.error("Erro ao inserir o novo funcionário:", error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Funcionário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={(text) => setEndereco(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        value={datanascimento}
        onChangeText={(text) => setDataNascimento(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={(text) => setCPF(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar Funcionário</Text>
      </TouchableOpacity>

      {cadastroSucesso && (
        <Text style={styles.successMessage}>
          Usuário cadastrado com sucesso!
        </Text>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#96A61C" }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CadastroScreen;
