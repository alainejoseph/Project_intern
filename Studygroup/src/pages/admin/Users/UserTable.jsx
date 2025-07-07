import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const UserTable = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/getusers", {
        withCredentials: true,
      });
      setData(res.data.users || []);
    } catch (err) {
      toast.error("Failed to fetch users");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  if (data != undefined) {
    const filteredData = data.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase()),
      ),
    );

    function BlockUser(userId) {
      axios
        .post(
          "http://localhost:3000/admin/blockuser",
          { userId },
          { withCredentials: true },
        )
        .then(() => {
          fetchUsers();
          toast.dark("User Blocked", {
            position: "bottom-left",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable to Block user", {
            position: "bottom-left",
          });
        });
    }

    function unBlockUser(userId) {
      axios
        .post(
          "http://localhost:3000/admin/unblockuser",
          { userId },
          { withCredentials: true },
        )
        .then(() => {
          fetchUsers();
          toast.dark("User Unblocked", {
            position: "bottom-left",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable to unblock user", {
            position: "bottom-left",
          });
        });
    }

    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          User Table with Search
        </Typography>

        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Sno</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Is Admin</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      {row.isBlocked ? "Blocked" : "Not Blocked"}
                    </TableCell>
                    <TableCell>
                      {row.isAdmin ? "is Admin" : "Not Admin"}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        Details
                      </Button>
                      <Button variant="contained" color="secondary">
                        Send Email
                      </Button>
                      {!row.isBlocked ? (
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => {
                            BlockUser(row._id);
                          }}
                        >
                          Block
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => {
                            unBlockUser(row._id);
                          }}
                        >
                          Unblock
                        </Button>
                      )}
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
};

export default UserTable;
