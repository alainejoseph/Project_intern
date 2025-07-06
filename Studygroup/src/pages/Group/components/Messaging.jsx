import React, { useState, useEffect, useContext } from "react";

import { io } from "socket.io-client";
const socket = io("http://localhost:3000", { autoConnect: false });
import { AuthContext } from "../../../contexts/AuthContext";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
} from "@mui/material";
import axios from "axios";
import Materials from "./Materials";

function Messaging({ group }) {
  const { user } = useContext(AuthContext);
  // const [username, setUsername] = useState("");
  // const [room, setRoom] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);

  const joinRoom = (username, room) => {
    if (username && room) {
      socket.emit("joinRoom", { username, room });
      setCurrentRoom(room);
      setMessages([]);
    }
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", currentRoom);
    setCurrentRoom("");
    setUsers([]);
    setMessages([]);
  };

  const sendMessage = () => {
    if (message && currentRoom) {
      socket.emit("sendMessage", {
        sender: user.name,
        content: message,
        room: currentRoom,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.connect();
    joinRoom(user.name, group._id);

    const handleHistory = (history) => setMessages(history);
    const handleUsers = (users) => setUsers(users);

    // Attach once

    socket.on("chatHistory", handleHistory);
    socket.on("roomUsers", handleUsers);

    return () => {
      // Clean up
      socket.emit("leaveRoom", currentRoom);
      socket.off("chatHistory", handleHistory);
      socket.off("roomUsers", handleUsers);
      socket.disconnect();
      setCurrentRoom("");
      setUsers([]);
      setMessages([]);
      console.log("Socket disconnected");
    };
  }, [group._id, user.name]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/getgroupusers/${group._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMembers(res.data.users);
      });
    console.log(`groupid  ${group._id}`);
    const handleMessage = (msg) => {
      console.log("Message received:", msg);
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [currentRoom]);
  console.log(members);
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid size={4}>
          <Typography variant="h4" align="center" mt={2}>
            Group Members
          </Typography>
          <Paper elevation={3}>
            <Box
              mt={4}
              sx={{
                height: 300,
                overflowY: "auto",
                border: "1px solid #ddd",
                p: 1,
                mb: 2,
                borderRadius: 1,
              }}
              display="flex"
              gap={2}
            >
              <List dense>
                {members.map((user) => (
                  <ListItem key={user.id}>
                    <ListItemText primary={user.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Typography variant="h4" align="center" mt={2}>
            Group Chat
          </Typography>
          {currentRoom && (
            <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
              <Box
                sx={{
                  maxHeight: 300,
                  overflowY: "auto",
                  border: "1px solid #ddd",
                  p: 1,
                  mb: 2,
                  borderRadius: 1,
                  height: 200,
                }}
              >
                {messages.map((msg, idx) => (
                  <Box key={idx} mb={1}>
                    <Typography variant="body2">
                      <strong>{msg.sender}:</strong> {msg.content}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box display="flex" gap={1}>
                <TextField
                  fullWidth
                  label="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button variant="contained" onClick={sendMessage}>
                  Send
                </Button>
              </Box>
            </Paper>
          )}
        </Grid>
        <Grid size={4}>
          <Materials group={group} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Messaging;
