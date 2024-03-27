import React from 'react'
import PRHeader from './PRHeader'
import InputField from './Input'
//import Conditions from './Conditions'
import PRButton from './PRButton'

const PRForm = () => {
  return (
    <div className="container flex flex-col mx-auto rounded-lg pt-12 my-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10">
            <form className="flex flex-col w-full h-full pb-6 text-center rounded-3xl">
            <PRHeader></PRHeader>
            <InputField></InputField>
              
             <PRButton></PRButton>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}



export default PRForm

