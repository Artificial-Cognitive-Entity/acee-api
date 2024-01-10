import React from 'react'
import Sidebar from '../navigation/sidebar/sidebar'
import Buttons from './buttons'
import ChatUI from '../chat/chatui'
import Providers from '../chat/providers'

const Dash = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Providers>
          <ChatUI></ChatUI>
        </Providers>

        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div>
      <div className="drawer-side">
        <Sidebar></Sidebar>
      </div>
    </div>
  )
}

export default Dash