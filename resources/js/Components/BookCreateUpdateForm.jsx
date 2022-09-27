import React from 'react'

import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

import { Link } from '@inertiajs/inertia-react';

export default function BookCreateUpdateForm({
  data,
  onSubmit,
  setData,
  processing,
  errors,
}) {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title">Title*</label>
          <input className="mb-3" type="text" name="title" id="title" value={data.title} onChange={e => setData('title', e.target.value)}/>
          <InputError message={errors.title} className="mt-2" />

          <label htmlFor="author">Author*</label>
          <input className="mb-3" type="text" name="author" id="author" value={data.author} onChange={e => setData('author', e.target.value)}/>
          <InputError message={errors.author} className="mt-2" />

          <label htmlFor="publisher">Publisher*</label>
          <input className="mb-3" type="text" name="publisher" id="publisher" value={data.publisher} onChange={e => setData('publisher', e.target.value)}/>
          <InputError message={errors.publisher} className="mt-2" />

          <label htmlFor="year_published">Year Published</label>
          <input className="mb-3" type="text" name="year_published" id="year_published" value={data.year_published} onChange={e => setData('year_published', e.target.value)}/>
          <InputError message={errors.year_published} className="mt-2" />

          <label htmlFor="volume">Volume</label>
          <input className="mb-3" type="text" name="volume" id="volume" value={data.volume} onChange={e => setData('volume', e.target.value)}/>
          <InputError message={errors.message} className="mt-2" />
        </div>

        <div
          className='
            flex
            justify-between
            mt-2
          '
        >
          <button
            className='
              px-4
              py-2
              bg-blue-500
              text-white
              border-2
              border-blue-500
              hover:text-blue-500
              hover:bg-white
              rounded-lg
              font-bold
              transition-all
            '
            disabled={processing}
            type='submit'
          >
          { processing ? "Saving..." : "Save Book"}
          </button>
          <Link
            className='
              px-4
              py-2
              bg-gray-500
              text-white
              border-2
              border-gray-500
              hover:text-gray-500
              hover:bg-white
              rounded-lg
              font-bold
              transition-all
            '
            href='/'
          >
            Back to Library
          </Link>
        </div>
      </form>
    </div>
  )
}
