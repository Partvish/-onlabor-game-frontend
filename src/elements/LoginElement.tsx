import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";

type LoginElementPropsType={
    registerOnClick: ()=>void
    loginOnClick: ()=>void
}

const LoginElement = (props: LoginElementPropsType) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        justifyItems: "center",
        margin: "auto",
      }}
    >
      <TextField required id="tName" label="User Name" variant="filled" />
      <TextField required id="tPassword" label="Password" variant="filled" />
      <Box sx={{display: "flex", flexDirection: "column", marginTop: 5}}>
        <Button variant="contained" onClick={props.loginOnClick}>Log in</Button>
        <Button variant="contained" style={{marginTop: 5}} onClick={props.registerOnClick}>Register</Button>
      </Box>
    </Box>
  );
};

export default LoginElement;
