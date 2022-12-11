import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

const StartMatchmakingFragment = () => {
  const [isSearching, setIsSearching] = useState(false);

  const handleClick = () => {
    setIsSearching(true);
  };

  return (
    <div>
      {isSearching ? (
        <Box sx={{ display: "flex", margin: "auto", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", margin: "auto", flexDirection: "column" }}>
          <Typography>Click on the button to start matchmaking</Typography>
          <Button variant="contained" onClick={handleClick}>
            Start
          </Button>
        </Box>
      )}
    </div>
  );
};

export default StartMatchmakingFragment;
