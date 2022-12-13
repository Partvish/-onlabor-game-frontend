import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import UserRegister from "../entities/UserRegister";

type UserFormElementPropsType = {
  register?: boolean;
  onSubmit: (user: UserRegister) => void;
};

const UserFormElement = (props: UserFormElementPropsType) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = () => {
    if(!name || !email || !password1 || !password2){
      alert("A required field is empty!")
      return
    }
    if(password1!=password2){
      alert("Passwords fields must match!")
      return
    }
    let user = {
      name: name,
      email: email,
      password: password1,
    };
    props.onSubmit(user);
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
        id="tEmail"
        label="E-mail"
        variant="filled"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        required
        id="tPassword1"
        label="Password"
        variant="filled"
        type="password"
        onChange={(e) => {
          setPassword1(e.target.value);
        }}
      />
      <TextField
        required
        id="tPassword2"
        label="Password repeat"
        variant="filled"
        type="password"
        onChange={(e) => {
          setPassword2(e.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ marginTop: 20 }}
      >
        {props.register ? "Register" : "Modify"}
      </Button>
    </Box>
  );
};

export default UserFormElement;
