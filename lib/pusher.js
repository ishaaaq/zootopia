const PUSHER_APP_ID = "1927533";
const PUSHER_KEY = "b2bab0853f16b1e3d8b5";
const PUSHER_SECRET = "5cc06a8afd715367d810";
const PUSHER_CLUSTER = "eu";

import axios from "axios";

const PUSHER_BASE_URL = `https://api-${PUSHER_CLUSTER}.pusher.com/apps/${PUSHER_APP_ID}/events`;

export const triggerPusherEvent = async (channel, event, newMessage) => {
  try {
    const response = await axios.post(
      PUSHER_BASE_URL,
      {
        name: event,
        channel,
        data: JSON.stringify(newMessage),
      },
      {
        auth: {
          username: PUSHER_KEY,
          password: PUSHER_SECRET,
        },
      }
    );
    console.log("Event triggered successfully:", response.data);
  } catch (error) {
    console.error("Error triggering event:", error.message);
  }
};
