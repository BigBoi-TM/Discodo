import React from "react";
import cx from 'clsx';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";
import { selectUser } from "../../data/data_components/userSlice";

import "../Profile.css";

const useStyles = makeStyles(({ palette }) => ({
  card: {
    margin: 'auto',
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));

export default function ProfilePage() {
  const user = useSelector(selectUser);
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });

  return (
    <div className="Profile">
      <Card className={cx(styles.card, shadowStyles.root)}>
        <CardContent>
          <Avatar className={styles.avatar} src={user.photo} />
          <h3 className={styles.heading}>{user.displayName}</h3><span className={styles.subheader}>#{user.uid.substring(0, 4)}</span>
        </CardContent>
        <Divider light />
        <Box display={'flex'}>
          <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
            <p className={styles.statLabel}>Email</p>
            <p className={styles.statValue}>{user.email}</p>
          </Box>
          <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
            <p className={styles.statLabel}>Following</p>
            <p className={styles.statValue}>12</p>
          </Box>
        </Box>
      </Card>
    </div>
  );

  /*return (
    <div className="Profile">
      <div className="modal-content2">
        <Avatar className="Avatar2" src={user.photo} />
        <div className="user__info2">
          Name: {user.displayName}
          <p>ID: #{user.uid.substring(0, 4)}</p>
          Email: {user.email}
        </div>
      </div>
    </div>
  );*/


}
