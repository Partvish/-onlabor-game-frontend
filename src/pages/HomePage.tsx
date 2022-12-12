import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import HeaderElement from "../elements/HeaderElement";
import LoginElement from "../elements/LoginElement";
import UserFormElement from "../elements/UserFormElement";
import UserLogin from "../entities/UserLogin";
import UserRegister from "../entities/UserRegister";

const HomePage = () => {
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (user: UserLogin) => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(async (res: Response) => {
      if (res.status != 200) {
        alert("Something went wrong with the login process. " + res.status);
        return;
      }
      let body = await res.json();
      if (!body || !body.token || !body.id) {
        alert("Something went wrong with the login process. Try again later.");
        return;
      }
      alert("Login successful");
      navigate("/match", { state: { token: body.token, id: body.id } });
    });
  };

  const handleRegister = (user: UserRegister) => {
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res: Response) => {
      if (res.status != 200) {
        alert(
          "Something went wrong with the registration process. Try again later."
        );
        return;
      }
      alert("Registration successful! You can log in now.");
      setIsRegister(false);
    });
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
