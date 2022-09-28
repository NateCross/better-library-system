import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export function BorrowReturnButton({ book, className }) {
  const [isLoading, setIsLoading] = useState(false);

  return !book?.is_borrowed ? (
    <Link
      className={`
        min-w-[8.5%]
        lg:min-w-[12.5%]
        xl:min-w-[8.5%]
        border-green-500
        border-2
        text-white
        bg-green-500
        hover:text-green-500
        hover:bg-white
        transition-all
        ${className}
        rounded-lg
        px-4
        py-1
        text-center
      `}
      href={route('books.borrow', book?.id)}
      onClick={() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }}
      title='Borrow'
      method='patch'
      as='button'
      preserveScroll
    >
      {isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' /> : "Borrow"}
    </Link>
  ) : (
    <Link
      className={`
        min-w-[8.5%]
        lg:min-w-[12.5%]
        xl:min-w-[8.5%]
        border-yellow-500
        border-2
        text-white
        bg-yellow-500
        hover:text-yellow-500
        hover:bg-white
        transition-all
        ${className}
        rounded-lg
        px-4
        py-1
      `}
      href={route('books.borrow', book?.id)}
      onClick={() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }}
      title='Return'
      method='patch'
      as='button'
      preserveScroll
    >
      {isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' /> : "Return"}
    </Link>
  );
}
