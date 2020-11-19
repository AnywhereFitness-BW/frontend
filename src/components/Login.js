import React, { useState, useEffect } from "react";
// import axios from "axios";
import * as yup from "yup";
import {
  UncontrolledAlert,
  Container,
  Button,
  Form,
  Row,
  Col,
  ButtonToggle,
} from "reactstrap";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loginIsDisabled, setLoginIsDisabled] = useState(true);

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
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
    validateChange(event);
  };

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Not a valid email")
      .required("Email is required"),
    password: yup.string().required("Please enter password"),
  });

  useEffect(() => {
    formSchema.isValid(Login).then((valid) => {
      // console.log("is my form valid?", valid);
      setLoginIsDisabled(!valid);
    });
  }, [formSchema]);

  const onSubmit = (e) => {
    e.preventDefault();
    formSchema.isValid(login).then((valid) => {
      if (!valid) return;
    });
    console.log("form submitted");
  };

  return (
    <Container>
      <div>
        {errors.email && (
          <UncontrolledAlert color="danger">{errors.email} </UncontrolledAlert>
        )}
        {errors.password && (
          <UncontrolledAlert color="danger">
            {errors.password}{" "}
          </UncontrolledAlert>
        )}
      </div>

      <Form onSubmit={onSubmit}>
        <Row xs="2">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h2>Login</h2>
            <input
              onChange={onInputChange}
              onBlur={onInputChange}
              name="email"
              email="email"
              type="text"
              placeholder="Enter email"
              value={login.email}
            />
            <input
              onChange={onInputChange}
              onBlur={onInputChange}
              name="password"
              password="password"
              type="password"
              placeholder="Enter password"
              value={login.password}
            />
            {/* <input type="submit" /> */}
            <ButtonToggle color="info" type="submit" disabled={loginIsDisabled}>
              Submit
            </ButtonToggle>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
