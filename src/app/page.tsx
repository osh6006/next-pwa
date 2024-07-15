"use client";

import { app, setTokenHandler } from "@/lib/firebase";
import { sendPushNotification } from "@/utils/notification";
import { getMessaging, getToken } from "firebase/messaging";
import {
  BellPlusIcon,
  BellRingIcon,
  ClipboardCheckIcon,
  ClipboardIcon,
  ScanTextIcon,
} from "lucide-react";
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

      <div className="space-y-5 py-8 flex flex-col">
        <button
          onClick={handlePush}
          type="button"
          className="text-gray-900 gap-x-2 justify-center bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 "
        >
          <BellRingIcon size={18} />
          푸시 알림 보내기
        </button>
        <button
          onClick={handlePermission}
          type="button"
          className="text-gray-900 gap-x-2 justify-center bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
        >
          <BellPlusIcon size={18} />
          알람 허용 버튼
        </button>
        <button
          onClick={handleGetToken}
          type="button"
          className="text-gray-900 gap-x-2 justify-center bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
        >
          <ScanTextIcon size={18} />
          등록 토큰 받기
        </button>
      </div>

      <div className="text-center">
        <p className="mt-4">아래의 토큰을 개발자에게 보내주세요</p>
        <p className="text-xs mt-4 break-words">
          {!showToken
            ? "토큰이 없습니다 토큰 받기 버튼을 클릭하세요"
            : showToken}
        </p>
        {!showToken ? null : (
          <button
            onClick={copyToClipboard}
            type="button"
            className="text-gray-900 my-2 gap-x-2 justify-center bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-green-700"
          >
            {copySuccess ? (
              <ClipboardCheckIcon size={18} />
            ) : (
              <ClipboardIcon size={18} />
            )}
            {copySuccess ? "복사 성공!" : "코드 복사"}
          </button>
        )}
      </div>
    </main>
  );
}
