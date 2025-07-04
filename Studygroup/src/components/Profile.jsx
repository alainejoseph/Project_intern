import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Box, Card, Typography } from "@mui/material";

const Profile = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  console.log(user);
  if (isLoggedIn && user) {
    return (
      <Box>
        <Card>
          <Typography variant="h3">Name : {user.name} </Typography>
          <Typography variant="h3">Email : {user.email} </Typography>
          <Typography variant="h3">Phone No : {user.phone} </Typography>
        </Card>
      </Box>
    );
  }
};

export default Profile;
