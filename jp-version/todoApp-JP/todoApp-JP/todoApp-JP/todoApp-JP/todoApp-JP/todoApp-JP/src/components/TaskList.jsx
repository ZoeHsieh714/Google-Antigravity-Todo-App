import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTasks, updateTask, deleteTask, setupStorageSync, getTasksByCategory, searchTasks } from '../utils/storage';
import CategoryBadge from './CategoryBadge';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';

function TaskList({ teamCode, onEditTask, onAddTask }) {
    const [allTasks, setAllTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const tasksPerPage = 10;

    const loadTasks = () => {
        const tasks = getTasks(teamCode);
        const sortedTasks = tasks.sort((a, b) =>
            new Date(a.due_date) - new Date(b.due_date)
        );
        setAllTasks(sortedTasks);
        applyFilters(sortedTasks, selectedCategory, searchQuery);
    };

    const applyFilters = (tasks, category, query) => {
        let filtered = tasks;

        // Apply category filter
        filtered = getTasksByCategory(filtered, category);

        // Apply search filter
        filtered = searchTasks(filtered, query);

        setFilteredTasks(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    };

    useEffect(() => {
        loadTasks();
        const cleanup = setupStorageSync(() => {
            loadTasks();
        });
        return cleanup;
    }, [teamCode]);

    useEffect(() => {
        applyFilters(allTasks, selectedCategory, searchQuery);
    }, [selectedCategory, searchQuery, allTasks]);

    const handleToggleComplete = (taskId, currentCompleted) => {
        updateTask(teamCode, taskId, { completed: !currentCompleted });
        loadTasks();
    };

    const handleDelete = (taskId) => {
        if (window.confirm('確定要刪除此任務嗎？')) {
            deleteTask(teamCode, taskId);
            loadTasks();
        }
    };

    // Pagination
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const isOverdue = (dueDate, completed) => {
        if (completed) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(dueDate) < today;
    };

    return (
        <div className="py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-100">任務列表</h2>
                <button
                    onClick={onAddTask}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    新增任務
                </button>
            </div>

            {/* Search and Filter */}
            <div className="mb-6 space-y-4">
                <SearchBar onSearch={setSearchQuery} />
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
            </div>

            {/* Results count */}
            {(searchQuery || selectedCategory !== 'all') && (
                <div className="mb-4 text-sm text-gray-400">
                    找到 {filteredTasks.length} 個任務
                </div>
            )}

            {filteredTasks.length === 0 ? (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
                    <div className="text-6xl mb-4 opacity-50">📝</div>
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                        {searchQuery || selectedCategory !== 'all' ? '沒有符合的任務' : '尚無任務'}
                    </h3>
                    <p className="text-gray-400">
                        {searchQuery || selectedCategory !== 'all'
                            ? '嘗試調整搜索或篩選條件'
                            : '點擊「新增任務」按鈕來創建第一個任務'}
                    </p>
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {currentTasks.map((task) => (
                            <div
                                key={task.id}
                                className={`bg-gray-800 border border-gray-700 rounded-lg p-4 transition-all hover:border-gray-600 ${task.completed ? 'opacity-60' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 pt-1">
                                        <button
                                            onClick={() => handleToggleComplete(task.id, task.completed)}
                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${task.completed
                                                    ? 'bg-green-600 border-green-600'
                                                    : 'border-gray-600 hover:border-gray-500'
                                                }`}
                                        >
                                            {task.completed && <Check className="w-4 h-4 text-white" />}
                                        </button>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-3 mb-2">
                                            <h3
                                                className={`text-base font-medium flex-1 ${task.completed
                                                        ? 'line-through text-gray-500'
                                                        : 'text-gray-100'
                                                    }`}
                                            >
                                                {task.name}
                                            </h3>
                                            <CategoryBadge category={task.category} size="sm" />
                                        </div>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span
                                                className={`${isOverdue(task.due_date, task.completed)
                                                        ? 'text-red-400 font-medium'
                                                        : 'text-gray-400'
                                                    }`}
                                            >
                                                📅 {formatDate(task.due_date)}
                                                {isOverdue(task.due_date, task.completed) && ' (逾期)'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => onEditTask(task.id)}
                                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                                            title="編輯"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                                            title="刪除"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                上一頁
                            </button>

                            <span className="text-sm text-gray-400">
                                第 {currentPage} / {totalPages} 頁
                            </span>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                下一頁
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default TaskList;
