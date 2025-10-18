import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { MdCalendarToday } from 'react-icons/md';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed bg-black/70 backdrop-blur-sm top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center p-4 animate-fadeIn'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp'
      >
        {/* Header with gradient background */}
        <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6 relative'>
          <button
            onClick={onClose}
            className='absolute right-4 top-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-200 backdrop-blur-sm'
          >
            <AiOutlineClose className='text-2xl text-white' />
          </button>

          <div className='flex items-center gap-3 text-white'>
            <div className='bg-white/20 p-3 rounded-xl backdrop-blur-sm'>
              <PiBookOpenTextLight className='text-3xl' />
            </div>
            <div>
              <h2 className='text-2xl font-bold'>{book.title}</h2>
              <p className='text-blue-100 text-sm mt-1'>Book Information</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='p-6 max-h-[70vh] overflow-y-auto'>
          {/* Publish Year Badge */}
          <div className='mb-6'>
            <span className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm'>
              <MdCalendarToday />
              Published in {book.publishYear}
            </span>
          </div>

          {/* Author */}
          <div className='flex items-center gap-3 mb-6 p-4 bg-slate-50 rounded-xl'>
            <div className='bg-white p-3 rounded-lg shadow-sm'>
              <BiUserCircle className='text-indigo-600 text-2xl' />
            </div>
            <div>
              <p className='text-sm font-semibold text-slate-500'>Author</p>
              <p className='text-slate-800 font-medium text-lg'>{book.author}</p>
            </div>
          </div>

          {/* Book ID */}
          <div className='mb-6 p-4 bg-slate-50 rounded-xl'>
            <p className='text-sm font-semibold text-slate-500 mb-2'>Book ID</p>
            <p className='text-slate-600 font-mono text-sm break-all'>{book._id}</p>
          </div>

          {/* Description or Additional Info */}
          <div className='p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100'>
            <h3 className='text-lg font-bold text-slate-800 mb-3'>About this book</h3>
            <p className='text-slate-600 leading-relaxed'>
              This is a wonderful addition to our collection. The book offers valuable insights
              and has been carefully curated for readers who appreciate quality literature.
              Whether you're a casual reader or a devoted bibliophile, this title promises
              an engaging experience that will captivate your imagination.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className='bg-slate-50 px-6 py-4 border-t border-slate-200'>
          <button
            onClick={onClose}
            className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;