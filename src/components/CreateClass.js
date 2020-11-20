import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";
import AutoCompleteText from "react-autocomplete-input";

import { addMessage } from "../actions/messages";
import { DateTime } from "luxon";

const CreateClass = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [types, setTypes] = useState([]);
  const now = DateTime.local();
  const [currentClass, setCurrentClass] = useState({
    id: null,
    name: "",
    date: now.toFormat("yyyy-MM-dd"),
    time: now.toFormat("HH:mm"),
    duration: 60,
    intensity: 3,
    location: "gym",
    maxClassSize: 10,
    type: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTypes = async () => {
      const t = await axios.get("/api/classes/types");
      console.log(t.data.data);
      setTypes(t.data.data.map((type) => type.name));
    };
    loadTypes();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const string = currentClass.date + " " + currentClass.time;
    const newTime = DateTime.fromFormat(string, "yyyy-MM-dd HH:mm").toSQL();
    const newClass = { ...currentClass, time: newTime };
    delete newClass.date;
    try {
      const response = await axios.post(`/api/classes/`, newClass);
      history.push(`/classes/${response.data.data.id}`);
    } catch (error) {
      console.log("err", error.response);
    }
  };

  const onInputChange = (e) => {
    setCurrentClass({ ...currentClass, [e.target.name]: e.target.value });
  };

  const onAutoChange = (st) => {
    setCurrentClass({ ...currentClass, type: st });
  };

  return (
    <Container>
      <h3 className="text-center my-3">Create a Lesson</h3>
      {user && user.role === "CLIENT" && (
        <h6>You do not have permissions to create a lesson.</h6>
      )}
      <Container className="w-75 text-center">
        <Form onSubmit={onSubmit}>
          <InputGroup className="my-3">
            <InputGroupAddon addonType="prepend">Class Name</InputGroupAddon>
            <Input
              name="name"
              value={currentClass.name}
              onChange={onInputChange}
            />
          </InputGroup>
          <div className="d-flex justify-content-between align-items-center">
            <InputGroup className="my-3 mr-3">
              <InputGroupAddon addonType="prepend">Date</InputGroupAddon>
              <Input
                name="date"
                type="date"
                value={currentClass.date}
                onChange={onInputChange}
              />
            </InputGroup>
            <InputGroup className="my-3 mx-3 pl-3">
              <Input
                name="time"
                type="time"
                value={currentClass.time}
                onChange={onInputChange}
              />
              <InputGroupAddon addonType="append">Time</InputGroupAddon>
            </InputGroup>
            <InputGroup className="my-2 ml-3 d-flex justify-content-center">
              <InputGroupAddon addonType="prepend">Type</InputGroupAddon>
              <AutoCompleteText
                name="type"
                className="form-control"
                options={types}
                Component="input"
                value={currentClass.type}
                trigger=""
                spacer=""
                onChange={onAutoChange}
                matchAny={true}
              />
            </InputGroup>
          </div>
          <div className="d-flex justify-content-around">
            <InputGroup className="my-3 w-50 px-3">
              <InputGroupAddon addonType="prepend">Duration</InputGroupAddon>
              <Input
                name="duration"
                type="number"
                value={currentClass.duration}
                onChange={onInputChange}
              />
              <InputGroupAddon addonType="append">Minutes</InputGroupAddon>
            </InputGroup>
            <InputGroup className="my-3 w-50 px-3">
              <InputGroupAddon addonType="prepend">Location</InputGroupAddon>
              <Input
                name="location"
                value={currentClass.location}
                onChange={onInputChange}
              />
            </InputGroup>
            <InputGroup className="my-3 w-50 px-3">
              <InputGroupAddon addonType="prepend">Intensity</InputGroupAddon>
              <Input
                name="intensity"
                type="number"
                value={currentClass.intensity}
                onChange={onInputChange}
              />
              <InputGroupAddon addonType="append">(Out of 5)</InputGroupAddon>
            </InputGroup>
          </div>
          <Button color="success" onClick={onSubmit}>
            Create
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default CreateClass;
