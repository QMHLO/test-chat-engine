import React from "react";
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from "react-chat-engine-advanced";

const ChatComponent = ({ user }) => {
  const projectId = process.env.REACT_APP_CE_PROJECT_ID;
  const username = user.email;
  const secret = user.email;
  const chatProps = useMultiChatLogic(projectId, username, secret);
  return (
    <div>
      <MultiChatWindow {...chatProps} style={{ height: "100vh" }} />
      <MultiChatSocket {...chatProps} />
    </div>
  );
};

export default ChatComponent;
