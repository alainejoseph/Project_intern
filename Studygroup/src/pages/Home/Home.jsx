import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { List, ListItem, Toolbar } from "@mui/material";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import GroupCards from "./components/GroupCards";

const Home = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);

  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  };

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("http://localhost:3000/getgroups", { withCredentials: true })
        .then((res) => {
          const set = () => {
            setGroups(res.data.group);
          };
          set();
        });
    } else {
      // navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div>
      <Box sx={{ flexDirection: "row" }}>
        <GroupCards groups={groups} user={user} reset={reset} seed={seed} />
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <Link to="/create-group">
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    </div>
  );
};

export default Home;
