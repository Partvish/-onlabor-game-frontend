import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";

type HeaderElementPropsType = {
  onBeforeNavigation?: () => void;
};

const HeaderElement = (props: HeaderElementPropsType) => {
  let navigate = useNavigate();
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
          
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderElement;
