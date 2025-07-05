import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, List, ListItem, ListItemText } from "@mui/material";

function Materials({ group }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log(`groupid ${group._id}`);
    axios
      .get(`http://localhost:3000/getmaterials/${group._id}`, {
        withCredentials: true,
      })
      .then((resfiles) => {
        console.log("materials are ", resfiles.data.files);
        setFiles(resfiles.data.files);
      });
  }, [group._id]);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `http://localhost:3000/uploadmaterial/${group._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setMessage("File Uploaded");
      const resfiles = await axios.get(
        `http://localhost:3000/getmaterials/${group._id}`,
        {
          withCredentials: true,
        },
      );
      console.log(resfiles.data.files);
      setFiles(resfiles.data.files);
    } catch (error) {
      setMessage("Upload failed");
    }
  };

  return (
    <>
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
          {files.map((file) => (
            <ListItem key={file.filename}>
              <ListItemText
                primary={
                  <a
                    href={`http://localhost:3000/download/${group._id}/${file.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.originalName}
                  </a>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <p>{message}</p>
      </div>
    </>
  );
}

export default Materials;
