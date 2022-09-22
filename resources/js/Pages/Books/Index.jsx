import React from 'react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

import { useForm, Head } from '@inertiajs/inertia-react';

function Index({ auth, books }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    author: '',
    publisher: '',
    year_published: '',
    volume: '',
  });
  console.log(books);

  const submit = (e) => {
    e.preventDefault();
    post(route('books.store'), { onSuccess: reset() });
  }

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title='Books' />

      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={submit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={data.title} onChange={e => setData('title', e.target.value)}/>

          <label htmlFor="author">Author</label>
          <input type="text" name="author" id="author" value={data.author} onChange={e => setData('author', e.target.value)}/>

          <label htmlFor="publisher">Publisher</label>
          <input type="text" name="publisher" id="publisher" value={data.publisher} onChange={e => setData('publisher', e.target.value)}/>

          <label htmlFor="year_published">Year Published</label>
          <input type="text" name="year_published" id="year_published" value={data.year_published} onChange={e => setData('year_published', e.target.value)}/>

          <label htmlFor="volume">Volume</label>
          <input type="text" name="volume" id="volume" value={data.volume} onChange={e => setData('volume', e.target.value)}/>
          {/* <textarea
            value={data.message}
            placeholder="What's on your mind?"
            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            onChange={e => setData('message', e.target.value)}
          ></textarea> */}
          <InputError message={errors.message} className="mt-2" />
          <PrimaryButton className="mt-4" disabled={processing}>Add Book</PrimaryButton>
        </form>
      </div>
    </AuthenticatedLayout>
  )
}

export default Index;