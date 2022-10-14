import React from 'react'
import { Link, Head } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LibraryDisplay from '@/Components/LibraryDisplay';

import AddBookButton from '@/Components/AddBookButton';

export default function Welcome({ auth, books }) {
  return (
    <>
      <AuthenticatedLayout
          auth={auth}
      >
        <Head title='Home' />

        { auth?.user?.id && 
          <div className='
            w-11/12
            flex
            mt-4
            items-center
            justify-end
          '>
            <AddBookButton /> 
          </div>
        }

        {
          books.length ? (
            <LibraryDisplay 
              auth={auth}
              books={books}
            />
          ) : (
            <div className="
              grid
              h-[85vh]
              place-items-center
            ">
              <h1
                className='
                  text-8xl
                  font-heavy
                  text-center
                  break-words
                  mx-9
                '
              >
                No books in library.
              </h1>
              <h1
                className='
                  text-8xl
                  font-heavy
                  text-center
                  break-words
                  mx-9
                '
              >
                Please register or login to add a book.
              </h1>
            </div>
          )
        }
      </AuthenticatedLayout>
    </>
  )
}
