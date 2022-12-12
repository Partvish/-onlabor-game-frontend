import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GameElement from "../elements/GameElement";
import HeaderElement from "../elements/HeaderElement";
import MatchmakingElement from "../elements/MatchmakingElement";
import Player from "../entities/Player";
import ConnectionHandler from "../sockets/ConnectionHandler";
import MatchFoundDto from "../sockets/MatchFoundDto";
import MatchMassages from "../sockets/MatchMassages";
import RoomMessages from "../sockets/RoomMessages";

const GamePage = () => {
  const [isGameFound, setIsGameFound] = useState(false);

  const [socketPort, setSocketPort] = useState(5000);
  const [playerId, setPlayerId] = useState("");
  const { state } = useLocation();
  const { token, id, name } = state;
  const [jwtToken, setJwtToken] = useState(token);
  const [userId, setUserId] = useState(id);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [table, setTable] = useState<Array<Array<string>>>([]);
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    console.log("Room update received");
    forceUpdate();
  }, [players]);
  const handleRoomFound = (response: MatchFoundDto) => {
    let listeners = new Map();
    listeners.set(RoomMessages.UPDATE_ROOM_STATE, (data: any) => {
      if (data.players) {
        setPlayers(data.players);
        data.players.map((e: any) => {
          console.log(e);
        });
      }
    });
    // room massages
    listeners.set(RoomMessages.MATCH_STARTING, () => {
      setIsGameFound(true);
    });

    listeners.set(RoomMessages.MATCH_STOPPING, () => {
      setIsGameFound(false);
    });

    //match massages
    listeners.set(MatchMassages.UPDATE_TABLE, (data: any) => {
      if (!data || !data.table) {
        return;
      }
      setTable(data.table);
    });

    let socket = ConnectionHandler.getInstance().openSocket(
      response.port,
      listeners
    );
    socket.emit(RoomMessages.REGISTER_PLAYER, { id: response.id });
    setSocketPort(response.port);
    setPlayerId(response.id);
  };

  const handlePlayerReady = (_playerId: string, isPlayerReady: boolean) => {
    if (_playerId != playerId) return;
    let socket = ConnectionHandler.getInstance().openSocket(socketPort);
    socket.emit(
      isPlayerReady ? RoomMessages.UNREADY_PLAYER : RoomMessages.READY_PLAYER
    );
  };

  const handlePlayerMove = (x: number, y: number, cell: string) => {
    let socket = ConnectionHandler.getInstance().openSocket(socketPort);
    socket.emit(MatchMassages.MOVE, { x: x, y: y, id: playerId });
  };

  return (
    <div>
      <HeaderElement
        onBeforeNavigation={() => {
          ConnectionHandler.getInstance().sockets.forEach((v, k) => {
            v.disconnect();
          });
          ConnectionHandler.getInstance().sockets.clear();
        }}
        loginName={name}
        connectionPort={socketPort}
      />
      {!isGameFound ? (
        <MatchmakingElement
          userId={userId}
          roomFound={socketPort != 5000}
          onRoomFound={handleRoomFound}
          players={players}
          onPlayerReady={handlePlayerReady}
        />
      ) : (
        <GameElement
          table={table}
          players={players}
          playerId={playerId}
          onPlayerMove={handlePlayerMove}
        />
      )}
    </div>
  );
};

export default GamePage;
