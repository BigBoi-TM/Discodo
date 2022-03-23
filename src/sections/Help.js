import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./ChatHeader.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import HelpIcon from "@mui/icons-material/Help";
import ReactTooltip from "react-tooltip";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Update2 from "./Changelogs/Emoji-Update";
import Update from "./Changelogs/Files-Update";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  overflow: "auto",
  boxShadow: 24,
  p: 4
};

function HelpModal() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <HelpIcon
        onClick={() => setOpenModal(true)}
        data-tip="Help"
        data-type="dark"
        data-delay-show="10"
        data-effect="solid"
        data-place="bottom"
        className="HelpIcon"
      />
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar position="fixed">
            <Toolbar>
              <Typography
                id="modal-modal-title"
                variant="h6"
                sx={{ color: "white", paddingBottom: "20px" }}
              >
                Help
              </Typography>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Accordion sx={{ overflow: "auto" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Introduction</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>W.I.P.</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Changelog</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails sx={{ textAlign: "left" }}>
              <Update />
              <Divider />
              <Update2 />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Modal>
      <ReactTooltip globalEventOff="click" />
    </div>
  );
}

export default HelpModal;
