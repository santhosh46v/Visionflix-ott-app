import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { AppRegistry } from "react-native";
import BottomTab from "./Nav.js";


const reducer = (state = { menu: "closeMenu", log: "" }, action) => {
  switch (action.type) {
    case "OPENMENU":
      return { ...state, menu: "openMenu" };
    case "CLOSEMENU":
      return { ...state, menu: "closeMenu" };
    case "LOG":
      return { ...state, log: action.email }; 
    case "OPENLOGIN":
      return { ...state,  menu: "openLogin" };
    case "CLOSELOGIN":
      return { ...state,  menu: "closeLogin" };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <BottomTab />
  </Provider>
);

AppRegistry.registerComponent("Allcrea", () => App);

export default App;