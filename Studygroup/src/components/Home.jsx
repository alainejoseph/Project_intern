import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Toolbar } from '@mui/material';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {AuthContext} from '../contexts/AuthContext'
import { ToastContainer } from 'react-toastify';


const Home = () => {
  const {user} =useContext(AuthContext)
  const [groups , setGroups]= useState([]);
console.log("navbar",(user))
useEffect(()=>{
  axios.get('http://localhost:3000/getgroups',{withCredentials:true}).then((res)=>{
    const set = ()=>{
      setGroups(res.data.group)
    }
    set();

  })

},[])
  return (
    <div>
     <Box sx={{flexDirection:'column'}}>
      { 
        groups.map((group)=>(
          <Card sx={{ Width:'100%' ,backgroundColor:'whitesmoke',margin:'1rem'}}>
          <CardContent >
            <Typography variant="h5" component="div" sx={{fontWeight:'bold'}}>
              {group.title}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button size="small" variant='contained'>join</Button>
          </CardActions>
        </Card>
        ))
      }
    <div>
      {user ? <p>Logged in as {user.name}</p> : <p>Not logged in</p>}
    </div>
     </Box>
      <Box sx={{
      position: 'fixed',
      bottom: 16,
      right: 16,
      }}>
      <Link to='/create-group'>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      </Link>
    </Box>
    <ToastContainer/>
    </div>
  )
}

export default Home