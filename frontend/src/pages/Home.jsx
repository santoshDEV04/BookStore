import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable.jsx';
import BooksCard from '../components/home/BooksCard.jsx';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Book Collection
              </h1>
              <p className="text-slate-600 text-sm">
                Manage and explore your library
              </p>
            </div>
            <Link
              to="/books/create"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <MdOutlineAddBox className="text-2xl" />
              <span>Add New Book</span>
            </Link>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-1.5 shadow-md w-fit">
            <button
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                showType === 'table'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              onClick={() => setShowType('table')}
            >
              Table View
            </button>
            <button
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                showType === 'card'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              onClick={() => setShowType('card')}
            >
              Card View
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-white/90">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Spinner />
            </div>
          ) : showType === 'card' ? (
            <BooksCard books={books} />
          ) : (
            <BooksTable books={books} />
          )}
        </div>

        {/* Footer Stats */}
        {!loading && (
          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Total Books: <span className="font-semibold text-slate-700">{books.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;