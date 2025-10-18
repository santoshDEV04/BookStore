import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='group bg-white border-2 border-slate-200 rounded-2xl p-6 m-4 relative hover:shadow-2xl hover:border-blue-300 transition-all duration-300 ease-in-out transform hover:-translate-y-2'>
      {/* Gradient Overlay on Hover */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>

      {/* Content Container */}
      <div className='relative z-10'>
        {/* Year Badge */}
        <div className='absolute -top-3 -right-3'>
          <span className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-sm shadow-lg'>
            {book.publishYear}
          </span>
        </div>

        {/* Book ID - Hidden on hover for cleaner look */}
        <p className='text-slate-400 text-xs mb-4 font-mono truncate group-hover:opacity-0 transition-opacity duration-200'>
          ID: {book._id}
        </p>

        {/* Book Icon Header */}
        <div className='mb-6 flex items-center justify-center'>
          <div className='bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300'>
            <PiBookOpenTextLight className='text-blue-600 text-4xl' />
          </div>
        </div>

        {/* Book Details */}
        <div className='space-y-4 mb-6'>
          {/* Title */}
          <div className='text-center'>
            <h2 className='text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2'>
              {book.title}
            </h2>
          </div>

          {/* Author */}
          <div className='flex items-center justify-center gap-2 text-slate-600'>
            <BiUserCircle className='text-indigo-500 text-xl flex-shrink-0' />
            <p className='text-sm font-medium truncate'>{book.author}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-center items-center gap-2 pt-4 border-t-2 border-slate-100'>
          {/* Quick View Button */}
          <button
            onClick={() => setShowModal(true)}
            className='flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg transition-all duration-200 transform hover:scale-110 hover:shadow-md'
            title='Quick View'
          >
            <BiShow className='text-xl' />
          </button>

          {/* Details Button */}
          <Link
            to={`/books/details/${book._id}`}
            className='flex items-center justify-center w-10 h-10 bg-green-100 hover:bg-green-600 text-green-600 hover:text-white rounded-lg transition-all duration-200 transform hover:scale-110 hover:shadow-md'
            title='View Details'
          >
            <BsInfoCircle className='text-lg' />
          </Link>

          {/* Edit Button */}
          <Link
            to={`/books/edit/${book._id}`}
            className='flex items-center justify-center w-10 h-10 bg-amber-100 hover:bg-amber-500 text-amber-600 hover:text-white rounded-lg transition-all duration-200 transform hover:scale-110 hover:shadow-md'
            title='Edit Book'
          >
            <AiOutlineEdit className='text-lg' />
          </Link>

          {/* Delete Button */}
          <Link
            to={`/books/delete/${book._id}`}
            className='flex items-center justify-center w-10 h-10 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-all duration-200 transform hover:scale-110 hover:shadow-md'
            title='Delete Book'
          >
            <MdOutlineDelete className='text-lg' />
          </Link>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;