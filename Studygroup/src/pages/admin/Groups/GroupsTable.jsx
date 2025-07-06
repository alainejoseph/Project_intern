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

const GroupTable = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/getusers", { withCredentials: true })
      .then((res) => {
        console.log(res);
        setData(res.data.users);
      });
  }, []);
  if (data != undefined) {
    const filteredData = data.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase()),
      ),
    );

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
                  <strong>ID</strong>
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
                filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.isBlocked}</TableCell>
                    <TableCell>{row.isAdmin}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        Details
                      </Button>
                      <Button variant="contained" color="secondary">
                        Send Email
                      </Button>
                      {!row.isBlocked ? (
                        <Button variant="contained" color="warning">
                          Block
                        </Button>
                      ) : (
                        <Button variant="contained" color="warning">
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

export default GroupTable;
