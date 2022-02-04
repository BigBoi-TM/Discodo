import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: "app",
  initialState: {
    channelId: null,
    channelName: null,
    voiceChannel: null,
  },
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
      state.voiceChannel = action.payload.voiceChannel;
    },
  },
});

export const { setChannelInfo } = appSlice.actions;

export const selectChannelId = (state) => state.app.channelId;

export const selectChannelName = (state) => state.app.channelName;

export const selectVoiceChannel = (state) => state.app.voiceChannel;

export default appSlice.reducer;