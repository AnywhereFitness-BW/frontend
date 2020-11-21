import React, { useState, useEffect } from "react";
import * as yup from "yup";
import styled from "styled-components";
import {
  UncontrolledAlert,
  Container,
  Row,
  Col,
  ButtonToggle,
  Form,
} from "reactstrap";

const CustomBox = styled.div`
  width: 400px;
  margin: 0px auto;
  border-radius: 10px;
  padding: 40px;
  border: 10px;
  background-color: #9370db;
`;

const BoxContents = styled.div`
  // margin-right: 200px;
`;

const RegisterPrompt = styled.h2`
  color: white;
  width: 100%;
`;

const Inputs = styled.div`
  margin-bottom: 10px;
  input {
    width: 250px;
  }
`;

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

  return (
    <CustomBox>
      <Container className="text-center">
        <div>
          {errors.fname && (
            <UncontrolledAlert color="danger">
              {" "}
              {errors.fname}{" "}
            </UncontrolledAlert>
          )}
          {errors.lname && (
            <UncontrolledAlert color="danger">
              {errors.lname}{" "}
            </UncontrolledAlert>
          )}
          {errors.email && (
            <UncontrolledAlert color="danger">
              {errors.email}{" "}
            </UncontrolledAlert>
          )}
          {errors.password && (
            <UncontrolledAlert color="danger">
              {errors.password}{" "}
            </UncontrolledAlert>
          )}
          {errors.confirmPassword && (
            <UncontrolledAlert color="danger">
              {errors.confirmPassword}{" "}
            </UncontrolledAlert>
          )}
        </div>

        <BoxContents>
          <Form onSubmit={onSubmit}>
            <RegisterPrompt>Register Now!</RegisterPrompt>
            <Inputs>
              <input
                onChange={onInputChange}
                name="fname"
                id="fname"
                type="text"
                onBlur={onInputChange}
                value={formData.fname}
                placeholder="First name"
              />
            </Inputs>
            <Inputs>
              <input
                onChange={onInputChange}
                name="lname"
                id="lname"
                type="text"
                onBlur={onInputChange}
                value={formData.lname}
                placeholder="Last name"
              />
            </Inputs>
            <Inputs>
              <input
                onChange={onInputChange}
                name="email"
                id="email"
                type="text"
                onBlur={onInputChange}
                value={formData.email}
                placeholder="Email address"
              />
            </Inputs>
            <Inputs>
              <input
                onChange={onInputChange}
                name="password"
                id="password"
                type="password"
                onBlur={onInputChange}
                value={formData.password}
                placeholder="Create password"
              />
            </Inputs>
            <Inputs>
              <input
                onChange={onInputChange}
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                onBlur={onInputChange}
                value={formData.confirmPassword}
                placeholder="Confirm password"
              />
            </Inputs>
            <Inputs>
              <select onChange={onInputChange} name="userRole">
                <option value="">--Choose one--</option>
                <option value="student">I am a student.</option>
                <option value="instructor">I am an instructor.</option>
              </select>
            </Inputs>
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
            <ButtonToggle
              disabled={isButtonDisabled}
              color="info"
              type="submit"
            >
              Submit
            </ButtonToggle>
          </Form>
        </BoxContents>
      </Container>
    </CustomBox>
  );
};

export default Register;
