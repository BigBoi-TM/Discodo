import React from "react";
import { makeStyles, withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CallMade from "@mui/icons-material/CallMade";

import { Row, Column, Item } from "@mui-treasury/components/flex";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";

const StyledTooltip = withStyles({
  tooltip: {
    marginTop: "0.2rem",
    backgroundColor: "rgba(0,0,0,0.72)",
    color: "#fff"
  }
})(Tooltip);

const useBasicProfileStyles = makeStyles(({ palette }) => ({
  avatar: {
    borderRadius: 8,
    backgroundColor: "#495869"
  },
  overline: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#8D9CAD"
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: "#495869"
  }
}));

const BasicProfile = (props) => {
  const styles = useBasicProfileStyles();
  return (
    <Row {...props}>
      <Item>
        <Avatar className={styles.avatar}>B</Avatar>
      </Item>
      <Item position={"middle"} pl={{ sm: 0.5, lg: 0.5 }}>
        <Typography className={styles.overline}>CREATOR</Typography>
        <Typography className={styles.name}>BigBoi335</Typography>
      </Item>
    </Row>
  );
};

const useCardHeaderStyles = makeStyles(() => ({
  root: { paddingBottom: 0 },
  title: {
    fontSize: "1.25rem",
    color: "#122740"
  },
  subheader: {
    fontSize: "0.875rem",
    color: "#495869"
  }
}));

const CardHeader = (props) => {
  const styles = useCardHeaderStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20 });
  return (
    <Row {...props}>
      <Item position={"middle"}>
        <Typography className={styles.title}>
          <b>Discodo</b>
        </Typography>
        <Typography className={styles.subheader}>
          Similar to Discord theme
        </Typography>
      </Item>
    </Row>
  );
};

const Card2Header = (props) => {
  const styles = useCardHeaderStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20 });
  return (
    <Row {...props}>
      <Item position={"middle"}>
        <Typography className={styles.title}>
          <b></b>
        </Typography>
        <Typography className={styles.subheader}>
          Similar to Discord theme
        </Typography>
      </Item>
    </Row>
  );
};
const useStyles = makeStyles(() => ({
  card: {
    border: "2px solid",
    borderColor: "#E7EDF3",
    backgroundColor: "#6D7C8C",
    borderRadius: 16,
    transition: "0.4s",
    "&:hover": {
      borderColor: "#5B9FED"
    }
  }
}));

export const ShowcaseCardDemo = React.memo(function ShowcaseCard() {
  const styles = useStyles();
  const gap = { xs: 1, sm: 1.5, lg: 2 };
  return (
    <Grid container spacing={4} justify={"center"}>
      <Grid item xs={12} sm={4} md={3}>
        <Column
          className={styles.card}
          p={{ xs: 0.5, sm: 0.75, lg: 1 }}
          gap={gap}
        >
          <CardHeader />
          <Item>
            <Avatar
              src="https://i.ibb.co/SsPydy5/ye8gj9p65fz61.png"
              variant="square"
            />
          </Item>
          <BasicProfile />
        </Column>
      </Grid>
      <Grid item xs={12} sm={8} lg={7}>
        <Row className={styles.card} p={{ xs: 0.5, sm: 0.75, lg: 1 }} gap={gap}>
          <Column>
            <CardHeader />
            <BasicProfile position={"bottom"} />
          </Column>
        </Row>
      </Grid>
    </Grid>
  );
});
export default ShowcaseCardDemo;
