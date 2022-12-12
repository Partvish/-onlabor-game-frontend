import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import UserLogin from "../entities/UserLogin";

type LoginElementPropsType = {
  registerOnClick: () => void;
  loginOnClick: (user: UserLogin) => void;
};

const LoginElement = (props: LoginElementPropsType) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!name || !password) {
      alert("A required field is empty!");
      return;
    }
    let user = {
      name: name,
      password: password,
    };
    props.loginOnClick(user);
  };

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
      <TextField
        required
        id="tName"
        label="User Name"
        variant="filled"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        required
        id="tPassword"
        label="Password"
        variant="filled"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: 5 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Log in
        </Button>
        <Button
          variant="contained"
          style={{ marginTop: 5 }}
          onClick={props.registerOnClick}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default LoginElement;
