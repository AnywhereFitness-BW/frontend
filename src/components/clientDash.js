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
import { Link } from "react-router-dom";
const ClientDash = () => {
  const [loading, setLoading] = useState(false);
  const [myClasses, setMyClasses] = useState([]);

  useEffect(() => {
    const loadMyClasses = async () => {
      try {
        setLoading(true);
        const classes = await axios.get("/api/classes");
        setMyClasses(classes.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadMyClasses();
  }, []);

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

  const showClasses = () => {
    return myClasses.length === 0
      ? "You are not signed up for any classes right now."
      : myClasses.map((cl) => (
          <Card
            width="256px"
            className="d-flex flex-column justify-content-between"
          >
            <CardImg
              top
              width="100%"
              height="171px"
              src={loadImage(cl.type)}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h5">{cl.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {DateTime.fromISO(cl.time).toFormat("MM-dd-yyyy hh:mm a")}
              </CardSubtitle>
              <CardSubtitle
                tag="h6"
                className="mb-2 my-3 d-flex justify-content-between align-items-center"
              >
                <p>
                  Location: <Badge color="dark">{cl.location}</Badge>
                </p>
                <p>
                  Type: <Badge color="dark">{cl.type}</Badge>
                </p>
              </CardSubtitle>
              <div className="my-3">
                <div>
                  <Badge color="primary">{cl.duration}</Badge> Minutes
                </div>
                <div>
                  <Badge color="info">{cl.intensity}</Badge> /{" "}
                  <Badge color="warning">5</Badge> Intensity
                </div>
                <div>
                  <Badge color="info">{cl.numberOfRegisteredAttendees}</Badge> /{" "}
                  <Badge color="warning">{cl.maxClassSize}</Badge> Members
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Button color="danger" onClick={() => leaveClass(cl.id)}>
                  Leave
                </Button>
                <Link to={`/classes/${cl.id}`} className="btn btn-primary">
                  View
                </Link>
              </div>
            </CardBody>
          </Card>
        ));
  };

  const leaveClass = async (id) => {
    await axios.post(`/api/classes/${id}/leave`);
    setMyClasses(myClasses.filter((cl) => cl.id !== id));
  };

  return (
    <Container>
      <h3 className="text-center my-3">Your Classes</h3>
      <CardDeck className="d-flex flex-wrap">
        {loading ? (
          <Spinner color="primary" className="m-auto" />
        ) : (
          showClasses()
        )}
      </CardDeck>
    </Container>
  );
};

export default ClientDash;
