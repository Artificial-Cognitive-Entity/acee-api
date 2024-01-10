'use client'
import React from 'react'
import { Input } from '@material-tailwind/react'

const InputField = () => {
    return (
        <>
            <div>
                <Input
                    crossOrigin
                    label="Email*"
                    labelProps={{ className: "mb-2 text-sm text-start text-grey-900" }}
                    id="email"
                    type="email"
                    placeholder="mail@yourorg.com"
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <Input
                    crossOrigin
                    label="Password*"
                    labelProps={{ className: "m-auto text-sm text-start text-grey-900" }}
                    id="password"
                    type="password"
                    placeholder="Enter a password"
                    className="flex items-center w-full px-5 py-4 mt-7 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                />
            </div>
        </>
    )
}

export default InputField