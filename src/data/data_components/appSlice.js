import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    channelId: null,
    channelName: null,
    voiceChannel: null,
    channelType: null,
    readOnly: null
  },
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
      state.readOnly = action.payload.readOnly;
      state.channelType = action.payload.channelType;
      state.voiceChannel = action.payload.voiceChannel;
      state.meetingId = action.payload.meetingId;
    }
  }
});

export const { setChannelInfo } = appSlice.actions;

export const selectChannelId = (state) => state.app.channelId;

export const selectReadOnly = (state) => state.app.readOnly;

export const selectChannelName = (state) => state.app.channelName;

export const selectVoiceChannel = (state) => state.app.voiceChannel;

export const selectChannelType = (state) => state.app.channelType;

export const selectMeetingId = (state) => state.app.meetingId;

export default appSlice.reducer;
