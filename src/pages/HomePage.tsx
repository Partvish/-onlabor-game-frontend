import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderElement from "../elements/HeaderElement";
import LoginElement from "../elements/LoginElement";
import UserFormElement from "../elements/UserForm";

const HomePage = () => {
    const [isRegister, setIsRegister] = useState(false);
    
    const navigate = useNavigate()


  const handleLogin = () => {
    // fetch
    alert("login successful")
    navigate("/match")
  };

  const handleRegister = () => {
    //fetch
    alert("register successful")
  };

  return (
    <div>
      <HeaderElement
        onBeforeNavigation={() => {
          setIsRegister(false);
        }}
      />
      {!isRegister ? (
        <LoginElement
          registerOnClick={() => {
            setIsRegister(true);
          }}
          loginOnClick={handleLogin}
        />
      ) : (
        <UserFormElement register onSubmit={handleRegister} />
      )}
    </div>
  );
};

export default HomePage;
