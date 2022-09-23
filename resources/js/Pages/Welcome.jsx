import React from 'react'
import { Link, Head } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LibraryDisplay from '@/Components/LibraryDisplay';

export default function Welcome({ auth, books }) {
  console.log(books);
  return (
    <>
      <AuthenticatedLayout
          auth={auth}
          /* errors={} */
      >
        <Head title='Home' />

        {
          books.length ? (
            <LibraryDisplay 
              auth={auth}
              books={books}
            />
          ) : (
            <div className="
              grid
              h-[90vh]
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
                Please add a book to use.
              </h1>
            </div>
          )
        }
      </AuthenticatedLayout>
    </>
  )
}
