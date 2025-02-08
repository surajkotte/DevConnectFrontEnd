import { io } from "socket.io-client";
export default createSocket = () => {
  return io("http://localhost:3000");
};
