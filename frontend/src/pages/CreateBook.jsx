import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios
            .post('http://localhost:5555/books', data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book Created Successfully', { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', { variant: 'error' });
                console.error('Error creating book:', error);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <BackButton />
                    <div className="mt-6">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                            Add New Book
                        </h1>
                        <p className="text-slate-600">Fill in the details to add a book to your collection</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-white/90">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Spinner />
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); handleSaveBook(); }} className="space-y-6">
                            {/* Title Input */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Book Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Enter book title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl transition-all duration-200 outline-none text-slate-700 placeholder:text-slate-400"
                                    required
                                />
                            </div>

                            {/* Author Input */}
                            <div>
                                <label htmlFor="author" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Author
                                </label>
                                <input
                                    id="author"
                                    type="text"
                                    placeholder="Enter author name"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="w-full border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl transition-all duration-200 outline-none text-slate-700 placeholder:text-slate-400"
                                    required
                                />
                            </div>

                            {/* Publish Year Input */}
                            <div>
                                <label htmlFor="publishYear" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Publish Year
                                </label>
                                <input
                                    id="publishYear"
                                    type="number"
                                    placeholder="Enter publish year"
                                    value={publishYear}
                                    onChange={(e) => setPublishYear(e.target.value)}
                                    className="w-full border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl transition-all duration-200 outline-none text-slate-700 placeholder:text-slate-400"
                                    required
                                    min="1000"
                                    max="2100"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : 'Save Book'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Helper Text */}
                <p className="text-center text-slate-500 text-sm mt-6">
                    All fields are required to create a new book entry
                </p>
            </div>
        </div>
    );
};

export default CreateBook;