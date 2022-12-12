import { Button, Paper, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import Player from "../entities/Player";

type MatchmakingLobbyFragmentPropsType = {
  onPlayerReady: (playerId: string, makeReady: boolean)=> void;
  players: Array<Player>;
};

const MatchmakingLobbyFragment = (props: MatchmakingLobbyFragmentPropsType) => {
  
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "70%", margin: "auto" }}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Points</TableCell>
            <TableCell align="center">Ready</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.players &&
            props.players.map((player: Player) => (
              <TableRow key={player.id}>
                <TableCell  scope="row" align="center">
                  {player.id}
                </TableCell>
                <TableCell align="center">{player.name}</TableCell>
                <TableCell align="center">{player.name}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color={player.ready ? "success" : "error"}
                    onClick={()=>{props.onPlayerReady(player.id, player.ready)}}
                  >
                    {player.ready ? "Ready" : "Not Ready"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MatchmakingLobbyFragment;
