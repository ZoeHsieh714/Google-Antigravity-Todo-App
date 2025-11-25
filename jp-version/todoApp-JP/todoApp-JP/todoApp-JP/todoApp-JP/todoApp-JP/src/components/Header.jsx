import React from 'react';
import { Users, User, LogOut } from 'lucide-react';
import NotificationBell from './NotificationBell';

function Header({ teamCode, userName, onSwitchTeam, tasks = [] }) {
    return (
        <header className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-100">
                            Team Todo
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg text-sm font-medium">
                                <Users className="w-4 h-4" />
                                <span>{teamCode}</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium">
                                <User className="w-4 h-4" />
                                <span>{userName}</span>
                            </div>
                        </div>

                        <NotificationBell tasks={tasks} />

                        <button
                            onClick={onSwitchTeam}
                            className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-gray-100 hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
                            title="切換團隊"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">切換團隊</span>
                        </button>
                    </div>
                </div>

                {/* Mobile team info */}
                <div className="sm:hidden pb-3 flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg text-sm font-medium">
                        <Users className="w-4 h-4" />
                        <span>{teamCode}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium">
                        <User className="w-4 h-4" />
                        <span>{userName}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
