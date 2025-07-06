import { Box, Divider, Fab, Grid, Menu, MenuItem, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLocation } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Messaging from "./components/Messaging";
import { toast } from "react-toastify";

const Group = () => {
  const location = useLocation();
  const { groupId, userId } = location.state;

  const [group, setGroup] = useState({});
  const [joined, setJoined] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/getgroup/${groupId}`,
          {
            params: { user: userId },
          },
        );

        if (res.data.status) {
          const groupData = res.data.group;
          setGroup(groupData);
          setJoined(groupData.members.includes(userId));
          console.log(groupData);
        }
      } catch (error) {
        console.error("Failed to fetch group:", error);
      }
    };

    if (userId && groupId) {
      fetchGroup();
    }
  }, [userId, groupId]); // Only rerun if userId or groupId changes

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const leaveGroup = () => {
    axios
      .post(
        `http://localhost:3000/leavegroup/${groupId}`,
        { userId },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        toast.success(res.data.msg, {
          position: "bottom-left",
        });
        handleCloseUserMenu();
      })
      .catch((err) => {
        toast.error(err.data.msg, {
          position: "bottom-left",
        });
        handleCloseUserMenu();
      });
  };

  return (
    <div>
      <Container maxWidth>
        <Card sx={{ backgroundColor: "#eceff4", marginBottom: "1rem" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            padding={2}
          >
            <Box>
              <Typography variant="h2">{group.title}</Typography>
              <Typography variant="h5">Subject : {group.subject}</Typography>
            </Box>
            <Fab
              size="small"
              sx={{ backgroundColor: "#eceff4", boxShadow: "none" }}
              onClick={handleOpenUserMenu}
            >
              <MoreVertIcon />
            </Fab>
            <Menu
              sx={{ mt: "45px", alignItems: "center" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={"Leave Group"} onClick={leaveGroup}>
                <Button
                  sx={{ textAlign: "center" }}
                  variant="outlined"
                  color="warning"
                >
                  Leave Group{" "}
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Card>
        <Card sx={{ backgroundColor: "#eceff4" }}>
          <Box padding={2}>
            <Typography variant="h4">Description</Typography>
            <Typography variant="h6">{group.description}</Typography>
          </Box>
        </Card>
        {joined && <Messaging group={group} />}
      </Container>
    </div>
  );
};

export default Group;
