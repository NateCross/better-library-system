import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCancel } from '@fortawesome/free-solid-svg-icons';

export function DeleteModal({ modalIsOpen, toggleModal, book, onAfterClose }) {
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
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      contentLabel="Delete this Book?"
      onRequestClose={toggleModal}
      onAfterClose={onAfterClose}
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
          href={route('books.destroy', book?.id)}
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
  )
}

export function DeleteButton({ book, className, toggleModal, onClick }) {
  return (
    <button
      className={`
        w-1.5
        h-1.5
        mb-4
        hover:text-red-500
        transition-all
        z-50
        ${className}
      `}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}
