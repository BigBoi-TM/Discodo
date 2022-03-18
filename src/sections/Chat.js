/* eslint-disable */
import React, { useEffect, useCallback, useState, useRef } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import GifIcon from "@mui/icons-material/Gif";
import Popover from "@mui/material/Popover";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { DiscordEmojiButton } from "discord-emoji-button";
import { Hint } from "react-autocomplete-hint";
import axios from "axios";
import {
  fetchFromCDN,
  fetchEmojis,
  fetchMessages,
  fetchShortcodes
} from "emojibase";
import data from "emojibase-data/en/shortcodes/cldr-native.json";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";

import {
  DiscordMessage,
  DiscordMessages,
  DiscordAttachment,
  DiscordSystemMessage
} from "@skyra/discord-components-react/dist/index.js";

import ReactTooltip from "react-tooltip";

import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "../data/data_components/userSlice";
import {
  selectChannelId,
  selectChannelName,
  selectVoiceChannel,
  selectReadOnly,
  selectChannelType
} from "../data/data_components/appSlice";
import ShowcaseCardDemo from "./showcase";
import db, { auth } from "./firebase";
import firebase from "firebase";
import Typography from "@mui/material/Typography";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import IconButton from "@mui/material/IconButton";
import emoji from "@jukben/emoji-search";

//import ReactMarkdown from "react-markdown";
//import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";

import VideoChat from "./VC";

function Chat() {
  const user = useSelector(selectUser);
  const User = auth.currentUser;
  const uid = auth.currentUser.uid;
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const voiceChannel = useSelector(selectVoiceChannel);
  const channelType = useSelector(selectChannelType);
  const [placeholder, setPlaceholder] = useState("");
  const [input, setInput] = useState("");
  const readonly = useSelector(selectReadOnly);
  const [messages, setMessages] = useState([]);
  const [placement, setPlacement] = useState(null);
  const [eplacement, setEplacement] = useState(null);
  const [showE, setShowE] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const dummy = useRef();
  const shortcodes = fetchFromCDN("en/shortcodes/joypixels.json");
  const [hintData, setHintData] = useState([":tada:", ":joy:"]);
  /*const options = [
    
  ]
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: options,
    getOptionLabel: (option) => option.title,
  });*/

  const handleShowPicker = (event) => {
    setPlacement(event.currentTarget);
    setShowPicker(true);
  };
  const handleClose = () => {
    setPlacement(null);
    setShowPicker(false);
  };
  const open = Boolean(showPicker);

  const handleInputChnage = (e) => {
    setInput(e.target.value);
  };
  const onEmojiClick = (emoji) => {
    setInput((prevInput) => prevInput + emoji.native);
    setShowPicker(false);
  };

  //const picker = <Picker className="Picker" pickerStyle={{ width: "50%" }} onEmojiClick={onEmojiClick}/>;

  useEffect(() => {
    if (!channelId) {
      setPlaceholder("Select a channel to begin");
    } else if (readonly) {
      setPlaceholder(
        "You do not have permission to send messages in this channel"
      );
    } else {
      setPlaceholder(`Message #${channelName}`);
    }
  }, [channelId, channelName, readonly]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);
  const info = {
    uid: User.uid,
    photo: User.photoURL,
    displayName: User.displayName,
    online: true
  };

  const handlePlus = (e) => {
    e.preventDefault();
    /*db.collection("Users")
      .doc(`${uid}`)
      .set(info)
      .then(() => console.log("Set information successfully!"));*/
    console.log(hintData);
  };
  const Item = ({ entity: { name, char } }) => (
    <div className="emoji-list">{`${char} :${name}: `}</div>
  );

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user
    });
    setInput("");
  };

  useCallback(
    useEffect(() => {
      if (channelId) {
        if (!voiceChannel) {
          dummy.current.addEventListener("DOMNodeInserted", (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: "smooth" });
          });
        }
      }
    }, [channelId, voiceChannel])
  );

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      {voiceChannel ? (
        <>
          <VideoChat />
        </>
      ) : (
        <>
          <div className="chat__messages" ref={dummy}>
            {!channelId ? (
              <ShowcaseCardDemo />
            ) : (
              <DiscordMessages>
                <DiscordSystemMessage>
                  This is the begining of the chat.
                </DiscordSystemMessage>
              </DiscordMessages>
            )}

            <p ref={dummy} />
            {messages.map((message) => (
              <Message
                timestamp={message.timestamp}
                message={message.message}
                user={message.user}
              />
            ))}
          </div>

          <div className="chat__input">
            <AddCircleIcon
              className="AddCircleIcon"
              fontSize="large"
              // disabled={true}
              onClick={handlePlus}
            />
            <form
            /* onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage(e);
                }
              }} */
            >
              {/* <ReactTextareaAutocomplete
                loadingComponent={() => <span>Loading</span>}
                trigger={{
                  ":": {
                    dataProvider: (token) => {
                      return emoji(token)
                        .slice(0, 5)
                        .map(({ name, char }) => ({ name, char }));
                    },
                    component: Item,
                    output: (item, trigger) => item.char
                  }
                }}
                style={{
                  fontSize: "18px",
                  lineHeight: "20px",
                  padding: 5
                }}
                channelName={channelName}
                disabled={!channelId || readonly}
                value={input}
                onChange={handleInputChnage}
                type="button"
                // dropdownStyle={{ overflow: "auto" }}
                // onSubmit={sendMessage}
                className="chat-field"
                placeholder={placeholder}
              /> */}
              <input
                channelName={channelName}
                disabled={!channelId || readonly}
                value={input}
                onChange={handleInputChnage}
                type="button"
                className="chat-field"
                placeholder={placeholder}
              />
              <button
                className="chat__inputButton"
                type="submit"
                disabled={!channelId || readonly || !input}
                onClick={sendMessage}
              >
                Send Message
              </button>
            </form>

            <div class="chat__inputIcons">
              <GifIcon fontSize="large" disabled={true} />
              <Popover
                className="Picker"
                open={open}
                anchorEl={placement}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                sx={{ padding: 1, textAlign: "center" }}
              >
                <Typography sx={{ p: 2 }}>
                  <Picker
                    //pickerStyle={{ width: "100%" }}
                    theme="dark"
                    autoFocus={true}
                    //emojiTooltip={true}
                    title="Select an emoji"
                    emoji="point_up_2"
                    set="twitter"
                    theme="dark"
                    onSelect={onEmojiClick}
                  />
                </Typography>
              </Popover>
              <DiscordEmojiButton
                className="emoji_picker"
                size={28}
                set="twitter"
                onClick={handleShowPicker}
              />
              <ReactTooltip globalEventOff="click" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
