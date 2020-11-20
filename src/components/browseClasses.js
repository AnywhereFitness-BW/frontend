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
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
const BrowseClasses = () => {
  const [loading, setLoading] = useState(false);
  const [allClasses, setAllClasses] = useState([]);
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    const loadMyClasses = async () => {
      try {
        setLoading(true);
        const classes = await axios.get(`/api/classes/all${queryString}`);
        setAllClasses(classes.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadMyClasses();
  }, [queryString]);

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
    return allClasses.length === 0
      ? "There are currently no available classes."
      : allClasses.map((cl) => (
          <Card
            width="256px"
            style={{ minWidth: "256px", maxWidth: "256px" }}
            className="d-flex flex-column justify-content-between my-3"
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
                {cl.time}
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
              <div className="d-flex justify-content-end align-items-center">
                <Link to={`/classes/${cl.id}`} className="btn btn-primary">
                  View
                </Link>
              </div>
            </CardBody>
          </Card>
        ));
  };

  return (
    <Container>
      <h3 className="text-center my-3">Browse Classes</h3>
      <SearchForm updateQuery={(q) => setQueryString(q)} />
      <CardDeck className="d-flex flex-wrap justify-content-center">
        {loading ? (
          <Spinner color="primary" className="m-auto" />
        ) : (
          showClasses()
        )}
      </CardDeck>
    </Container>
  );
};

export default BrowseClasses;
