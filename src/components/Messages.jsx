import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Alert } from "reactstrap";

import { deleteMessage } from "../actions/messages";

function Messages() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  return (
    messages.length > 0 &&
    messages[messages.length - 1].visible && (
      <Container className="mt-5 w-50">
        {messages.map((message) => (
          <Alert
            key={message.id}
            color={message.type}
            isOpen={message.visible}
            toggle={() => dispatch(deleteMessage(message.id))}
          >
            {message.text}
          </Alert>
        ))}
      </Container>
    )
  );
}

export default Messages;
