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

const EditClass = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [types, setTypes] = useState([]);
  const { id } = useParams();
  const [currentClass, setCurrentClass] = useState({});
  const [userOwnsClass, setUserOwnsClass] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadClass = async () => {
      try {
        const cc = await axios.get(`/api/classes/${id}`);
        if (cc.data.data.instructor.id !== user.id) setUserOwnsClass(false);
        else {
          const c = { ...cc.data.data };
          c.date = DateTime.fromISO(c.time).toISODate();
          c.time = DateTime.fromISO(c.time).toFormat("HH:mm");
          setCurrentClass(c);
        }
      } catch (error) {
        console.log(error);
        dispatch(addMessage(error.response.data.message, "danger"));
      }
    };
    if (user) loadClass();
  }, [user]);

  useEffect(() => {
    const loadTypes = async () => {
      const t = await axios.get("/api/classes/types");
      console.log(t.data.data);
      setTypes(t.data.data.map((type) => type.name));
    };
    if (user) loadTypes();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const string = currentClass.date + " " + currentClass.time;
    const newTime = DateTime.fromFormat(string, "yyyy-MM-dd HH:mm").toSQL();
    const newClass = { ...currentClass, time: newTime };
    delete newClass.date;
    try {
      const response = await axios.put(
        `/api/classes/${currentClass.id}`,
        newClass
      );
      history.push(`/classes/${currentClass.id}`);
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
      <h3 className="text-center my-3">Edit Class</h3>
      {!userOwnsClass && (
        <h6>You do not have the permissions to edit this class.</h6>
      )}
      <Container className="w-75 text-center">
        <Form onSubmit={onSubmit}>
          <InputGroup className="my-3">
            <InputGroupAddon addonType="prepend">Class Name</InputGroupAddon>
            <Input
              name="name"
              value={currentClass.name}
              disabled={!userOwnsClass}
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
          </div>
          <div className="d-flex justify-content-around">
            <InputGroup className="my-3 w-50 px-3">
              <InputGroupAddon addonType="prepend">Duration</InputGroupAddon>
              <Input
                name="duration"
                type="number"
                value={currentClass.duration}
                disabled={!userOwnsClass}
                onChange={onInputChange}
              />
              <InputGroupAddon addonType="append">Minutes</InputGroupAddon>
            </InputGroup>
            <InputGroup className="my-3 w-50 px-3">
              <InputGroupAddon addonType="prepend">Location</InputGroupAddon>
              <Input
                name="location"
                value={currentClass.location}
                disabled={!userOwnsClass}
                onChange={onInputChange}
              />
            </InputGroup>
            <InputGroup className="my-3 w-50 px-3">
              <InputGroupAddon addonType="prepend">Intensity</InputGroupAddon>
              <Input
                name="intensity"
                type="number"
                value={currentClass.intensity}
                disabled={!userOwnsClass}
                onChange={onInputChange}
              />
              <InputGroupAddon addonType="append">(Out of 5)</InputGroupAddon>
            </InputGroup>
          </div>
          <div className="d-flex justify-content-around align-items-start">
            <InputGroup className="my-3 w-50 px-3">
              <InputGroupAddon addonType="prepend">
                Max Class Size
              </InputGroupAddon>
              <Input
                name="maxClassSize"
                type="number"
                value={currentClass.maxClassSize}
                onChange={onInputChange}
              />
            </InputGroup>
            <InputGroup className="my-3 ml-3 d-flex justify-content-center">
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
          <Button color="success" onClick={onSubmit}>
            Save
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default EditClass;
