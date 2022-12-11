import React, { useState } from "react";
import GameElement from "../elements/GameElement";
import HeaderElement from "../elements/HeaderElement";
import MatchmakingElement from "../elements/MatchmakingElement";

const GamePage = () => {
    const [isGameFound, setIsGameFound ] = useState(false)

  return (
    <div>
        <HeaderElement />
        {(!isGameFound)?<MatchmakingElement />:<GameElement />}
    </div>
  );
};

export default GamePage;
