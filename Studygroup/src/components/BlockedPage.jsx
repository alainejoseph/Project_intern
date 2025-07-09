import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";

export default function BlockedPage() {
  return (
    <Box
      minHeight="100vh"
      bgcolor="#1b1b1b"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Paper
          elevation={6}
          sx={{
            bgcolor: "#2c2c2c",
            color: "#ff4c4c",
            p: 5,
            borderRadius: 4,
            maxWidth: 480,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" gutterBottom>
            🚫 Blocked
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: "#ffb3b3" }}>
            Access Denied
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "#cccccc" }}>
            You have been blocked from accessing this website.
            <br />
            If you believe this is a mistake, please contact support.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#ff4c4c",
              "&:hover": { bgcolor: "#e63946" },
            }}
            onClick={() =>
              (window.location.href = "mailto:support@example.com")
            }
          >
            Contact Support
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
}
