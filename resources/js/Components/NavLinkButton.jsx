import React from 'react'
import { Link } from '@inertiajs/inertia-react';

export default function NavLinkButton({ href, children }) {
  return (
    <Link
      href={href}
      className='
        ml-3
        rounded-md
        bg-white
        inline-flex 
        items-center 
        px-3
        py-2 
        text-sm 
        font-medium 
        text-gray-500
        hover:text-gray-700
        focus:outline-none 
        focus:text-gray-700 
        transition duration-150 ease-in-out'
    >
      {children}
    </Link>
  )
}
