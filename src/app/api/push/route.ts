import { sendFCMNotification } from "@/lib/firebase-admin";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { deviceToken, title, body, icon, image, click_action } = reqBody;

  const message = {
    token: deviceToken,
    data: {
      title,
      body,
      icon,
      image,
      click_action,
    },
  };

  console.log("🚀🚀🚀 FCM Send Message 🚀🚀🚀\n", message);

  //단일
  try {
    await sendFCMNotification(message);
    return NextResponse.json({ success: true, message: "전송완료" });
  } catch (error: any) {
    console.log("[ERROR] : ", error);
    return NextResponse.json({ success: false, message: "전송실패" });
  }
}
