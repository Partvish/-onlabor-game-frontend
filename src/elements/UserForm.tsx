import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

type UserFormElementPropsType = {
    register?: boolean,
    onSubmit: ()=>void
}

const UserFormElement = (props: UserFormElementPropsType) => {

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
      <TextField required id="tEmail" label="E-mail" variant="filled" />
      <TextField required id="tPassword1" label="Password" variant="filled" />
      <TextField
        required
        id="tPassword2"
        label="Password repeat"
        variant="filled"
      />
      <Button variant="contained" onClick={props.onSubmit} style={{marginTop: 20}}>{(props.register)?"Register":"Modify"}</Button>
    </Box>
  );
};

export default UserFormElement
