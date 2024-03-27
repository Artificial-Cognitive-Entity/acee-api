import React from 'react'
import VEHeader from './VEHeader'
import InputField from './Input'
//import Conditions from './Conditions'
import VEButton from './VEButton'

const VEForm = () => {
  return (
    <div className="container flex flex-col mx-auto rounded-lg pt-12 my-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10">
            <form className="flex flex-col w-full h-full pb-6 text-center rounded-3xl">
            <VEHeader></VEHeader>
            <InputField></InputField>
              
             <VEButton></VEButton>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}



export default VEForm

