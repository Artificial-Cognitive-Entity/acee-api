import React from "react";
import Dash from "../components/dashboard/dash";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import type { User } from "next/auth";


// dashboard to display content
const Dashboard = async () => {

  const session = await getServerSession(options);

  // redirect to login
  if(!session)
  {
    redirect('/api/auth/signin?callbackUrl=/dashboard')
  }

  const user = session.user

  return (
    <><Dash role={user.role} id={user.id} group={user.group} email={user.email} /> </>
  );
};

export default Dashboard;
