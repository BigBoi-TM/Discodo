import React from "react";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "../ChatHeader.css";
function Update() {
  return (
    <>
      <Typography variant="h3">Files Update 📁</Typography>
      <Typography variant="caption text">3/22/2022</Typography>
      <Divider />
      <TextInfoContent
        //overline={'Overline'}
        // useStyles={ body:{ color: "white" } }
        className="textinfo"
        heading={"- Welcome Files!"}
      />
      <Typography variant="body1">
        Files are now a thing at Discodo! Curently, images, videos, and audio
        files can be uploaded an displayed in chat
      </Typography>
      <TextInfoContent
        //overline={'Overline'}
        // useStyles={ body:{ color: "white" } }
        className="textinfo"
        heading={"- Upload Button"}
      />
      <Typography variant="body1">
        That little plus sign next to your texting-nook finally has a function
        now. Clicking it gives you the option of what type of file you want to
        upload.
      </Typography>
      <TextInfoContent
        //overline={'Overline'}
        // useStyles={ body:{ color: "white" } }
        className="textinfo"
        heading={"- Drag & Drop Baby~"}
      />
      <Typography variant="body1">
        File uploading just got a whole lot better. For those tech-geniuses out
        there (or those who know how to do it), drag & drop your files (one at a time) over the message area to
        get your next meme out there in style!
      </Typography>
    </>
  );
}

export default Update;
