import React from "react";
import { ChatEngine } from "react-chat-engine";

function OwnerChat() {
  return <ChatEngine projectID={process.env.REACT_APP_CE_PROJECT_ID} userName={process.env.REACT_APP_OWNER_CHAT_USER_NAME} userSecret={process.env.REACT_APP_OWNER_CHAT_USER_PASS} renderNewChatForm={() => <div></div>} />;
}

export default OwnerChat;
