import { createContext, FC, PropsWithChildren, useEffect, useRef } from "react";
import { io } from "socket.io-client";

type SocketContextType = {
  getSocket: () => ReturnType<typeof io> | null;
};

const initialSocket: SocketContextType = {
  getSocket: () => null,
};

const SocketContext = createContext<SocketContextType>(initialSocket);

export const SocketContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const socket = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(import.meta.env.VITE_API_BASE_URL);
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, []);

  const getSocket = () => {
    return socket.current;
  };

  return (
    <SocketContext.Provider value={{ getSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
