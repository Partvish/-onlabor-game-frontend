import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import ConnectionHandler from "../sockets/ConnectionHandler";
import MatchFoundDto from "../sockets/MatchFoundDto";
import MatchmakerMessages from "../sockets/MatchmakingMessages";

type StartMatchmakingFragmentPropsType = {
  userId: number;
  setMatchmakingResponse: (response: MatchFoundDto) => void;
};

const StartMatchmakingFragment = (props: StartMatchmakingFragmentPropsType) => {
  const [isSearching, setIsSearching] = useState(false);
  let listeners = new Map();
  listeners.set(MatchmakerMessages.MATCH_FOUND, (response: MatchFoundDto) => {
    if (!response || !response.id || !response.port) return;
    ConnectionHandler.getInstance().closeSocket(5000);
    props.setMatchmakingResponse(response);

  });
  const socket: Socket = ConnectionHandler.getInstance().openSocket(
    5000,
    listeners
  );
  const isConnected = ConnectionHandler.getInstance().isConnected(5000);

  const handleClick = () => {
    setIsSearching(true);
    socket.emit(MatchmakerMessages.REQUEST, { id: props.userId });
  };

  return (
    <div>
      <div>Id: {props.userId}</div>
      {isSearching ? (
        <Box sx={{ display: "flex", margin: "auto", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", margin: "auto", flexDirection: "column" }}>
          {isConnected ? (
            <Typography>Connected to the Server</Typography>
          ) : (
            <Typography>Not Connected to the server</Typography>
          )}
          <Typography>Click on the button to start matchmaking</Typography>
          <Button variant="contained" onClick={handleClick}>
            Start
          </Button>
        </Box>
      )}
    </div>
  );
};

export default StartMatchmakingFragment;
