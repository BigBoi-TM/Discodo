import React from "react";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "../ChatHeader.css";
function Update2() {
  return (
    <>
      <Typography variant="h3">Emoji Update 🎉</Typography>
      <Typography variant="caption text">3/17/2022</Typography>
      <Divider />
      <TextInfoContent
        //overline={'Overline'}
        // useStyles={ body:{ color: "white" } }
        className="textinfo"
        heading={"- Emojis In Messages"}
      />
      <Typography variant="body1">
        Emojis in messages are now clickable and will show a preview of the
        emoji along with its short name.
      </Typography>
      <TextInfoContent
        //overline={'Overline'}
        // useStyles={ body:{ color: "white" } }
        className="textinfo"
        heading={"- Emoji picker"}
      />
      <Typography variant="body1">
        Emoji picker is updated. [styling still needs work]
      </Typography>
    </>
  );
}

export default Update2;
