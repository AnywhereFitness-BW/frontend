import './App.css';
import Register from './components/Register.js'
import React from 'react'

const intitialRegisterState = {
  name: '',
  text: '',
  email: '',
}

function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <Register />
    </div>
  );
}

export default App;
