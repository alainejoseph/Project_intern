const express = require('express')
const cors = require('cors')
const PORT = 3000

const app = express()

app.use(express.json())

app.use(cors())

app.listen(PORT,()=>{
    console.log('listening to port 3000')
})

