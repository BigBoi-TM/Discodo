import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChannelInfo,
  selectChannelType,
  selectReadOnly
} from "../data/data_components/appSlice";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@mui/material/Typography";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import {
  DiscordActionRow,
  DiscordAttachment,
  DiscordAttachments,
  DiscordButton,
  DiscordCommand,
  DiscordEmbed,
  DiscordEmbedField,
  DiscordEmbedFields,
  DiscordEmbedDescription,
  DiscordEmbedFooter,
  DiscordInvite,
  DiscordMention,
  DiscordMessage,
  DiscordMessages,
  DiscordReaction,
  DiscordReactions,
  DiscordReply,
  DiscordSystemMessage,
  DiscordTenorVideo,
  DiscordThread,
  DiscordThreadMessage
} from "@skyra/discord-components-react/dist/index.js";
import Emojify from "react-emojione";

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: "auto",
    borderRadius: spacing(2), // 16px
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    maxWidth: 300,
    marginLeft: "auto",
    overflow: "initial",
    background: "#36393e",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: spacing(2),
    [breakpoints.up("md")]: {
      flexDirection: "row",
      paddingTop: spacing(2)
    }
  },
  media: {
    width: "88%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: "48%",
    borderRadius: spacing(2),
    backgroundColor: "#fff",
    position: "relative",
    [breakpoints.up("md")]: {
      width: "100%",
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: "translateX(-8px)"
    },
    "&:after": {
      content: '" "',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      // backgroundImage: 'linear-gradient(147deg, rgba(57,159,254,1) 0%, rgba(0,29,125,1) 74%)',
      borderRadius: spacing(2), // 16
      opacity: 0.5
    }
  },
  content: {
    padding: 24
  },
  cta: {
    marginTop: 24,
    textTransform: "initial"
  }
}));

export const ShowcaseCardDemo = React.memo(function ShowcaseCard() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardContent>
        <DiscordMessages>
          <DiscordMessage
            bot
            author="DiscodoBot"
            avatar="https://i.ibb.co/VpD09db/ye8gj9p65fz61-removebg-preview-removebg-preview.png"
          >
            <Emojify style={{ height: 32, width: 32 }}>
              Howdyy 👋. Welcome to Discodo, your knock-off of Discord! Click
              the help icon in the top left to get started and see what's new,
              or go straight to{" "}
              <DiscordMention
                type="channel"
                onClick={() =>
                  dispatch(
                    setChannelInfo({
                      channelId: "uZfrNgeqBC7F97mPYGHP",
                      channelName: "general",
                      voiceChannel: false,
                      channelType: "Text Channel",
                      readOnly: false
                    })
                  )
                }
              >
                general
              </DiscordMention>
              to start chatting!
            </Emojify>
          </DiscordMessage>
        </DiscordMessages>
      </CardContent>
    </Card>
  );
});

export default ShowcaseCardDemo;
