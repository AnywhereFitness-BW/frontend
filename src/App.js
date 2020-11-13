import "./App.css";
import Register from "./components/Register.js";
import React from "react";
// import Login from './components/Login.js'

const intitialRegisterState = {
  name: "",
  text: "",
  email: "",
};

function App() {
  return (
    <div className="App">
      <Register />
    </div>
  );
}

export default App;
