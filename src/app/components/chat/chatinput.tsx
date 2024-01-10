// using typescript component
'use client'
import {FC, HTMLAttributes, useState} from 'react'
import React from 'react'
import {cn} from '@/app/lib/utils'
import TextareaAutosize  from 'react-textarea-autosize'
import { useMutation } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { Message } from '@/app/lib/validators/message'

// turn ChatInput Component into a HTML DIV
interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({className, ...props})=> {

    const [userInput, setUserInput]  = useState<string>('')

    //react query stuff

    const {mutate: sendMessage, isPending} = useMutation({
      mutationFn: async (message: Message) =>
      {
        const response = await fetch('../../api/message',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application.json'
          },
          body: JSON.stringify({messages: 'hello'})
        })

        return response.body

      },
      onSuccess : () => {
        console.log("success")
      }
    })


  return (
    <div {...props} className={cn('border-t border-sinc-300', className)}>

        {/* field input, sized is based on text */}
        <div className = 'relative mt-5 flex-1 overflow-hidden rounded-lg border-none outline-none '>
            <TextareaAutosize
            rows={2}
            maxRows={4}
            autoFocus
            value = {userInput}

            // if user hit enter, send message for processing
            onKeyDown={(e) =>
            {
              if(e.key === 'Enter' && !e.shiftKey)
              {
                e.preventDefault()

                const message: Message = {
                  // generates unqiue identifier
                  id: nanoid(), 
                  isUserInput: true,
                  text: userInput
                  
                }

                sendMessage(message)
              }
            }}
            onChange = {(e) => setUserInput(e.target.value)}
            placeholder='Write a message'
            className = 'peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-sinc-100 py-1.5 text-gray-900 focus:run-0 text-sm'
            >


            </TextareaAutosize>




        </div>
    </div>
  )
}

export default ChatInput
