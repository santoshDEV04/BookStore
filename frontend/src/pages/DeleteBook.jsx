import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { MdWarning, MdDeleteForever } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [loadingBook, setLoadingBook] = useState(true);

  useEffect(() => {
    setLoadingBook(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoadingBook(false);
      })
      .catch((error) => {
        console.error('Error loading book:', error);
        enqueueSnackbar('Failed to load book details', { variant: 'error' });
        setLoadingBook(false);
      });
  }, [id]);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting book', { variant: 'error' });
        console.error('Error deleting book:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <BackButton />
          <div className="mt-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Delete Book
            </h1>
            <p className="text-slate-600">This action cannot be undone</p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90">
          {loadingBook ? (
            <div className="flex items-center justify-center py-20">
              <Spinner />
            </div>
          ) : (
            <>
              {/* Warning Banner */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm animate-pulse">
                    <MdWarning className="text-4xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Warning: Permanent Deletion</h2>
                    <p className="text-red-50">This book will be permanently removed from your collection</p>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              {book && (
                <div className="p-8">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200 mb-6">
                    <p className="text-sm font-semibold text-slate-500 mb-3">You are about to delete:</p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-slate-500 font-semibold min-w-[100px]">Title:</span>
                        <span className="text-slate-800 font-bold text-lg">{book.title}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-slate-500 font-semibold min-w-[100px]">Author:</span>
                        <span className="text-slate-700">{book.author}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-slate-500 font-semibold min-w-[100px]">Year:</span>
                        <span className="text-slate-700">{book.publishYear}</span>
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Message */}
                  <div className="bg-slate-50 rounded-xl p-6 mb-6 border border-slate-200">
                    <p className="text-slate-700 text-center leading-relaxed">
                      Are you absolutely sure you want to delete this book?
                      <span className="block mt-2 font-semibold text-red-600">
                        This action cannot be undone.
                      </span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Spinner />
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleDeleteBook}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <MdDeleteForever className="text-2xl" />
                        <span>Yes, Delete Book</span>
                      </button>
                      <button
                        onClick={() => navigate('/')}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <AiOutlineClose className="text-xl" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Additional Warning */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <MdWarning className="text-red-500" />
            Make sure you have backed up any important information before deleting
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;