import React from 'react'
import Dash from '../components/dashboard/dash'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


const ChatPage = async () => {
  const session = await getServerSession(options);

  // redirect to login
  if(!session)
  {
    redirect('/api/auth/signin?callbackUrl=/dashboard')
  }

  const user = session.user
  return (
    <>
      {session ? (<Dash role={user.role} id={user.id} group={user.group} email={user.email} />) : (<h1>you do not have access to this page</h1>)}

    </>);
};

export default ChatPage;
