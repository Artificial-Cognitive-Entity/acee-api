'use client'
import React from 'react'
import { Checkbox } from '@material-tailwind/react'


const Conditions = () => {
    return (
        <div className="flex flex-row justify-between mb-8">
            <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                <Checkbox crossOrigin color ="blue-gray" label = "Keep me logged in" id="ripple-on" ripple={true}
                labelProps={ {className: "ml-3 text-sm font-normal text-grey-900"}}/>
            </label>
            <a
                href=""
                className="m-auto mr-4 text-sm font-medium text-purple-blue-500">
                Forget password?
            </a>
        </div>
    )
}

export default Conditions