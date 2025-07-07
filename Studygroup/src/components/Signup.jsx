import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background =
      "linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pass: "",
    terms: false,
  });

  const handleError = (err) => toast.error(err, { position: "bottom-left" });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-right" });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function submitForm(e) {
    e.preventDefault();
    if (form.terms) {
      axios
        .post("http://localhost:3000/signup", form, {
          withCredentials: true,
        })
        .then(() => {
          handleSuccess("Signup successful!");
          navigate("/");
        })
        .catch(() => handleError("Signup failed"));
    } else {
      handleError("Accept terms and conditions");
    }
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, px: 2 }}>
      <Box
        component="form"
        onSubmit={submitForm}
        sx={{ width: "100%", maxWidth: 450 }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          mb={3}
          fontWeight="bold"
          sx={{ color: "black" }}
        >
          CREATE AN ACCOUNT
        </Typography>

        {/* Name */}
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            sx: {
              backgroundColor: "white",
            },
          }}
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            sx: {
              backgroundColor: "white",
            },
          }}
        />

        {/* Phone */}
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            sx: {
              backgroundColor: "white",
            },
          }}
        />

        {/* Password */}
        <TextField
          fullWidth
          label="Password"
          name="pass"
          type="password"
          value={form.pass}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            sx: {
              backgroundColor: "white",
            },
          }}
        />

        {/* Terms */}
        <FormControlLabel
          control={
            <Checkbox
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              sx={{ color: "white" }}
            />
          }
          label="Accept Terms and Conditions"
          sx={{ color: "white", mt: 1 }}
        />

        {/* Submit */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>

        {/* OR */}
        <Typography align="center" color="white" my={2}>
          OR
        </Typography>

        {/* Login Link */}
        <Typography align="center" color="white">
          Have an account? <Link to="/login">Login</Link>
        </Typography>

        <ToastContainer />
      </Box>
    </Box>
  );
}

export default Signup;
