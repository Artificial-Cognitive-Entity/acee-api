import React from 'react'

const Sidebar = () => {
    return (
           <>
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-45 min-h-full bg-base-200 text-base-content ">
                {/* Sidebar content here */}
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
            </ul>
            </>
    )
}

export default Sidebar