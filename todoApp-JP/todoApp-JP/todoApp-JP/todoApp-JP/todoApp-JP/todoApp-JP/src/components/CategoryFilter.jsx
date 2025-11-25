import React from 'react';
import { Filter } from 'lucide-react';
import { CATEGORIES } from '../utils/storage';

function CategoryFilter({ selectedCategory, onCategoryChange }) {
    return (
        <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-gray-400">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">篩選：</span>
            </div>

            <button
                onClick={() => onCategoryChange('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedCategory === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
            >
                全部
            </button>

            {Object.entries(CATEGORIES).map(([key, config]) => (
                <button
                    key={key}
                    onClick={() => onCategoryChange(key)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedCategory === key
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                >
                    {config.label}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;
