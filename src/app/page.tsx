"use client";

import { app, setTokenHandler } from "@/lib/firebase";
import { sendPushNotification } from "@/utils/notification";
import { getMessaging, getToken } from "firebase/messaging";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showToken, setShowToken] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

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

  const copyToClipboard = async () => {
    if (!showToken) return;

    try {
      await navigator.clipboard.writeText(showToken);
      setCopySuccess(true);

      // 3초 후에 상태 초기화
      setTimeout(() => {
        setCopySuccess(false);
      }, 800);
    } catch (err) {
      setCopySuccess(false);

      // 3초 후에 상태 초기화
      setTimeout(() => {
        setCopySuccess(false);
      }, 800);
    }
  };

  return (
    <main className="flex flex-col max-w-[400px] mx-auto w-screen h-screen overflow-hidden items-center justify-center p-10">
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
      <h1 className="mt-4 text-xl text-center break-keep font-bold">
        PWA Test App 입니다.{" "}
      </h1>
      <button
        className="mt-4 border p-3 rounded-md cursor-pointer select-none z-40"
        onClick={handlePush}
      >
        푸시 알림 보내기
      </button>
      <button
        className="mt-4 border p-3 rounded-md cursor-pointer select-none z-40"
        onClick={handlePermission}
      >
        알람 허용 버튼
      </button>

      <button
        className="mt-4 border p-3 rounded-md cursor-pointer select-none z-40"
        onClick={handleGetToken}
      >
        등록 토큰 받기
      </button>
      <div className="text-center">
        <p className="mt-4">아래의 토큰을 개발자에게 보내주세요</p>
        <p className="text-xs mt-4 break-words">
          {!showToken ? "토큰 없음" : showToken}
        </p>
        {!showToken ? null : (
          <button
            onClick={copyToClipboard}
            className="bg-green-900 p-2 rounded-md mt-2"
            disabled={copySuccess}
          >
            {copySuccess ? "복사 성공!" : "코드 복사"}
          </button>
        )}
      </div>
    </main>
  );
}
