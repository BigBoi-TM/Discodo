/* eslint-disable */
import React, { useCallback, useEffect, useState, usePrevious } from "react";
import db, { database, auth } from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../data/data_components/userSlice";
import { selectChannelId } from "../data/data_components/appSlice";
import {
  Button,
  Box,
  Card,
  CardContent,
  Avatar,
  Divider,
  Popover,
  Skeleton,
  Typography
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ResizeImage from "react-resize-image";
import cx from "clsx";
import { makeStyles } from "@mui/styles";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { useGutterBorderedGridStyles } from "@mui-treasury/styles/grid/gutterBordered";

import {
  DiscordMessage,
  DiscordMessages,
  DiscordAttachment
} from "@skyra/discord-components-react/dist/index.js";
//import { GithubSelector } from "@charkour/react-reactions";

import Emojify from "react-emojione";

import Linkify from "react-linkify";

import "./Message.css";
const useStyles = makeStyles(({ palette }) => ({
  card: {
    margin: "auto",
    borderRadius: 12,
    minWidth: 100,
    textAlign: "center"
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto"
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginTop: 8,
    marginBottom: 0
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: "0.875em"
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: "1px"
  }
}));

function Message({ user, message, messageType, file }) {
  const User = auth.currentUser;
  const u = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const [anchorEl, setAnchorEl] = useState(null);
  const [eplacement, setEplacement] = useState(null);
  const [emoji, setEmoji] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const [showE, setShowE] = useState(false);
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: "rgba(0, 0, 0, 0.08)",
    height: "50%"
  });
  const options = {
    convertShortnames: true,
    convertUnicode: true,
    convertAscii: true,
    styles: {
      backgroundImage: "url(emojione.sprites.png)",
      width: "64px",
      height: "64px",
      margin: "4px"
    }
  };
  const numbers = [376, 340, 300, 150, 0];
  const handleEmOpen = (event) => {
    setEplacement(event.currentTarget);
    setEmoji(event.target.title);
    setShowE(true);
  };
  const handleEmClose = () => {
    setEplacement();
    setEmoji();
    setShowE(false);
  };
  const handleClick = (event) => {
    console.info(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.info("closed");
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const Output = () => {
    if (messageType === "Message") {
      return (
        <Emojify style={{ height: 32, width: 32 }} onClick={handleEmOpen}>
          <Linkify>{message}</Linkify>
        </Emojify>
      );
    } else if (messageType === "Image") {
      return (
        <ResizeImage
          src={message}
          alt="img"
          resizeActive={true}
          options={{ width: 100 }}
        />
      );
    } else if (messageType === "Video") {
      return <video src={message} controls className="mvideo" />;
    } else if (messageType === "Audio") {
      return (
        <Typography>
          <audio src={message} controls />
          {/* <a href={message} download={file}>
            <FileDownloadIcon fontSize="large" sx={{ color: "white", paddingBottom: 1 }} />
          </a> */}
        </Typography>
      );
    }
  };
  /*
  const [image, setImage] = useState(false);
  const myRegex = /(https?:\/\/.*\.(?:jpg|jpeg|gif|png|tiff|bmp))/i;

  useEffect(() => {
    if (myRegex.test(message) === true){
      setImage(true);
    } else {
      setImage(false);
    }
  }, [message]);
  */
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
  /* return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Card className={cx(styles.card, shadowStyles.root)}>
          <CardContent>
            <Avatar className={styles.avatar} src={user.photo} />
            <h3 className={styles.heading}>{user.displayName}</h3>
            <span className={styles.subheader}>
              #{user.uid.substring(0, 4)}
            </span>
          </CardContent>
          <Divider light />
          <Box display={"flex"}>
            <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
              <p className={styles.statLabel}>Email</p>
              <p className={styles.statValue}>{user.email}</p>
            </Box>
          </Box>
        </Card>
      </Popover>

      <div className="message">
        <Avatar className="avatar" src={user.photo} onClick={handleClick} />
        <div class="message__info">
          <h4>
            <span className="displayName" onClick={handleClick}>
              {user.displayName}
            </span>
            <span className="message__timestamp">
              {new Date(timestamp?.toDate()).toUTCString()}
            </span>
          </h4>
        
          <p>
            <Linkify>{message}</Linkify>
          </p>
        </div>
      </div>
    </>
  ); */
  /*
  return (
    <DiscordMessages>
      <DiscordMessage author={user.displayName} avatar={user.photo}>
        {image ? (
          <DiscordAttachment slot="attachments" url={message}/>
        ) : (
          <>
            {message}
          </>
        )}
      </DiscordMessage>
    </DiscordMessages>
  );
}*/
  return (
    <>
      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Card className={cx(styles.card, shadowStyles.root)}>
          <CardContent>
            <Avatar className={styles.avatar} src={user.photo} />
            <h3 className={styles.heading}>{user.displayName}</h3>
            <span className={styles.subheader}>
              #{user.uid.substring(0, 4)}
            </span>
          </CardContent>
          <Divider light />
          <Box display={"flex"}>
            <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
              <p className={styles.statLabel}>Email</p>
              <p className={styles.statValue}>{user.email}</p>
            </Box>
          </Box>
        </Card>
      </Popover> */}
      <Popover
        //id={id}
        open={showE}
        anchorEl={eplacement}
        onClose={handleEmClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Card className={cx(styles.card, shadowStyles.root)}>
          <CardContent>
            <Emojify style={{ height: 64, width: 64 }} onClick={handleEmOpen}>
              {emoji}
            </Emojify>
            <h3 className={styles.heading}>{emoji}</h3>
          </CardContent>
        </Card>
      </Popover>
      {loading ? (
        <>
          <div className="message">
            <Skeleton className="savatar" variant="circular">
              <Avatar />
            </Skeleton>
            <div class="message__info">
              <Skeleton className="susername" />
            </div>
            <Skeleton className="stimestamp" />
          </div>
          <Skeleton className="smessage" />
          <Skeleton
            className="smessage2"
            sx={{ width: `${Math.random(numbers)}` }}
          />
        </>
      ) : (
        <DiscordMessages>
          <DiscordMessage author={user.displayName} avatar={user.photo}>
            {Output()}
          </DiscordMessage>
        </DiscordMessages>
      )}
    </>
  );
}

export default Message;
