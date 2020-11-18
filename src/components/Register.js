import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isAuthVisible, setIsAuthVisible] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    userRole: "",
    authCode: "",
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    userRole: "",
    authCode: "",
  });

  const validateChange = (e) => {
    e.persist();
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  const onInputChange = (event) => {
    if (event.target.name === "userRole") {
      setIsAuthVisible(event.target.value === "instructor");
    }
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    validateChange(event);
  };

  const formSchema = yup.object().shape({
    fname: yup.string().required("First name is required"),
    lname: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Not a valid email")
      .required("Email is required"),
    password: yup.string().required("Please create a password"),
    confirmPassword: yup.string().required("Please confirm password"),
    userRole: yup.string().oneOf(["student", "instructor"]),
    authCode: yup.string(),
  });

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      // console.log("is my form valid?", valid);
      setIsButtonDisabled(!valid);
    });
  }, [formData]);

  const onSubmit = (e) => {
    e.preventDefault();
    formSchema.isValid(formData).then((valid) => {
      if (!valid) return;
    });
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords don't match" });
      return;
    }
    setErrors({ ...errors, confirmPassword: "" });
    console.log("form submitted");
  };

  const hasErrors = () => {
    if (errors.fname) return true;
    if (errors.lname) return true;
    if (errors.email) return true;
    if (errors.password) return true;
    if (errors.confirmPassword) return true;
    return false;
  };

  return (
    <div>
      <h1>Register Now!</h1>
      {hasErrors() && (
        <div>
          Here are the errors. <br />
          First name: {errors.fname}
          <br />
          Last name: {errors.lname} <br />
          Email: {errors.email} <br />
          Password: {errors.password} <br />
          Confirm password: {errors.confirmPassword} <br />
        </div>
      )}
      <form onSubmit={onSubmit}>
        <input
          onChange={onInputChange}
          name="fname"
          id="fname"
          type="text"
          onBlur={onInputChange}
          value={formData.fname}
          placeholder="First name"
        />
        <input
          onChange={onInputChange}
          name="lname"
          id="lname"
          type="text"
          onBlur={onInputChange}
          value={formData.lname}
          placeholder="Last name"
        />

        <input
          onChange={onInputChange}
          name="email"
          id="email"
          type="text"
          onBlur={onInputChange}
          value={formData.email}
          placeholder="Email address"
        />

        <input
          onChange={onInputChange}
          name="password"
          id="password"
          type="password"
          onBlur={onInputChange}
          value={formData.password}
          placeholder="Create password"
        />

        <input
          onChange={onInputChange}
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          onBlur={onInputChange}
          value={formData.confirmPassword}
          placeholder="Confirm password"
        />

        <label>
          Choose one:
          <select onChange={onInputChange} name="userRole">
            <option value="">--Choose one--</option>
            <option value="student">I am a student.</option>
            <option value="instructor">I am an instructor.</option>
          </select>
        </label>
        {isAuthVisible && (
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
        )}

        {/* <input type="submit" /> */}
        <button disabled={isButtonDisabled} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
