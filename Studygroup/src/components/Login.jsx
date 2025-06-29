import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { Box } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';


const Login = () => {
	 const { setIsLoggedIn, setUser } = useContext(AuthContext)
	const navigate = useNavigate()
	useEffect(() => {
    // Set body background to black when component mounts
    document.body.style.background="linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)";


    // Cleanup: Reset when component unmounts
    return () => {
      document.body.style.background= '';
    };
  }, []);

  	const [form,setForm] = useState({
		email:'',
		pass:'',
	  });
	  
  
	  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });


	  function handleChange(e){
		setForm({...form,[e.target.name]:e.target.value})
	  }

function submitForm(e){
      e.preventDefault()
      console.log(form)
      axios.post('http://localhost:3000/login',form,{
		withCredentials:true
	  }).then((res)=>{
		console.log(res.data.user)
		setIsLoggedIn(true);
		setUser(res.data.user)
		handleSuccess('success');

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }).catch((err)=>{
		console.log("error login",err.response.data)
		handleError(err.response.data.message);

	  })
    }

  return (
	<Box sx={{justifyContent:'center',display:'flex'}}>
		<div className={`${styles.wapper} ${styles.signUp}`}>
			
			<div className={styles.form}>
				<div className={styles.heading}>LOGIN</div>
				<form>
					<div>
						<label htmlFor="name">Name</label>
						<input type="text" id="name" name='email' placeholder="Enter your name" value={form.email} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="e-mail">E-Mail</label>
						<input type="email" id="e-mail" name='pass' placeholder="Enter you mail" value={form.pass} onChange={handleChange} />
					</div>
					<button type="submit" onClick={submitForm}>
						Submit
					</button>
				</form>
				<p>
					Don't have an account ? <Link to="/signup"> Sign Up </Link>
				</p>
			</div>
			<ToastContainer/>
		</div>
	</Box>
	);
}

export default Login
