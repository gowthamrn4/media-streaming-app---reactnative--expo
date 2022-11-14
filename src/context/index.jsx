import React, {  useReducer } from "react";

const SETUPINIT = "SETUPINIT";

const initialState = {
    isHost : false,
    roomName: '',
    roomCode: ''
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SETUPINIT:
      return {
        ...state,
        isHost: payload?.isHost,
        roomName: payload?.roomName,
        roomCode: payload?.roomCode,
      };
    default:
      return state;
  }
};

export const RoomContext = React.createContext({});

const RoomContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RoomContext.Provider value={[state, dispatch]}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;
