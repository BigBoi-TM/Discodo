import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import "./Sidebar.css";
import SidebarChannel from "./SidebarChannel.js";
import SidebarVoiceChannel from "./SidebarVoiceChannel.js"

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar } from '@material-ui/core';

import { useSelector } from "react-redux";
import { selectUser } from "../data/data_components/userSlice";
import db, { auth } from "./firebase";
import Profile from "./Profile";





function Sidebar() {
	const [show, setShow] = useState(false);
	const user = useSelector(selectUser);
	const [channels, setChannels] = useState([]);
	const [Voicechannels, setVoiceChannels] = useState([]);

	useEffect(() => {
		db.collection('channels').orderBy('channelName', 'asc').onSnapshot(snapshot =>(
			setChannels(
				snapshot.docs.map(doc =>({
					id: doc.id,
					channel: doc.data(),
				}))
			)
		));
	}, []);

	useEffect(() => {
		db.collection('Voicechannels').orderBy('channelName', 'asc').onSnapshot(snapshot =>(
			setVoiceChannels(
				snapshot.docs.map(doc =>({
					id: doc.id,
					Voicechannel: doc.data(),
				}))
			)
		));
	}, []);

	const handleAddChannel = () => {
		const channelName = prompt('Enter the channel name!');

		if (channelName) {
			db.collection('channels').add({
				channelName: channelName,
			});
		}
	 };
	 
	 const handleVoiceAddChannel = () => {
		const VoicechannelName = prompt('Enter the channel name!');

		if (VoicechannelName) {
			db.collection('Voicechannels').add({
				channelName: VoicechannelName,
			});
		}
 	};

  return (
    <div className="sidebar">
			<div className="sidebar__top">
				<h3>BigBoi's Town</h3>
				<ExpandMoreIcon />
			</div>
			<div className="sidebar__channels">
				<div className="sidebar__channelsHeader">
					<div className="sidebar__header">
						<ExpandMoreIcon />
						<h4>Text Channels</h4>
					</div>

					<AddIcon data-tip="Click to add a channel" data-type="dark" data-delay-show="10" data-effect="solid" data-place="right" onClick={handleAddChannel}className='sidebar__addChannel'/>
					<ReactTooltip globalEventOff="click" />
				</div>
				<div className='sidebar__channelsList'>
						{channels.map(({id, channel}) => (
							<SidebarChannel key={id} id={id} channelName={channel.channelName} />
						))}
				</div>
				<div className="sidebar__voiceChannelsHeader">
					<div className="sidebar__header">
						<ExpandMoreIcon />
						<h4>Voice Channels</h4>
					</div>

					<AddIcon data-tip="Coming soon!" data-type="dark" data-delay-show="10" data-effect="solid" data-place="right" onClick={handleVoiceAddChannel} className='sidebar__addChannel'/>
					<ReactTooltip globalEventOff="click" />
				</div>
				<div className='sidebar__channelsList'>
						{Voicechannels.map(({id, Voicechannel}) => (
							<SidebarVoiceChannel key={id} id={id} channelName={Voicechannel.channelName} />
						))}
				</div>
			</div>
			<div className="sidebar__voice">
				<SignalCellularAltIcon
					className="sidebar__voiceIcon" fontSize="Large"
				/>
				<div className="sidebar__voiceInfo">
					<h3>Voice Connected</h3>
				</div>

				<div className="sidebar__voiceIcons">
					<CallIcon />
				</div>
			</div>
			<div className="sidebar__profile">
				<Avatar src={user.photo} onClick={() => setShow(true)} />
				<div className="sidebar__profileInfo">
					<h3>{user.displayName}</h3>
					<p>#{user.uid.substring(0, 4)}</p>
				</div>
				<Profile onClose={() => setShow(false)} show={show} />
				<div className="sidebar__profileIcons">
					<MicIcon className="MicIcon"/>
					<HeadsetIcon className="HeadsetIcon"/>
					<ExitToAppIcon data-tip="Click to logout" data-type="dark" data-delay-show="10" data-effect="solid" data-place="top" data-effect="solid" onClick={() => auth.signOut() } className="ExitToAppIcon" />
					<ReactTooltip globalEventOff="click" />
				</div>
			</div>
		</div>
  );
}
export default Sidebar;