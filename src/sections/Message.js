/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import db, { database, auth } from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../data/data_components/userSlice";
import { selectChannelId } from "../data/data_components/appSlice";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import {
  DiscordMessage,
  DiscordMessages,
  DiscordAttachment
} from "@skyra/discord-components-react/dist/index.js";

import { GithubSelector } from "@charkour/react-reactions";

import Linkify from "react-linkify";

import "./Message.css";

function Message({ timestamp, user, message,  }) {
  const User = auth.currentUser;
  const u = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const [image, setImage] = useState(true);
  const myRegex = /(https?:\/\/.*\.(?:jpg|jpeg|gif|png|tiff|bmp))/i;

  function checkURL(url) {
    if (typeof url !== 'string') return false;
    return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
  };

  useEffect(() => {
    if (myRegex.test(message) === true){
      setImage(true);
    } else {
      setImage(false);
    }
  }, [message, myRegex]);
  

  /*const messageRef = db
    .collection("channels")
    .doc(channelId)
    .collection("messages");

  function handleDelete() {
    if (channelId) {
      if (user.uid === User.uid) {
        messageRef
          .where("message", "==", message)
          .get()
          .then((snap) => {
            snap.forEach((doc) => {
              alert(doc.data());
            });
          });
      } else {
        alert("doesn't work :/");
      }
    }
  }*/

  /*return (
    <div className="message">
      <Avatar src={user.photo} />
      <div class="message__info">
        <h4>
          {user.displayName}
          <span className="messege__uid">{user.uid}</span>
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
          <Button
            className="message__deleteButton"
            variant="text"
            color="error"
          >
            Delete
          </Button>
        </h4>
        {image ? (
          <img src={message} onError={() => setImage(false)}/>
        ) : (
          <>
            <Linkify>{message}</Linkify>
            <Embed isDark url={message}/>
          </>
        )}
      </div>
    </div>
  );*/
  
  

  return (
    <div className="message">
      <DiscordMessages>
        <DiscordMessage author={user.displayName} avatar={user.photo}>
          {image ? (
            <>
              <DiscordAttachment slot="attachments" url={message} alt={message} />
            </>
          ) : (
            <>
              {message}
            </>
          )}
        </DiscordMessage>
      </DiscordMessages>
    </div>
  );
}

export default Message;
