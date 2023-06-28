import React from "react";
import { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../Context/AuthContext";
import { ChatEngine } from "react-chat-engine";
import Loading from "./Loading";

function ReactChat() {
  let { currentUser } = React.useContext(AuthContext);
  const [dataId, setDataId] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  console.log(currentUser);

  function getorCreateUser(callback) {
    axios
      .put(
        "https://api.chatengine.io/users/",
        {
          username: currentUser?.email || localStorage.getItem("email"),
          secret: currentUser?.email || localStorage.getItem("email"),
          email: currentUser?.email || localStorage.getItem("email"),
        },
        { headers: { "PRIVATE-KEY": process.env.REACT_APP_PRIVATE_KEY } }
      )
      .then((r) => callback(r.data));
  }

  function getorCreateChat(callback) {
    axios
      .put(
        "https://api.chatengine.io/chats/",
        {
          usernames: ["chat owner", currentUser?.email || localStorage.getItem("email")],
          is_direct_chat: true,
        },
        { headers: { "PRIVATE-KEY": process.env.REACT_APP_PRIVATE_KEY } }
      )
      .then((r) => callback(r.data));
  }

  React.useEffect(() => {
    const fectchData = async () => {
      setLoading(!loading);
      try {
        getorCreateUser((user) => {
          setUser(user);
          return getorCreateChat((chat) => {
            console.log("success", chat);
            setDataId(chat);
            setLoading(!loading);
          });
        });
      } catch (err) {
        // setData("Error");
      }
    };
    fectchData();
  }, []);
  if (!dataId || !user) return <Loading />;
  console.log(dataId.id);
  return (
    <div className="customer">
      <ChatEngine projectID={process.env.REACT_APP_CE_PROJECT_ID} userName={user.email} userSecret={user.email} renderNewChatForm={() => <div></div>} />
    </div>
  );
}

export default ReactChat;
