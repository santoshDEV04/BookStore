import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">No</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 max-md:hidden">
                Publish Year
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book, index) => (
              <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {book.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-md:hidden">
                  {book.author}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-green-600 text-2xl hover:text-green-700 transition-colors" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-blue-600 text-2xl hover:text-blue-700 transition-colors" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-red-600 text-2xl hover:text-red-700 transition-colors" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default BooksTable
