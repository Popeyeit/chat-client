link app - https://chat-6f698.web.app/


1. You have to clone the repository on your computer.
2. Install dependencies of the project. Use for it "npm install".
3. After when dependencies will be installed, use "npm start" in the terminal.

Routers:

for auth  
"/login"  
"/register"  


just for auth user  
"/"  
"/chat"  
"/chat/:roomId"  
"/profile/:userId"  


route "/" - has list all user and you can filter by online or offline.   
If you click on a user you will get "/profile/:userId" route.  
There is all messages of user.  


For chatting click on "Start chatting" btn and you get "/chat".  
There you can create a room for texting.  
Click on a room and you get "/chat/:roomId".  
For test chat you can open app on different browsers.
