import admin, { ServiceAccount } from "firebase-admin";
import { Message } from "firebase-admin/messaging";

export const sendFCMNotification = async (data: Message) => {
  const serviceAccount: ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    ),
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  // 푸시 알림 전송
  const res = await admin.messaging().send(data);

  return res;
};
