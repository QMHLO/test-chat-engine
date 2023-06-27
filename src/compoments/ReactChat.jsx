import React from "react";
import { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../Context/AuthContext";
import { ChatEngine } from "react-chat-engine";

function ReactChat() {
  let { currentUser } = React.useContext(AuthContext);
  const [dataId, setDataId] = React.useState(null);
  const [user, setUser] = React.useState(null);

  // currentUser = {
  //   email: "test01@gamil.com",
  // };

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
      try {
        getorCreateUser((user) => {
          setUser(user);
          return getorCreateChat((chat) => {
            console.log("success", chat);
            setDataId(chat);
          });
        });
      } catch (err) {
        // setData("Error");
      }
    };
    fectchData();
  }, []);
  if (!dataId || !user) return <div>Loading ... user chat</div>;
  console.log(dataId.id);
  return (
    // <ChatEngineWrapper>
    //   <Socket projectID="7e806a50-45ed-494b-9598-dd683a3324b4" userName={user.email} userSecret={user.email} />
    //   <ChatFeed activeChat={dataId?.id} />
    // </ChatEngineWrapper>
    // <ChatEngineWrapper>
    //   <Socket projectID="7e806a50-45ed-494b-9598-dd683a3324b4" userName={user.email} userSecret={user.email} />
    //   <ChatFeed activeChat={dataId?.id} />
    // </ChatEngineWrapper>
    <ChatEngine projectID={process.env.REACT_APP_CE_PROJECT_ID} userName={user.email} userSecret={user.email} renderNewChatForm={() => <div></div>} />
    // <ChatEngineWrapper>
    //   <Socket projectID={import.meta.env.VITE_REACT_APP_CE_PROJECT_ID} userName={user.email} userSecret={user.email} />
    //   <ChatFeed renderNewMessageForm={() => <MessageFormSocial />}/>
    // </ChatEngineWrapper>
  );
}

export default ReactChat;
