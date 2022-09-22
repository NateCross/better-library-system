import React from 'react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BookCreateUpdateForm from '@/Components/BookCreateUpdateForm';

import { useForm, Head } from '@inertiajs/inertia-react';

export default function Update({ auth, book }) {
  console.log(auth);
  const { data, setData, patch, processing, reset, errors } = useForm({
    title: book.title,
    author: book.authors[0].name,
    publisher: book.publisher.name,
    year_published: book.year_published,
    volume: book.volume,
  });

  const submit = (e) => {
    e.preventDefault();
    patch(route('books.update', book.id));
  }

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title='Edit a Book' />

      <BookCreateUpdateForm
        data={data}
        onSubmit={submit}
        setData={setData}
        processing={processing}
        errors={errors}
      />
    </AuthenticatedLayout>
  )
}
