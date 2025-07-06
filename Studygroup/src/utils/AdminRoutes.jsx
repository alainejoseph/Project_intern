import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";

const AdminRoutes = () => {
  const { user, setUser, setIsLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("http://localhost:3000/me", { withCredentials: true })
      .then((res) => {
        console.log("protection ", res.data.user);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log("protection error \n", err);
        setUser(null);
        setIsLoggedIn(false);
      });
  }, []);
  return user.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
