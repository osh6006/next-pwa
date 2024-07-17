"use client";
import useFcmToken from "@/hooks/useFCMToken";
import { app } from "@/lib/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function FcmTokenComp() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(app);
        const unsubscribe = onMessage(messaging, (payload) => {
          console.log("Foreground push notification received:", payload);
          toast(
            <div className="">
              <h3 className="font-semibold ">{payload.notification?.title}</h3>
              <p className="text-sm mt-2">{payload.notification?.body}</p>
            </div>
          );
        });
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null; // This component is primarily for handling foreground notifications
}
