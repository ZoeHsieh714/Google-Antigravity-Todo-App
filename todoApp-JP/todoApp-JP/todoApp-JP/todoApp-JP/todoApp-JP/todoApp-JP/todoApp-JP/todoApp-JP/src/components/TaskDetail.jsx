import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { getTasks, addTask, updateTask, CATEGORIES } from '../utils/storage';

function TaskDetail({ teamCode, taskId, onBack }) {
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('other');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (taskId) {
            const tasks = getTasks(teamCode);
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                setTaskName(task.name);
                setDueDate(task.due_date);
                setCategory(task.category || 'other');
            }
        }
    }, [teamCode, taskId]);

    const validate = () => {
        const newErrors = {};

        if (!taskName.trim()) {
            newErrors.taskName = '請輸入任務名稱';
        }

        if (!dueDate) {
            newErrors.dueDate = '請選擇期限日期';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            if (taskId) {
                updateTask(teamCode, taskId, {
                    name: taskName.trim(),
                    due_date: dueDate,
                    category
                });
            } else {
                addTask(teamCode, {
                    name: taskName.trim(),
                    due_date: dueDate,
                    category
                });
            }

            onBack();
        } catch (error) {
            console.error('Error saving task:', error);
            setErrors({ submit: '保存失敗，請重試' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-8 max-w-2xl mx-auto">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-100">
                        {taskId ? '編輯任務' : '新增任務'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="taskName" className="block text-sm font-medium text-gray-300 mb-2">
                            任務名稱 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="taskName"
                            className={`w-full px-4 py-2.5 bg-gray-900 border ${errors.taskName ? 'border-red-600' : 'border-gray-700'
                                } rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors`}
                            placeholder="輸入任務名稱"
                            value={taskName}
                            onChange={(e) => {
                                setTaskName(e.target.value);
                                if (errors.taskName) {
                                    setErrors({ ...errors, taskName: '' });
                                }
                            }}
                            autoFocus
                        />
                        {errors.taskName && (
                            <p className="mt-1 text-sm text-red-500">{errors.taskName}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-2">
                            期限日期 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            id="dueDate"
                            className={`w-full px-4 py-2.5 bg-gray-900 border ${errors.dueDate ? 'border-red-600' : 'border-gray-700'
                                } rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors`}
                            value={dueDate}
                            onChange={(e) => {
                                setDueDate(e.target.value);
                                if (errors.dueDate) {
                                    setErrors({ ...errors, dueDate: '' });
                                }
                            }}
                        />
                        {errors.dueDate && (
                            <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                            分類
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                        >
                            {Object.entries(CATEGORIES).map(([key, config]) => (
                                <option key={key} value={key}>
                                    {config.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {errors.submit && (
                        <div className="p-4 bg-red-600/20 border border-red-600/30 rounded-lg text-red-400 text-sm">
                            {errors.submit}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onBack}
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <X className="w-5 h-5" />
                            取消
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    保存中...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    {taskId ? '更新任務' : '創建任務'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskDetail;
