import React, { useState, useEffect } from 'react'
import { Link } from '@inertiajs/inertia-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export function LibraryCard(book, index, auth) {
  const isHidden = auth?.user?.id ? 'opacity-100' : 'opacity-0';

  return (
    <li 
      key={index}
      className="
        flex
        flex-row
        gap-7
        bg-white
        text-black
        rounded-lg
        px-5
        py-3
        my-2
      "
    >
      <h3 className='w-1/3'>{book.title}</h3>
      <div className='w-1/5'>{book.authors[0].name}</div>
      <div className='w-1/5'>{book.publisher.name}</div>
      <div className='w-1/6'>{book.year_published}</div>
      <div className='w-1/6'>{book.volume}</div>
      <UpdateButton book={book} className={isHidden} />
      <DeleteButton book={book} className={isHidden} />
    </li>
  )
}

export function UpdateButton({ book, className }) {
  return (
    <Link 
      className={`
        w-1.5
        h-1.5
        hover:text-amber-500
        transition-all
        ${className}
      `}
      href={`/update/${book.id}`}
      title='Edit Details'
    >
      <FontAwesomeIcon icon={faEdit} />
    </Link>
  )
}

export function DeleteButton({ book, className }) {
  return (
    <Link 
      className={`
        w-1.5
        h-1.5
        hover:text-red-500
        transition-all
        ${className}
      `}
      href={route('books.destroy', book.id)}
      method="delete"
      as='button'
      title='Delete'
    >
      <FontAwesomeIcon icon={faTrash} />
    </Link>
  )
}

export default function ({ auth, books }) {
  return (
    <div className="
      w-100
      grid
      place-items-center
      my-8
    ">
      <div className="
      text-black
        flex
        flex-nowrap
        gap-7
        w-5/6
        items-center
        justify-center
        font-extrabold
        px-7
      ">
        <h2 className='w-[30%] mr-[2.5%]'>Title</h2>
        <h3 className='w-1/5'>Author(s)</h3>
        <h3 className='w-1/5'>Publisher</h3>
        <h3 className='w-1/6'>Year Published</h3>
        <h3 className='w-1/4'>Volume</h3>
      </div>
      <ul className='
        bg-red-700 
        w-5/6
        rounded-xl
        drop-shadow-xl
        px-3
        py-1
        text-white
      '>
        {books.map((bk, index) => LibraryCard(bk, index, auth))}
      </ul>
    </div>
  )
}
