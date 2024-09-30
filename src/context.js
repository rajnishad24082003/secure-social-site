import React, { useState, useEffect } from "react";
import { CometChat } from "@cometchat-pro/chat"; // Ensure CometChat is imported

const Context = React.createContext(null);

export const ContextProvider = ({ children }) => {
  const [cometChat, setCometChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize CometChat here
    const appID = process.env.REACT_APP_COMETCHAT_APP_ID;
    const region = process.env.REACT_APP_COMETCHAT_REGION;

    CometChat.init(appID, new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build())
      .then(() => {
        setCometChat(CometChat); // Set cometChat instance when initialization is successful
      })
      .catch((error) => {
        console.error("CometChat initialization failed", error);
      });
  }, []);

  return (
    <Context.Provider value={{ cometChat, setIsLoading, isLoading }}>
      {children}
    </Context.Provider>
  );
};

export default Context;

