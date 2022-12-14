import React from 'react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BookCreateUpdateForm from '@/Components/BookCreateUpdateForm';

import { useForm, Head } from '@inertiajs/inertia-react';

function Index({ auth }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    author: '',
    publisher: '',
    year_published: '',
    volume: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('books.store'), { onSuccess: reset() });
  }

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title='Add a Book' />

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

export default Index;