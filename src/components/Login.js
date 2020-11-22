import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../actions/user";
import styled from "styled-components";
import * as yup from "yup";
import {
  UncontrolledAlert,
  // Container,
  Form,
  Row,
  Col,
  ButtonToggle,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const CustomBox = styled.div`
  width: 300px;
  margin: 0px auto;
  border-radius: 10px;
  padding: 40px;
  border: 10px;
  background-color: #9370db;
`;

const BoxContents = styled.div`
  margin-right: 200px;
`;

const LoginPrompt = styled.h2`
  color: white;
  margin-bottom: 20px;
`;

const LoginInputs = styled.div`
  margin-bottom: 10px;
`;

const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
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
    username: yup.string().required("Username is required"),
    password: yup.string().required("Please enter password"),
  });

  useEffect(() => {
    formSchema.isValid(Login).then((valid) => {
      // console.log("is my form valid?", valid);
      setLoginIsDisabled(!valid);
    });
  }, [formSchema]);

  const onSubmit = async (e) => {
    e.preventDefault();
    formSchema.isValid(login).then((valid) => {
      if (!valid) return;
    });
    await await dispatch(userLogin(login.username, login.password));
  };

  useEffect(() => {
    if (user) {
      if (user.role === "INSTRUCTOR" || user.role === "ADMIN")
        history.push("/lessons");
      else history.push("/");
    }
  }, [user]);

  return (
    <CustomBox active={props.active}>
      {/* <Container> */}
      <div>
        {errors.username && (
          <UncontrolledAlert color="danger">
            {errors.username}{" "}
          </UncontrolledAlert>
        )}
        {errors.password && (
          <UncontrolledAlert color="danger">
            {errors.password}{" "}
          </UncontrolledAlert>
        )}
      </div>

      <BoxContents>
        <Form onSubmit={onSubmit}>
          <Row xs="2">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <LoginPrompt>Login</LoginPrompt>
              <LoginInputs>
                <input
                  onChange={onInputChange}
                  onBlur={onInputChange}
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                  value={login.username}
                />
              </LoginInputs>
              <LoginInputs>
                <input
                  onChange={onInputChange}
                  onBlur={onInputChange}
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={login.password}
                />
              </LoginInputs>
              {/* <input type="submit" /> */}
              <ButtonToggle
                color="info"
                type="submit"
                disabled={loginIsDisabled}
              >
                Submit
              </ButtonToggle>
            </Col>
          </Row>
        </Form>
      </BoxContents>
      {/* </Container> */}
    </CustomBox>
  );
};

export default Login;
