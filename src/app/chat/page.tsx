import React from "react";
import Dash from "../components/dashboard/dash";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ChatPage = async () => {
  const session = await getServerSession(options);

  // redirect to login
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/chat");
  }

  return <>{session ? <Dash /> : <h1>you are not logged in</h1>}</>;
};

export default ChatPage;
