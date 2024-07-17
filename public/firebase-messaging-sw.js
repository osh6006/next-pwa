importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAU-3DDFk6KYvXV-dThfTmp_DGMB1INvTk",
  authDomain: "fcm-test-4acae.firebaseapp.com",
  projectId: "fcm-test-4acae",
  storageBucket: "fcm-test-4acae.appspot.com",
  messagingSenderId: "1079642239277",
  appId: "1:1079642239277:web:7b3021ceced429eb13e3a4",
});

const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );

//   const link = payload.fcmOptions?.link || payload.data?.link;

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/favicon.ico",
//     image: "/vercel.svg",
//     data: {
//       url: link,
//     },
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// 클릭 이벤트 처리
// 알림을 클릭하면 사이트로 이동한다.
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  // 클라이언트에 해당 사이트가 열려있는지 체크
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then(function (windowClients) {
      const url = event.notification.data.url;

      if (!url) return;

      for (const client of windowClients) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }

      if (windowClients.openWindow) {
        return windowClients.openWindow(url);
      }
    });

  event.waitUntil(promiseChain);
});

// self.addEventListener("push", function (event) {
//   if (event.data) {
//     // 알림 메세지일 경우엔 event.data.json().notification;
//     const data = event.data.json().notification;
//     const options = {
//       data: {
//         body: data.body,
//         icon: data.image,
//         image: data.image,
//         click_action: "http://localhost:3000/", // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
//       },
//     };

//     event.waitUntil(self.registration.showNotification(data.title, options));
//   } else {
//     console.log("This push event has no data.");
//   }
// });

// // 클릭 이벤트 처리
// // 알림을 클릭하면 사이트로 이동한다.
// self.addEventListener("notificationclick", function (event) {
//   event.preventDefault();
//   // 알림창 닫기
//   event.notification.close();

//   // 이동할 url
//   // 아래의 event.notification.data는 위의 푸시 이벤트를 한 번 거쳐서 전달 받은 options.data에 해당한다.
//   // api에 직접 전달한 데이터와 혼동 주의
//   const urlToOpen = event.notification.data.click_action;

//   // 클라이언트에 해당 사이트가 열려있는지 체크
//   const promiseChain = clients
//     .matchAll({
//       type: "window",
//       includeUncontrolled: true,
//     })
//     .then(function (windowClients) {
//       let matchingClient = null;

//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i];
//         if (windowClient.url.includes(urlToOpen)) {
//           matchingClient = windowClient;
//           break;
//         }
//       }

//       // 열려있다면 focus, 아니면 새로 open
//       if (matchingClient) {
//         return matchingClient.focus();
//       } else {
//         return clients.openWindow(urlToOpen);
//       }
//     });

//   event.waitUntil(promiseChain);
// });
