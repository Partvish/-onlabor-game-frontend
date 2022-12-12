import { Paper, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import Player from "../entities/Player";

type MatchmakingLobbyFragmentPropsType = {
  onGameStart: () => void;
  players: Array<Player>;
};

const MatchmakingLobbyFragment = (props: MatchmakingLobbyFragmentPropsType) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "70%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Ready</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.players.map((player: Player) => (
            <TableRow key={player.id}>
              <TableCell component="th" scope="row">
                {player.id}
              </TableCell>
              <TableCell align="right">{player.name}</TableCell>
              <TableCell align="right">{player.ready}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MatchmakingLobbyFragment;
