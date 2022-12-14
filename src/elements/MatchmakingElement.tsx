import React, { useState } from "react";
import Player from "../entities/Player";
import MatchmakingLobbyFragment from "../fragments/MatchmakingLobbyFragment";
import StartMatchmakingFragment from "../fragments/StartMatchmakingFragment";
import MatchFoundDto from "../sockets/MatchFoundDto";

type MatchmakingElementPropsType = {
  onRoomFound: (response: MatchFoundDto) => void;
  userId: number;
  roomFound: boolean;
  players: Array<Player>;
  onPlayerReady: (playerId: string, makeReady: boolean)=>void;
};

const MatchmakingElement = (props: MatchmakingElementPropsType) => {
  const handleMatchFound = (response: MatchFoundDto) => {
    props.onRoomFound(response);
  };

  return (
    <div>
      {!props.roomFound ? (
        <StartMatchmakingFragment
          userId={props.userId}
          setMatchmakingResponse={handleMatchFound}
        />
      ) : (
        <MatchmakingLobbyFragment players={props.players} onPlayerReady={props.onPlayerReady}/>
      )}
    </div>
  );
};

export default MatchmakingElement;
