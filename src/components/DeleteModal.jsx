import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addMessage } from "../actions/messages";

const DeleteModal = ({ isOpen, className, lesson, toggle }) => {
  const [modal, setModal] = useState(isOpen);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setModal(isOpen);
  }, [isOpen]);

  const deleteLesson = async () => {
    try {
      const deleteResponse = await axios.delete(`/api/classes/${lesson.id}`);
      if (deleteResponse)
        dispatch(
          addMessage(
            `Successfully deleted the lesson with the name: ${lesson.name}`,
            "success"
          )
        );
    } catch (error) {
      dispatch(
        addMessage(
          `Could not delete the lesson with the name: ${lesson.name}`,
          "success"
        )
      );
    }
    toggle();
  };

  return (
    lesson && (
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this Lesson?</p>
          <p>{lesson.name}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => deleteLesson()}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  );
};

export default DeleteModal;
