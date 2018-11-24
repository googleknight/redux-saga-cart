export const connect = () => {
  const { io } = window;
  const socket = io();
  return socket;
};

