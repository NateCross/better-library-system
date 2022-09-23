import React, { useState, useEffect } from 'react'
import { Link } from '@inertiajs/inertia-react';
import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCancel, faLock } from '@fortawesome/free-solid-svg-icons';

export function LibraryCard(
  book, 
  index, 
  auth, 
  toggleModal,
  setClickedId,
) {
  const isHidden = auth?.user?.id ? 'opacity-100' : 'opacity-0';

  return (
    <li 
      key={index}
      className="
        flex
        flex-row
        break-words
        items-center
        gap-7
        bg-white
        text-black
        rounded-lg
        px-5
        py-3
        my-2
      "
    >
      <h3 className='w-[27.5%] min-w-[27.5%]'>{book.title}</h3>
      <div className='w-[15%] min-w-[15%]'>{book.authors[0].name}</div>
      <div className='w-1/5 min-w-[20%]'>{book.publisher.name}</div>
      <div className='w-1/12'>{book.year_published}</div>
      <div className='w-[3%]'>{book.volume}</div>
      <BorrowReturnButton book={book} className={isHidden} />
      <UpdateButton book={book} className={isHidden} />
      <DeleteButton 
        book={book} 
        className={isHidden} 
        toggleModal={toggleModal} 
        setClickedId={setClickedId}
      />
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
        mb-4
        ${className}
      `}
      href={`/update/${book.id}`}
      title='Edit Details'
    >
      <FontAwesomeIcon icon={faEdit} />
    </Link>
  )
}

export function DeleteButton({ book, className, toggleModal, setClickedId }) {
  return (
    <button 
      className={`
        w-1.5
        h-1.5
        mb-4
        hover:text-red-500
        transition-all
        ${className}
      `}
      onClick={() => setClickedId(book?.id) || toggleModal()}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  )
}

export function BorrowReturnButton({ book, className }) {
  return !book?.is_borrowed ? (
    <Link 
      className={`
        min-w-[8.5%]
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
      title='Borrow'
      method='patch'
      as='button'
    >
      Borrow
    </Link>
  ) : (
    <Link 
      className={`
        min-w-[8.5%]
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
      title='Return'
      method='patch'
      as='button'
    >
      Return
    </Link>
  )
}

export default function ({ auth, books }) {
  Modal.setAppElement('#app');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clickedId, setClickedId] = useState(0);
  
  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  const deleteModalCustomStyle = {
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50vw',
      height: '25vh',
      opacity: '1',
      borderRadius: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(2px)',
    },
  }

  return (
    <div className="
      w-screen
      flex
      flex-col
      items-center
      justify-center
      my-2
    ">
      <div className="
        flex
        justify-end
        my-4
        w-5/6
      ">
        <Link
          className={`
            ${auth?.user?.id ? 'bg-red-700 border-red-700 hover:text-red-700' 
            : 'bg-gray-500 border-gray-500 hover:text-gray-500' }
            text-white
            hover:bg-white
            px-6
            py-3
            font-bold
            text-xl
            border-2
            rounded-xl
            transition-all
            flex
            gap-1
            items-center
            min-w-[5rem]
          `}
          href={route('books.index')}
        >
          {!auth?.user?.id && <FontAwesomeIcon icon={faLock} />}
          Add Book
        </Link>
      </div>
      <div className="
      text-black
        flex
        flex-nowrap
        w-5/6
        items-center
        justify-center
        font-extrabold
        px-7
      ">
        <h2 className='w-[30%] mr-[3.3%]'>Title</h2>
        <h3 className='w-1/5'>Author(s)</h3>
        <h3 className='w-[17%]'>Publisher</h3>
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
        {books.map((bk, index) => LibraryCard(bk, index, auth, toggleModal, setClickedId))}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        contentLabel="Delete this Book?"
        onRequestClose={toggleModal}
        onAfterClose={() => setClickedId(0)}
        style={deleteModalCustomStyle}
        closeTimeoutMS={250}
      >
        <h1
          className='
            flex
            flex-column
            align-center
            justify-center
            text-3xl
            font-bold
          '
        >
          Do you wish to delete this book?
        </h1>
        <div className="
          flex
          justify-evenly
          w-full
        ">
          <Link 
            className='
              text-white
              text-lg
              border-2
              border-red-500
              bg-red-500
              hover:text-red-500
              hover:bg-white
              transition-all
              rounded-md
              px-4
              py-2
            '
            href={route('books.destroy', clickedId)}
            method="delete"
            as='button'
            title='Delete'
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className='ml-1'>
              Delete
            </span>
          </Link>
          <button 
            onClick={toggleModal}
            className='
              text-white
              text-lg
              border-2
              border-black
              bg-black
              hover:text-black
              hover:bg-white
              transition-all
              rounded-md
              px-4
              py-2
            '
          >
            <FontAwesomeIcon icon={faCancel} />
            <span className='ml-1'>
              Cancel
            </span>
          </button>
        </div>
      </Modal>
    </div>
  )
}