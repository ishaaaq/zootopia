import { useEffect, useRef } from "react";
import Pusher from "pusher-js";

const PUSHER_KEY = "b2bab0853f16b1e3d8b5"; // Replace with your Pusher Key
const PUSHER_CLUSTER = "eu"; // Replace with your Pusher Cluster

export const usePusher = (channelName, eventName, callback) => {
  const pusherRef = useRef(null);

  useEffect(() => {
    // Initialize Pusher
    pusherRef.current = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
    });

    // Subscribe to channel and bind event
    const channel = pusherRef.current.subscribe(channelName);
    channel.bind(eventName, callback);

    return () => {
      // Clean up
      channel.unbind(eventName);
      pusherRef.current.unsubscribe(channelName);
      pusherRef.current.disconnect();
    };
  }, [channelName, eventName, callback]);
};
