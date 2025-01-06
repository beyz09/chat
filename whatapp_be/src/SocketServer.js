import CallHistory from './models/CallHistory.js'; // Modelin doğru yolu
import User from './models/userModel.js'; // Kullanıcı modelini ekliyoruz

let onlineUsers = [];
export default function (socket, io) {
  // User joins or opens the application
  socket.on("join", (user) => {
    socket.join(user);
    socket.setMaxListeners(20);
    // Add joined user to online users
    if (!onlineUsers.some((u) => u.userId === user)) {
      onlineUsers.push({ userId: user, socketId: socket.id });
     
      socket.userId = user;
      
    }
    // Send online users to frontend
    io.emit("get-online-users", onlineUsers);
    // Send socket id
    io.emit("setup socket", socket.id);
  });

  // Socket disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-online-users", onlineUsers);
  });

  // Join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
  });

  // Send and receive message
  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("receive message", message);
    });
  });

  // Typing
  socket.on("typing", (conversation) => {
    socket.in(conversation).emit("typing", conversation);
  });
  socket.on("stop typing", (conversation) => {
    socket.in(conversation).emit("stop typing");
  });

  
  // Handle call user
  socket.on("call user", async (data) => {
  
    let userId = data.userToCall;
    let userSocketId = onlineUsers.find((user) => user.userId == userId);
    


    if (!userSocketId) {
      console.error("User not found online");
      return;
    }

    try {
      // Retrieve receiver's name from the database
      const receiver = await User.findById(userId);
      
      if (!receiver) {
        console.error("Receiver not found in database");
        return;
      }
      

      const callHistory = new CallHistory({
        recever: receiver.name, // Receiver ID
        userId: userSocketId.userId, // Caller ID
        callTime: new Date(), // Current date/time
        callType: 'outgoing', // Outgoing call
        status: 'initiated', // Call status
        callerName: data.name,
        callerId: socket.userId,
       

      });

      await callHistory.save(); // Save to MongoDB

      io.to(userSocketId.socketId).emit("call user", {
        signal: data.signal,
        from: data.from,
        name: data.name,
        picture: data.picture,
        receiverName: receiver.name, // Include receiver name in the emit
      });

      // Örnek socket.io kullanımı backend tarafında


    } catch (error) {
      console.error("Error saving call history:", error);
    }
  });
  io.on('connection', (socket) => {
   

    socket.on('getCallHistory', (data) => {
      
      // Burada çağrı geçmişini kullanıcıya geri gönderiyoruz
      CallHistory.find()
      .then(calls => {
        socket.emit('callHistory', calls);  // Veri frontend'e gönderiliyor
      })
      .catch(err => {
        console.error('Hata:', err);
      });
    
    });
  });

  // Answer call
  socket.on("answer call", async (data) => {
    const callHistory = await CallHistory.findOne({ userId: data.to, status: 'initiated' }).sort({ callTime: -1 });
    if (callHistory) {
      callHistory.status = 'answered'; // Update status to answered
      await callHistory.save();
    }

    io.to(data.to).emit("call accepted", data.signal);
  });

  // End call
  socket.on("end call", async (id) => {
    const callHistory = await CallHistory.findOne({ userId: id, status: 'initiated' }).sort({ callTime: -1 });
    if (callHistory) {
      callHistory.status = 'ended'; // Update status to ended
      await callHistory.save();
    }

    io.to(id).emit("end call");
  });
  let onlineUsers = [];

  //user joins or opens the application
  socket.on("join", (user) => {
    socket.join(user);
    //add joined user to online users
    if (!onlineUsers.some((u) => u.userId === user)) {
      onlineUsers.push({ userId: user, socketId: socket.id });
    }
    //send online users to frontend
    io.emit("get-online-users", onlineUsers);
    //send socket id
    io.emit("setup socket", socket.id);
  });

  //socket disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-online-users", onlineUsers);
  });

  //join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
  });

  //send and receive message
  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("receive message", message);
    });
  });

  //typing
  socket.on("typing", (conversation) => {
    socket.in(conversation).emit("typing", conversation);
  });
  socket.on("stop typing", (conversation) => {
    socket.in(conversation).emit("stop typing");
  });

  //call
  //---call user
  socket.on("call user", (data) => {
    let userId = data.userToCall;
    let userSocketId = onlineUsers.find((user) => user.userId == userId);
    if (userSocketId) {
      io.to(userSocketId.socketId).emit("call user", {
        signal: data.signal,
        from: data.from,
        name: data.name,
        picture: data.picture,
        isAudioCall: data.isAudioCall || false, // Sesli arama mı?
      });
    }
  });

  //---answer call
  socket.on("answer call", (data) => {
    io.to(data.to).emit("call accepted", {
      signal: data.signal,
      isAudioCall: data.isAudioCall || false, // Sesli arama mı?
    });
  });

  //---end call
  socket.on("end call", (id) => {
    io.to(id).emit("end call");
  });

  //---mute/unmute audio
  socket.on("mute audio", (data) => {
    io.to(data.to).emit("mute audio", { from: data.from });
  });

  socket.on("unmute audio", (data) => {
    io.to(data.to).emit("unmute audio", { from: data.from });
  });
}



