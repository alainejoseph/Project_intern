import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Login.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Box } from "@mui/material";



 function Signup() {

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
      name:'',
      email:'',
      phone:0,
      pass:'',
    });
    

    const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

    const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });


    function handleChange(e){
      console.log(e.target.name)
      setForm({...form,[e.target.name]:e.target.value})
    }

    function submitForm(e){
      e.preventDefault()

      if(form.terms=='on')
      {

      console.log(form)
      axios.post('http://localhost:3000/signup',form,{withCredentials:true}).then((res)=>{
        handleSuccess(res)
        console.log(document.cookie)
        navigate('/');
      })
    }else
    {
      handleError('accept terms and conditions')
    }
    }

  return (
    <Box sx={{display:'flex',justifyContent:'center'}}>
      <div className={`${styles.wrapper} ${styles.signUp}`}>
     
      <div className={styles.form}>
        <div className={styles.heading}>CREATE AN ACCOUNT</div>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" onChange={handleChange} name="name" value={form.name}/>
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input type="text" id="email" name='email'  placeholder="Enter your mail" onChange={handleChange} />
          </div>
            <div>
            <label htmlFor="phone">Contact Number</label>
            <input type="number" id="phone" placeholder="Enter your number" name="phone" onChange={handleChange} />
          </div>
           <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter you password"
              name="pass"
              onChange={handleChange}
            />
          </div>
            <div>
            <label htmlFor="terms">Terms and Conditions</label>
            <input type="checkbox" id="terms" 
            name="terms" value={form.terms} onChange={handleChange}/>
          </div>
          <button type="submit" onClick={submitForm}>Submit</button>
          <h2 align="center" class="or">
            OR
          </h2>
        </form>
        <p>
          Have an account ? <Link to="/login"> Login </Link>
        </p>
      </div>
    </div>
    </Box>
  );
}


export default Signup
