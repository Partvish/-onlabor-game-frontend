import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";

import PublicOffIcon from "@mui/icons-material/PublicOff";
import PublicIcon from "@mui/icons-material/Public";
import ConnectionHandler from "../sockets/ConnectionHandler";
import Tooltip from "@mui/material/Tooltip";

type HeaderElementPropsType = {
  onBeforeNavigation?: () => void;
  loginName?: string;
  connectionPort?: number;
};

const HeaderElement = (props: HeaderElementPropsType) => {
  let navigate = useNavigate();
  const isConnected = props.connectionPort
    ? ConnectionHandler.getInstance().isConnected(props.connectionPort)
    : false;
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              props.onBeforeNavigation && props.onBeforeNavigation();
              navigate("/");
            }}
          >
            Simple Game
          </Typography>
          {props.loginName && <Typography>{props.loginName}</Typography>}
          {props.connectionPort && (
            <div style={{ marginLeft: 20 }}>
              <Tooltip
                title={`Connected to port ${props.connectionPort}`}
                placement="bottom"
              >
                {isConnected ? <PublicIcon /> : <PublicOffIcon />}
              </Tooltip>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderElement;
