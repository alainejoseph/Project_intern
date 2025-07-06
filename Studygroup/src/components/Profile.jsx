// import { useConext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { Box, Card, Typography } from "@mui/material";
//
// const Profile = () => {
//   const { user, isLoggedIn } = useContext(AuthContext);
//   console.log(user);
//   if (isLoggedIn && user) {
//     return (
//       <Box>
//         <Card>
//           <Typography variant="h3">Name : {user.name} </Typography>
//           <Typography variant="h3">Email : {user.email} </Typography>
//           <Typography variant="h3">Phone No : {user.phone} </Typography>
//         </Card>
//       </Box>
//     );
//   }
// };
//
// export default Profile;
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: 0,
  });
  useEffect(() => {
    axios
      .get("http://localhost:3000/me", { withCredentials: true })
      .then((res) => {
        setFormData(res.data.user);
      });
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const res = await axios.post("http://localhost:3000/profile", formData, {
        withCredentials: true,
      });
      console.log("Profile saved:", res.data);
      setFormData(formData);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  console.log(formData.toString());
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Profile Picture and Name */}
          <Grid item size={12} md={3} textAlign="center">
            <Typography variant="h6">{formData.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {formData.email}
            </Typography>
          </Grid>

          {/* Profile Form */}
          <Grid item size={12} md={9}>
            <Typography variant="h5" gutterBottom>
              Profile Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item size={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={12}>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  label="Mobile Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={12}>
                <TextField
                  fullWidth
                  label="Email ID"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              {/* Save Button */}
              <Grid item size={12} textAlign="center" mt={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Save Profile
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
