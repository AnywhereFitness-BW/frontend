import { useEffect, useState } from "react";
import {
  CardDeck,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  CardSubtitle,
  CardText,
  Spinner,
  Badge,
  Container,
} from "reactstrap";
import { DateTime } from "luxon";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const ViewClass = () => {
  const [loading, setLoading] = useState(true);
  const [currentClass, setCurrentClass] = useState({});
  const [userInClass, setUserInClass] = useState(false);
  const user = useSelector((state) => state.user.user);
  const { id } = useParams();

  useEffect(() => {
    const loadClass = async () => {
      try {
        setLoading(true);
        const classResponse = await axios.get(`/api/classes/${id}`);
        setCurrentClass(classResponse.data.data);
        const c =
          classResponse.data.data.clients.filter(
            (client) => client.id === user.id
          ).length === 1;

        setUserInClass(c);
        console.log("userinClass", c);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadClass();
  }, [user]);

  const loadImage = (type) => {
    switch (type) {
      case "yoga":
        return "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80";
      case "crossfit":
        return "https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80";
      case "cardio":
        return "https://images.unsplash.com/photo-1590646299178-1b26ab821e34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80";
      default:
        return "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80";
    }
  };

  const leaveJoinClass = async () => {
    await axios.post(`/api/classes/${id}/${userInClass ? "leave" : "join"}`);
    setUserInClass(!userInClass);
    const newNum = userInClass
      ? currentClass.numberOfRegisteredAttendees - 1
      : currentClass.numberOfRegisteredAttendees + 1;
    setCurrentClass({ ...currentClass, numberOfRegisteredAttendees: newNum });
  };

  return (
    <Container>
      {loading ? (
        <Spinner color="primary" className="m-auto" />
      ) : (
        <Card
          width="256px"
          className="d-flex flex-column justify-content-between"
        >
          <CardImg
            top
            width="100%"
            height="171px"
            src={loadImage(currentClass.type)}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h5">{currentClass.name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {DateTime.fromISO(currentClass.time).toFormat(
                "MM-dd-yyyy hh:mm a"
              )}
            </CardSubtitle>
            <CardSubtitle
              tag="h6"
              className="mb-2 my-3 d-flex justify-content-between align-items-center"
            >
              <p>
                Location: <Badge color="dark">{currentClass.location}</Badge>
              </p>
              <p>
                Type: <Badge color="dark">{currentClass.type}</Badge>
              </p>
            </CardSubtitle>
            <div className="my-3">
              <div>
                <Badge color="primary">{currentClass.duration}</Badge> Minutes
              </div>
              <div>
                <Badge color="info">{currentClass.intensity}</Badge> /{" "}
                <Badge color="warning">5</Badge> Intensity
              </div>
              <div>
                <Badge color="info">
                  {currentClass.numberOfRegisteredAttendees}
                </Badge>{" "}
                / <Badge color="warning">{currentClass.maxClassSize}</Badge>{" "}
                Members
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              {userInClass ? (
                <Button
                  color="danger"
                  onClick={() => leaveJoinClass(currentClass.id)}
                >
                  Leave
                </Button>
              ) : (
                currentClass.instructor.id !== user.id && (
                  <Button
                    color="success"
                    onClick={() => leaveJoinClass(currentClass.id)}
                  >
                    Join
                  </Button>
                )
              )}
              <div>
                Instructor: {currentClass.instructor.fname}{" "}
                {currentClass.instructor.lname}
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </Container>
  );
};

export default ViewClass;
