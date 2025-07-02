import { useEffect, useState } from "react";


export function getUser()
{
    const [user, setUser] = useState(null);

   useEffect(()=>{
          fetch('http://localhost:3000/me', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
   })

   return user;
}