import React from 'react'
import {cn} from "@/app/lib/utils"
import ChatInput from './chatinput'

const ChatUI = () => {
  return (

    // container
    <div className='w-10/12 flex justify-start '>

       <ChatInput></ChatInput>

    </div>
  )
}

export default ChatUI