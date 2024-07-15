import { sendFCMNotification } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = await sendFCMNotification(messages)
    .then((result) => result)
    .catch((error) => console.log(error));

  return Response.json(result);
}
