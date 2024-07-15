"use client";

import { app, setTokenHandler } from "@/lib/firebase";
import { sendPushNotification } from "@/utils/notification";
import { getMessaging, getToken } from "firebase/messaging";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showToken, setShowToken] = useState("");

  // 푸시 알림 테스트
  const handlePush = () => {
    sendPushNotification("테스트 알림 입니다.", "알림을 확인해 보세요");
  };

  const handlePermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        // 푸시 거부됐을 때 처리할 내용
        console.log("푸시 거부됨");
      } else {
        // 푸시 승인됐을 때 처리할 내용
        console.log("푸시 승인됨");
      }
    });
  };

  const handleGetToken = async () => {
    const messaging = getMessaging(app);
    await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    })
      .then(async (currentToken) => {
        if (!currentToken) {
          // 토큰 생성 불가시 처리할 내용, 주로 브라우저 푸시 허용이 안된 경우에 해당한다.
        } else {
          // 토큰을 받았다면 여기서 DB에 저장하면 됩니다.
          console.log(currentToken);
          setShowToken(currentToken);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="flex min-h-dvh max-w-[460px] mx-auto border-x flex-col items-center justify-center p-24">
      <div className="flex-col relative z-[-1] flex place-items-center before:absolute before:h-[100px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <h1 className="mt-20 text-xl text-center break-keep font-bold">
          PWA Test App 입니다.{" "}
        </h1>
      </div>
      <button
        className="mt-10 border p-3 rounded-md cursor-pointer select-none z-40"
        onClick={handlePush}
      >
        푸시 알림 보내기
      </button>
      <button
        className="mt-10 border p-3 rounded-md cursor-pointer select-none z-40"
        onClick={handlePermission}
      >
        알람 허용 버튼
      </button>

      <button
        className="mt-10 border p-3 rounded-md cursor-pointer select-none z-40"
        onClick={handleGetToken}
      >
        등록 토큰 받기
      </button>
      <div className="break-keep text-center ">
        <p className="mt-4">아래의 개발자에게 토큰을 보내주세요</p>
        <p className="text-xs mt-4">{!showToken ? "토큰 없음" : showToken}</p>
      </div>
    </main>
  );
}
