import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-teal-400 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                    : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-bold leading-5 text-white hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:border-gray-300 transition-all'
            }
        >
            {children}
        </Link>
    );
}
