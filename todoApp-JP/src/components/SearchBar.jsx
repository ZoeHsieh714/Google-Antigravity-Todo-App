import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="搜索任務名稱或日期..."
                className="block w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
            />
            {query && (
                <button
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                    <X className="h-5 w-5" />
                </button>
            )}
        </div>
    );
}

export default SearchBar;
