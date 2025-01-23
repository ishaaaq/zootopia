import React, { createContext, useContext, useState, useEffect } from "react";
import { databases, config } from "@/lib/AppWrite";
import { Query } from "react-native-appwrite";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children, userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await databases.listDocuments(
          config.database,
          config.notification,
          [Query.equal("userId", userId), Query.equal("isRead", false)]
        );
        setNotifications(res.documents);
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
        setError("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.isRead);

      const updatePromises = unreadNotifications.map((notification) =>
        databases.updateDocument(
          config.database,
          config.notification,
          notification.$id,
          { isRead: true }
        )
      );

      await Promise.all(updatePromises);

      // Update state locally
      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error("Error marking notifications as read:", error.message);
      setError("Failed to mark notifications as read.");
    }
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, markAllAsRead, loading, error }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
