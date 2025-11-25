import React, { useState } from 'react';
import { Users, User, LogIn } from 'lucide-react';

function TeamSetup({ onJoinTeam }) {
    const [teamCode, setTeamCode] = useState('');
    const [userName, setUserName] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!teamCode.trim()) {
            newErrors.teamCode = '請輸入團隊代碼';
        }

        if (!userName.trim()) {
            newErrors.userName = '請輸入您的名稱';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onJoinTeam(teamCode.trim(), userName.trim());
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-100 mb-2">
                            Team Todo
                        </h1>
                        <p className="text-gray-400">
                            加入您的團隊，開始協作管理任務
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="teamCode" className="block text-sm font-medium text-gray-300 mb-2">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    團隊代碼
                                </div>
                            </label>
                            <input
                                type="text"
                                id="teamCode"
                                className={`w-full px-4 py-2.5 bg-gray-900 border ${errors.teamCode ? 'border-red-600' : 'border-gray-700'
                                    } rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors`}
                                placeholder="例如：team-alpha"
                                value={teamCode}
                                onChange={(e) => {
                                    setTeamCode(e.target.value);
                                    if (errors.teamCode) {
                                        setErrors({ ...errors, teamCode: '' });
                                    }
                                }}
                            />
                            {errors.teamCode && (
                                <p className="mt-1 text-sm text-red-500">{errors.teamCode}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-300 mb-2">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    您的名稱
                                </div>
                            </label>
                            <input
                                type="text"
                                id="userName"
                                className={`w-full px-4 py-2.5 bg-gray-900 border ${errors.userName ? 'border-red-600' : 'border-gray-700'
                                    } rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors`}
                                placeholder="例如：張三"
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                    if (errors.userName) {
                                        setErrors({ ...errors, userName: '' });
                                    }
                                }}
                            />
                            {errors.userName && (
                                <p className="mt-1 text-sm text-red-500">{errors.userName}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <LogIn className="w-5 h-5" />
                            加入團隊
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <p className="text-sm text-gray-400 text-center">
                            💡 提示：同一團隊的成員使用相同的團隊代碼即可共享任務
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamSetup;
