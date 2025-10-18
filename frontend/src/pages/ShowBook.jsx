import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { MdCalendarToday, MdUpdate } from 'react-icons/md';
import { AiOutlineFieldNumber } from 'react-icons/ai';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const InfoRow = ({ icon: Icon, label, value, iconColor }) => (
    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
      <div className={`${iconColor} bg-white p-3 rounded-lg shadow-sm`}>
        <Icon className="text-2xl" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-500 mb-1">{label}</p>
        <p className="text-slate-800 font-medium break-words">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <BackButton />
          <div className="mt-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Book Details
            </h1>
            <p className="text-slate-600">View complete information about this book</p>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className=" rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-white/90">
            {/* Book Title Hero Section */}
            <div className="mb-3 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-1 mb-1">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                  <PiBookOpenTextLight className="text-white text-3xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">{book.title}</h2>
                  <p className="text-slate-500 text-sm mt-1">Published in {book.publishYear}</p>
                </div>
              </div>
            </div>

            {/* Book Information Grid */}
            <div className="space-y-4">
              <InfoRow
                icon={AiOutlineFieldNumber}
                label="Book ID"
                value={book._id}
                iconColor="text-blue-600"
              />

              <InfoRow
                icon={BiUserCircle}
                label="Author"
                value={book.author}
                iconColor="text-indigo-600"
              />

              <InfoRow
                icon={MdCalendarToday}
                label="Publish Year"
                value={book.publishYear}
                iconColor="text-purple-600"
              />

              <InfoRow
                icon={MdCalendarToday}
                label="Created At"
                value={book.createdAt ? new Date(book.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'N/A'}
                iconColor="text-green-600"
              />

              <InfoRow
                icon={MdUpdate}
                label="Last Updated"
                value={book.updatedAt ? new Date(book.updatedAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'N/A'}
                iconColor="text-orange-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;