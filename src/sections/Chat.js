import React, {
  useEffect,
  useState,
  useRef,
  Component,
  PropTypes
} from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import GifIcon from "@material-ui/icons/Gif";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "../data/data_components/userSlice";
import { selectChannelId } from "../data/data_components/appSlice";
import { selectChannelName } from "../data/data_components/appSlice";
import { selectVoiceChannel } from "../data/data_components/appSlice";
import db from "./firebase";
import firebase from "firebase";
import { emojify } from "react-emojione";
import ReactMarkdown from "react-markdown";
import VideoChat from "./VC";

function Chat() {
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const voiceChannel = useSelector(selectVoiceChannel);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const dummy = useRef();

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

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user
    });
    setInput("");
  };

  useEffect(() => {
    if (!voiceChannel) {
      dummy.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

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
              <>
                <img
                  className="choose-channel"
                  src="https://fontmeme.com/permalink/210910/87c06ba505fd05cdf8a45621dc2e77c9.png"
                />
              </>
            ) : (
              <img
                className="beginning"
                src="https://i.ibb.co/S6k5M7Z/image.png"
              />
            )}
            <p ref={dummy} />
            {messages.map((message) => (
              <Message
                timestamp={message.timestamp}
                message={emojify(message.message)}
                user={message.user}
              />
            ))}
          </div>

          <div className="chat__input">
            <AddCircleIcon className="AddCircleIcon" fontSize="large" />
            <form>
              <input
                channelName={channelName}
                disabled={!channelId}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="chat-field"
                placeholder={!channelId ? " " : `Message #${channelName}`}
              />
              <button
                className="chat__inputButton"
                type="submit"
                disabled={!channelId}
                disabled={!input}
                onClick={sendMessage}
              >
                Send Message
              </button>
            </form>

            <div class="chat__inputIcons">
              <GifIcon fontSize="large" />
              <EmojiEmotionsIcon className="emoji_picker" fontSize="large" />
            </div>
          </div>
        </>
      )}
      ;
    </div>
  );
}

export default Chat;
