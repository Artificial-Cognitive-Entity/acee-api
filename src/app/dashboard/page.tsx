import React from 'react'
import Dash from '../components/dashboard/dash'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth';



// dashboard to display content
const Dashboard = async () => {
  const session = await getServerSession(options)
  return (
    <>
      {session ? (<Dash />) : (<h1>you do not have access to this page</h1>)}

    </>);
};

export default Dashboard;
