import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/pages/HomeScreen";
import RegisterProduct from "./src/pages/RegisterProduct";
import UpdateProduct from "./src/pages/UpdateProduct";
import ViewProduct from "./src/pages/ViewProduct";
import ViewAllProduct from "./src/pages/ViewAllProduct";
import DeleteProduct from "./src/pages/DeleteProduct";
import LoginScreen from "./src/pages/LoginScreen";
import CadastroScreen from "./src/pages/CadastroScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Tela de Login" }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ title: "Tela de Cadastro" }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Registro de Produtos",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "#96A61C",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterProduct}
          options={{
            title: "Registrar Produto",
            headerStyle: {
              backgroundColor: "#96A61C",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateProduct}
          options={{
            title: "Atualizar Produto",
            headerStyle: {
              backgroundColor: "#96A61C",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewProduct}
          options={{
            title: "Visualizar Produto",
            headerStyle: {
              backgroundColor: "#96A61C",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllProduct}
          options={{
            title: "Visualizar Todos os Produtos",
            headerStyle: {
              backgroundColor: "#96A61C",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteProduct}
          options={{
            title: "Excluir Produto",
            headerStyle: {
              backgroundColor: "#96A61C",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
