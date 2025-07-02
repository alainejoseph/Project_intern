import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



const GroupCards = ({groups,user}) => {
  const [joinedGroups,setJoinedGroups]=useState([]);
  useEffect(()=>{
    if(user){
      const intialJoined=groups.filter((group)=>group.members.includes(user._id)).map((group)=>group._id)
      setJoinedGroups(intialJoined)
    }
  },[groups,user])
  function joinGroup(userId,groupId){
      axios.post(`http://localhost:3000/joingroup/${groupId}`,{user:userId},{withCredentials:true}).then((res)=>{
      console.log(res.data);
      setJoinedGroups(prev=>[...prev,groupId])
  })
  }
    if(user) return (
    <div>
      <Stack>
      { 
        groups.map((group)=>(
            <Card sx={{ width:'100%' ,backgroundColor:'whitesmoke',marginBottom:'0.5rem'}}>
          <CardContent >
            <Typography variant="h5" component="div" sx={{fontWeight:'bold'}}>
              {group.title}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            
            {(joinedGroups.includes(group._id))?(
              <Button disabled variant='outlined'>Joined</Button>
            ):(<Button size="small" variant='contained' onClick={()=>{joinGroup(user._id,group._id)}}>join</Button>)}
            
            <Link to='/getgroup' state={{groupId:group._id,userId:user._id}}><Button size="small" variant='contained'>Group Details</Button></Link>
          </CardActions>
        </Card>
        ))
      }
      </Stack>
    </div>
  )
}

export default GroupCards
