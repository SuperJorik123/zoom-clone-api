const express = require("express");
const app = express();
const server = require("http").Server(app)
const io = require("socket.io")(server)

const port = 3002
const users = []

app.get("/",(req, res) => {
    console.log("open page /");
res.send("hellow world")})

const AddUser = (roomId,userName)=>{
    userName.push({
        userName : userName,
        roomId: roomId
    })
}

const getRoomUsers = (roomId)=>{
    users.filter( user => (user.roomId = roomId))

}

const userLeave = (userName) => {
    users = users.filter(user => user.userName != userName)
}

io.on("connection", socket => {
    console.log('Someone conected')
        socket.on('join-room', ({ roomId, userName}) => {
            console.log('User joined room')
            console.log(roomId)
            console.log(userName)
            socket.join(roomId)
            AddUser(userName,roomId)
            socket.to(roomId).emit("user-connected", userName)
            userLeave(userName)
            io.to(roomId).emit("all-users", getRoomUsers(roomId))
    })
    // socket.on("disconect", () =>{
    //     console.log("disconected")
    //     socket.leave(roomId)
    //     io.to(roomId).emit("all-users", getRoomUsers(roomId))
    // })

    
}) 


server.listen(port, () => {
    console.log('Zoom clone api listenint on localhost:3002')

})