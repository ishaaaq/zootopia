import React, { createContext, useState, useContext, useEffect } from "react";
import { getConversations, getUserDetails } from "@/lib/AppWrite";
import { useGlobalContext } from "@/lib/global-provider";
const ConversationsContext = createContext();

export const useConversations = () => useContext(ConversationsContext);

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userDetails } = useGlobalContext();

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const fetchedConversations = await getConversations(userDetails?.$id);
      const resolvedConversations = await Promise.all(
        fetchedConversations.map(async (conversation) => {
          const otherParticipantId = conversation.participants.find(
            (id) => id !== userDetails.$id
          );

          const participantDetails = await getUserDetails(otherParticipantId);
          return {
            ...conversation,
            participantName:
              participantDetails.name || participantDetails.zooname,
            avatar: participantDetails.avatar,
          };
        })
      );
      setConversations(resolvedConversations);
    } catch (error) {
      console.log("Error fetching conversations:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <ConversationsContext.Provider
      value={{ conversations, fetchConversations, loading }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
