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

const GroupsTable = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  const fetchGroups = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/getgroups", {
        withCredentials: true,
      });
      setData(res.data.groups || []);
    } catch (err) {
      toast.error("Failed to fetch users");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  function approveGroup(groupId) {
    axios
      .post(
        "http://localhost:3000/admin/approvegroup",
        { groupId },
        { withCredentials: true },
      )
      .then(() => {
        fetchGroups();
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
                <strong>Subject</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
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
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {row.isApproved ? "Approved" : "Not Approved"}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Details
                    </Button>
                    <Button variant="contained" color="secondary">
                      Send Email
                    </Button>
                    {row.isApproved ? (
                      <Button variant="outlined" color="warning">
                        Approved
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          approveGroup(row._id);
                        }}
                      >
                        Approve
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
};

export default GroupsTable;
