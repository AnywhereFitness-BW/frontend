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
import DeleteModal from "./DeleteModal";
import { DateTime } from "luxon";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const TrainerDash = () => {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [myLessons, setMyLessons] = useState([]);

  useEffect(() => {
    const loadMyLessons = async () => {
      try {
        setLoading(true);
        const lessons = await axios.get(`/api/instructors/${user.id}/lessons`);
        setMyLessons(lessons.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadMyLessons();
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

  const showLessons = () => {
    return myLessons.length === 0
      ? "You are not teaching any classes right now."
      : myLessons.map((lesson) => (
          <Card
            width="256px"
            className="d-flex flex-column justify-content-between"
          >
            <CardImg
              top
              width="100%"
              height="171px"
              src={loadImage(lesson.type)}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h5">{lesson.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {DateTime.fromISO(lesson.time).toFormat("MM-dd-yyyy hh:mm a")}
              </CardSubtitle>
              <CardSubtitle
                tag="h6"
                className="mb-2 my-3 d-flex justify-content-between align-items-center"
              >
                <p>
                  Location: <Badge color="dark">{lesson.location}</Badge>
                </p>
                <p>
                  Type: <Badge color="dark">{lesson.type}</Badge>
                </p>
              </CardSubtitle>
              <div className="my-3">
                <div>
                  <Badge color="primary">{lesson.duration}</Badge> Minutes
                </div>
                <div>
                  <Badge color="info">{lesson.intensity}</Badge> /{" "}
                  <Badge color="warning">5</Badge> Intensity
                </div>
                <div>
                  <Badge color="info">
                    {lesson.numberOfRegisteredAttendees}
                  </Badge>{" "}
                  / <Badge color="warning">{lesson.maxClassSize}</Badge> Members
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Button color="danger" onClick={() => deleteLesson(lesson)}>
                  Delete
                </Button>
                <Link
                  to={`/classes/${lesson.id}/edit`}
                  className="btn btn-success"
                >
                  Edit
                </Link>
                <Link to={`/classes/${lesson.id}`} className="btn btn-primary">
                  View
                </Link>
              </div>
            </CardBody>
          </Card>
        ));
  };

  const deleteLesson = async (lesson) => {
    setLessonToDelete(lesson);
    setModalVisible(true);
  };

  const deleteLessonSuccess = () => {
    setModalVisible(false);
    setMyLessons(myLessons.filter((cl) => cl.id !== lessonToDelete.id));
    setLessonToDelete(null);
  };

  return (
    <Container>
      <DeleteModal
        lesson={lessonToDelete}
        isOpen={modalVisible}
        toggle={() => deleteLessonSuccess()}
      />
      <div className="d-flex justify-content-between align-items-center">
        <div></div>
        <h3 className="text-center my-3">Your Lessons</h3>
        <Link to="/lessons/new" className="btn btn-success">
          + Create Lesson
        </Link>
      </div>
      <CardDeck className="d-flex flex-wrap">
        {loading ? (
          <Spinner color="primary" className="m-auto" />
        ) : (
          showLessons()
        )}
      </CardDeck>
    </Container>
  );
};

export default TrainerDash;
