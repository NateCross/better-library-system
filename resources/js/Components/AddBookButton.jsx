import React from 'react'
import { Link } from '@inertiajs/inertia-react'

export default function AddBookButton() {
  return (
    <Link
      className='
        bg-red-700 
        border-red-700 
        hover:text-red-700
        text-white
        hover:bg-white
        px-6
        py-3
        font-bold
        text-xl
        border-2
        rounded-xl
        transition-all
        flex
        gap-1
        items-center
        min-w-[5rem]
      '
      href={route('books.index')}
    >
      Add Book
    </Link>
  )
}
