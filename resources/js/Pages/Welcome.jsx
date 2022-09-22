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
          // header={<h2 className="font-semibold text-xl text-white-800 leading-tight">Library</h2>}
      >
        <Head title='Home' />

        <LibraryDisplay 
          auth={auth}
          books={books}
        />
      </AuthenticatedLayout>
    </>
  )
}
