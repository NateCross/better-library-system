import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


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
  );
}
