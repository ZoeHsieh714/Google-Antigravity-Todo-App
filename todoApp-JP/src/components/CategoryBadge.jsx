import React from 'react';
import { Briefcase, User as UserIcon, AlertCircle, Tag } from 'lucide-react';
import { CATEGORIES } from '../utils/storage';

function CategoryBadge({ category, size = 'md' }) {
    const config = CATEGORIES[category] || CATEGORIES.other;

    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-1',
        lg: 'text-base px-3 py-1.5'
    };

    const colorClasses = {
        purple: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
        cyan: 'bg-cyan-600/20 text-cyan-400 border-cyan-600/30',
        red: 'bg-red-600/20 text-red-400 border-red-600/30',
        gray: 'bg-gray-600/20 text-gray-400 border-gray-600/30'
    };

    const icons = {
        work: Briefcase,
        personal: UserIcon,
        urgent: AlertCircle,
        other: Tag
    };

    const Icon = icons[category] || Tag;

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sizeClasses[size]} ${colorClasses[config.color]}`}>
            <Icon className="w-3.5 h-3.5" />
            {config.label}
        </span>
    );
}

export default CategoryBadge;
