import React from "react";
import HeaderElement from "../elements/HeaderElement";
import UserFormElement from "../elements/UserForm";

const SettingsPage = () => {
  return (
    <div>
        <HeaderElement />
        <UserFormElement onSubmit={()=>{}} />
    </div>
  );
};

export default SettingsPage;
