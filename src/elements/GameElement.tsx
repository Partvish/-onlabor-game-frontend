import React from "react";
import { Button, Paper, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Player from "../entities/Player";
import CastleIcon from "@mui/icons-material/Castle";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

type GameElementPropsType = {
  table: string[][];
  players: Player[];
  onPlayerMove: (x: number, y: number, playerId: string) => void;
  playerId: string;
};

const colors = ["red", "blue", "green", "yellow"];

const GameElement = (props: GameElementPropsType) => {
  const getColor = (_playerId: string) => {
    let playerId = _playerId.replace("~~", "");
    /*if (playerId == props.playerId && _playerId.startsWith("~~")) {
      return "white";
    }*/
    if (!playerId) return "grey";
    let index = props.players.findIndex(
      (player: Player) => player.id == playerId
    );
    if (index == -1) return "grey";
    return colors[index];
  };

  const getNameOfPlayer = (playerId: string): string => {
    let player = props.players.find((e) => e.id == playerId);
    if (!player) return playerId;
    return player.name;
  };

  return (
    <Box sx={{ margin: "auto", maxWidth: "70%" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {props.table &&
              props.table.map((playerArray: Array<string>, indexX: number) => (
                <TableRow key={`player_array${indexX}`}>
                  {playerArray &&
                    playerArray.map((player: string, indexY) => (
                      <TableCell
                        component="th"
                        scope="row"
                        key={`player${indexY}`}
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: getColor(player),
                          cursor: "pointer",
                          color:
                            player.startsWith("~~") &&
                            player.includes(props.playerId)
                              ? "white"
                              : "black",
                          textAlign: "center",
                        }}
                        onClick={() => {
                          props.onPlayerMove(
                            indexX + 1,
                            indexY + 1,
                            player.replace("~~", "")
                          );
                        }}
                      >
                        {player.startsWith("~~") ? (
                          <Tooltip
                            title={`Player ${getNameOfPlayer(
                              player.replace("~~", "")
                            )}`}
                            placement="top"
                          >
                            <CastleIcon />
                          </Tooltip>
                        ) : (
                          <EmojiFlagsIcon />
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GameElement;
