import React, { useState, useEffect } from "react";
import * as yup from "yup";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userRegister } from "../actions/user";
import { addMessage } from "../actions/messages";
import { UncontrolledAlert, Container, ButtonToggle, Form } from "reactstrap";

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
  margin-bottom: 20px;
  padding-right: 75px;
`;

const Inputs = styled.div`
  margin-bottom: 18px;
  input {
    width: 275px;
  }
`;

const Register = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    userRole: "",
    authCode: "",
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
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
    username: yup.string().required("Username is required"),
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
  }, [formData, formSchema]);

  const onSubmit = async (e) => {
    e.preventDefault();
    formSchema.isValid(formData).then((valid) => {
      if (!valid) return;
    });
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords don't match" });
      return;
    }
    setErrors({ ...errors, confirmPassword: "" });
    const registerResponse = await dispatch(
      userRegister({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        authCode: formData.authCode,
        lname: formData.lname,
        fname: formData.fname,
      })
    );

    if (registerResponse) {
      dispatch(
        addMessage(
          "You have successfully registered, you can now log in.",
          "info"
        )
      );
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "INSTRUCTOR" || user.role === "ADMIN")
        history.push("/lessons");
      else history.push("/");
    }
  }, [user]);

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
                type="email"
                onBlur={onInputChange}
                value={formData.email}
                placeholder="Email address"
              />
            </Inputs>
            <Inputs>
              <input
                onChange={onInputChange}
                name="username"
                id="username"
                type="text"
                onBlur={onInputChange}
                value={formData.username}
                placeholder="Username"
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
