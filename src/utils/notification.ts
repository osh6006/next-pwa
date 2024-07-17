import { app } from "@/lib/firebase";
import { getMessaging, getToken } from "firebase/messaging";

export const requestNotificationPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("푸시 알림 권한이 허용됨");
      } else {
        console.log("푸시 알림 권한이 거부됨");
      }
    });
  }
};

export const sendPushNotification = (title: string, body: string) => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, {
        body,
        icon: "/icons/favicon/favicon-16x16.png",
      });
    });
  }
};

export const sendNotificationServer = async () => {
  const url = "/api/push"; // Replace with the actual endpoint if different

  const messaging = getMessaging(app);
  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  })
    .then(async (currentToken) => {
      return currentToken;
    })
    .catch((error) => {
      console.error(error);
    });

  const payload = {
    deviceToken: token,
    title: "PWA App 알림 테스트 입니다.",
    body: "알림을 확인해 주세요 !",
    icon: "https://i.pinimg.com/originals/b7/06/fa/b706fa17832e8854ee125404a655f0df.jpg",
    image: "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
    click_action: "http://localhost:3000/",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.success) {
      console.log("Notification sent successfully:", result.message);
    } else {
      console.log("Failed to send notification:", result.message);
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
