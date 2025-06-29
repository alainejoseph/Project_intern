import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CreateGroup = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    subject: '',
    description: '',
  });


  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function submitForm(e) {
    e.preventDefault()
    console.log(form)
    axios.post('http://localhost:3000/creategroup', form, {
      withCredentials: true
    })
      .then((res) => {
        console.log(res)
        handleSuccess('success');
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }).catch((err) => {
        handleError(err);
      })
  }

  return (
    <div>
      <form>
        <TextField
          label="title"
          variant="outlined"
          fullWidth
          margin="normal"
          name='title'
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          label="subject"
          variant="outlined"
          fullWidth
          margin="normal"
          name="subject"
          value={form.subject}
          onChange={handleChange}
        />
        <TextField
          label="description"
          variant="outlined"
          fullWidth
          margin="normal"
          name='description'
          value={form.description}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={submitForm}
        >
          Submit
        </Button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default CreateGroup
