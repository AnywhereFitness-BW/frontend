import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
// import styled from 'styled-components'
// import ReactDOM from 'react-dom';

// const StyledForm = styled.div`
//   border: 2px solid black;
//   background-color: pink;
// `

// const StyledInputs = styled.div`
//   display: flex;
//   flex-direction; column
//   justify-content: center;
//   margin: 0px auto;

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    userRole: "",
    authCode: "",
  });

  const onInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h1>Register Now!</h1>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          axios.get(`?formData=${formData}`);
        }}
      >
        <input
          onChange={onInputChange}
          name="fname"
          id="fname"
          type="text"
          value={formData.fname}
          placeholder="First name"
        />
        <input
          onChange={onInputChange}
          name="lname"
          id="lname"
          type="text"
          value={formData.lname}
          placeholder="Last name"
        />

        <input
          onChange={onInputChange}
          name="email"
          id="email"
          type="text"
          value={formData.email}
          placeholder="Email address"
        />

        <input
          onChange={onInputChange}
          name="password"
          id="password"
          type="text"
          value={formData.password}
          placeholder="Create password"
        />

        <label>
          Choose one:
          <select onChange={onInputChange}>
            <option>--Choose one--</option>
            <option value="student">I am a student.</option>
            <option value="instructor">I am an instructor.</option>
          </select>
        </label>
        <label htmlFor="code">
          Authorization code:
          <input
            onChange={onInputChange}
            name="authCode"
            id="authCode"
            value={formData.authCode}
            type="text"
            placeholder="Instructors only"
          />
        </label>
        {/* <input type="submit" /> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
