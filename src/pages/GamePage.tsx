import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GameElement from "../elements/GameElement";
import HeaderElement from "../elements/HeaderElement";
import MatchmakingElement from "../elements/MatchmakingElement";
import Player from "../entities/Player";
import GameLogic from "../GameLogic";
import ConnectionHandler from "../sockets/ConnectionHandler";
import MatchFoundDto from "../sockets/MatchFoundDto";
import RoomMessages from "../sockets/RoomMessages";

type PlayerReady = {
  name: string;
  ready: boolean;
};

const GamePage = () => {
  const [isGameFound, setIsGameFound] = useState(false);

  const [socketPort, setSocketPort] = useState(5000);
  const [game, setGame] = useState<GameLogic>(new GameLogic(""));
  const { state } = useLocation();
  const { token, id } = state;
  const [jwtToken, setJwtToken] = useState(token);
  const [userId, setUserId] = useState(id);
  const [players, setPlayers] = useState<Array<Player>>([]);

  /* useEffect(() => {
    if (!token) return;
    alert(token);
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res: Response) => {
        if (res.status != 200) {
          alert(
            "Something went wrong while fetching user data, server not responding"
          );
          return;
        }

        let body = await res.json();
        if (!body || !body.id) {
          alert("Something went wrong while fetching user data");
          return;
        }
        alert("userid collection successful: " + body.id);
        setUserId(body.id);
      })
      .catch(console.error);
  }, [token]);*/

  const handleRoomFound = (response: MatchFoundDto) => {
    setSocketPort(response.port);

    let game = new GameLogic(response.id);
    setGame(game);
    let listeners = new Map();
    listeners.set(RoomMessages.UPDATE_ROOM_STATE, (players: any) => {
      alert("Szopadadék");
      //setPlayers(players);
      alert(players);
    });
    
    let socket = ConnectionHandler.getInstance().openSocket(
      socketPort,
      listeners
    );
    socket.emit(RoomMessages.REGISTER_PLAYER, { id: response.id });
  };

  const handleGameStart = () => {
    setIsGameFound(true);
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
      />
      {!isGameFound ? (
        <MatchmakingElement
          userId={userId}
          roomFound={socketPort != 5000}
          onRoomFound={handleRoomFound}
          players={game.players}
          onGameStart={handleGameStart}
        />
      ) : (
        <GameElement />
      )}
    </div>
  );
};

export default GamePage;
