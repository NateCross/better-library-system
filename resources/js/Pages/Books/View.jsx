import React, { useState } from 'react'
import Modal from 'react-modal';

import { Head } from '@inertiajs/inertia-react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BorrowReturnButton } from '@/Components/BorrowReturnButton';
import { UpdateButton } from '@/Components/UpdateButton';
import { DeleteButton, DeleteModal } from '@/Components/DeleteButton';

function ReturnHomeButton() {
  return (
    <Link 
      className={`
        w-1.5
        h-1.5
        hover:text-red-700
        transition-all
        mb-4
      `}
      href='/'
      title='Home'
    >
      Click to go back to the home page.
    </Link>
  )
}

function BookDisplay({ book, authors, publisher, auth, toggleModal }) {
  const isHidden = auth?.user?.id ? 'opacity-100' : 'opacity-0';

  return (
    <div className="
      w-screen
      flex
      flex-col
      items-center
      justify-center
      my-6
    ">
      <div className='
        bg-red-700 
        w-5/6
        rounded-xl
        drop-shadow-xl
        px-5
        py-3
        text-white
      '>
        <div className='
          flex
          justify-between
          items-center
          gap-5
          break-words
        '>
          <h1 className='
            text-4xl
            font-bold
            w-3/4
          '
          >
            {book?.title}
          </h1>
          <div className='
            flex
            items-center
            gap-5
            mr-3
          '>
          <BorrowReturnButton book={book} className={isHidden} />
          <UpdateButton book={book} className={isHidden} />
          <DeleteButton 
            book={book} 
            className={isHidden} 
            toggleModal={toggleModal}
            onClick={() => toggleModal()}
          />
            
          </div>

        </div>
        <hr className='border-2 rounded-lg my-3' />
        <h2 className='my-1 text-xl'>Author: {authors[0].name}</h2>
        <h2 className='my-1 text-xl'>Publisher: {publisher.name}</h2>
        {book?.year_published && 
          <p className='my-1 text-lg'>Year Published: {book?.year_published}</p>}
        {book?.volume && 
          <p className='my-1 text-lg'>Volume: {book?.volume}</p>}

      </div>
    </div>
  )
}


export default function View({ auth, book, authors, publisher }) {
  Modal.setAppElement('#app');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [clickedId, setClickedId] = useState(0);
  
  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <>
      <AuthenticatedLayout
          auth={auth}
      >
        <Head title='Home' />
        { 
          book ? 
            <BookDisplay 
              book={book} 
              authors={authors} 
              publisher={publisher} 
              auth={auth}
              toggleModal={toggleModal}
            />
          : 
          <div>
            <h1>No book found.</h1>
            <ReturnHomeButton />
          </div>
        }
        <DeleteModal 
          modalIsOpen={modalIsOpen} 
          toggleModal={toggleModal}
          book={book}
        />
      </AuthenticatedLayout>
    </>
  )
}
