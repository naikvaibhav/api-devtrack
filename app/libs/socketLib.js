const socketio = require("socket.io");
const mongoose = require("mongoose");
const shortid = require("shortid");
const logger = require("./loggerLib");
const events = require("events");
const eventEmitter = new events.EventEmitter();
// var cron = require('node-cron');
const timeLib = require("./timeLib");
// const email = require('./emailLib');
//model
// const MeetingModel = mongoose.model('Meeting');
const tokenLib = require("./tokenLib");
const check = require("./checkLib");
const response = require("./responseLib");
// const redisLib = require("./redisLib");

const WatcherModel = mongoose.model("Watcher");

let setServer = (server) => {
  let allOnlineUsers = [];
  let io = socketio.listen(server);

  let myIo = io.of("");

  // var sockets = [];

  //main event handler
  myIo.on("connection", (socket) => {
    // sockets.push(socket);
    console.log("on connection -- emitting verify user");
    // console.log("verify user is emitted");
    socket.emit("verifyUser", "");

    // console.log("sockets", sockets);
    //code to verify the user and make him online

    socket.on("set-user", (authToken) => {
      // console.log("set-user listened on sevrer", authToken);
      tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
        if (err) {
          socket.emit("auth-error", {
            status: 500,
            error: "Please provide correct auth token",
          });
        } else {
          // console.log("User is verified.. setting details");
          let currentUser = user.data;
          // console.log('currentUser');
          socket.id = currentUser.userId;
          // console.log("socket.userId", socket.id);
          // console.log("socket", socket);
          // console.log(currentUser);
          //setting socket userId
          socket.userId = currentUser.userId;
          let fullName = `${currentUser.firstName} ${currentUser.lastName}`;
          console.log(`${fullName} is online`);
          // console.log("socket userId", socket.userId);
          let userObj = {
            userId: currentUser.userId,
            name: currentUser.firstName + " " + currentUser.lastName,
            socketUserId: socket.userId,
            // socket: socket,
          };
          allOnlineUsers.push(userObj);
          //remove duplicate userObj from array
          allOnlineUsers = Array.from(
            new Set(allOnlineUsers.map((a) => a.userId))
          ).map((userId) => {
            return allOnlineUsers.find((a) => a.userId === userId);
          });
          console.log("allOnlineUsers", allOnlineUsers);
          socket.room = "issue";
          socket.join(socket.room);
          // console.log("length of room", io.sockets.adapter.rooms[socket.room]);
          socket.broadcast.emit("broadcast", allOnlineUsers);
          // io.emit('online-user-list', allOnlineUsers);
        }
      });
    }); //end listening set-user event

    socket.on("inform-server", (data) => {
      io.emit(data.changesMade.assignee.userId, data);
      io.emit("inform-reporter", data);
      io.emit("inform-watcher", data);
    }); //end listening inform-server event

    socket.on("disconnect", () => {
      //disconect the user from the socket
      //remove the user from online list
      //unsubscribe the user from this own channel
      console.log("user is disconnected " + socket.userId);
      // console.log(socket.userId);

      let removeIndex = allOnlineUsers
        .map((user) => {
          return user.userId;
        })
        .indexOf(socket.userId);
      allOnlineUsers.splice(removeIndex, 1);
      console.log("delete allOnlineUsers", allOnlineUsers);
      // io.emit("online-user-list", allOnlineUsers);

      //leave the room
      // socket.leave(socket.room);
    }); //end disconnect event
  });
};

module.exports = {
  setServer: setServer,
};
