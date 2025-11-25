// Storage utility for team-based task management with advanced features

/**
 * Get tasks for a specific team
 * @param {string} teamCode - The team code
 * @returns {Array} Array of tasks
 */
export function getTasks(teamCode) {
    try {
        const key = `team_${teamCode}_tasks`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error getting tasks:', error);
        return [];
    }
}

/**
 * Save tasks for a specific team
 * @param {string} teamCode - The team code
 * @param {Array} tasks - Array of tasks to save
 */
export function saveTasks(teamCode, tasks) {
    try {
        const key = `team_${teamCode}_tasks`;
        localStorage.setItem(key, JSON.stringify(tasks));

        // Trigger storage event for cross-tab sync
        window.dispatchEvent(new StorageEvent('storage', {
            key,
            newValue: JSON.stringify(tasks),
            url: window.location.href,
            storageArea: localStorage
        }));
    } catch (error) {
        console.error('Error saving tasks:', error);
    }
}

/**
 * Add a new task
 * @param {string} teamCode - The team code
 * @param {Object} task - Task object with name, due_date, and category
 * @returns {Object} The created task with id
 */
export function addTask(teamCode, task) {
    const tasks = getTasks(teamCode);
    const now = new Date().toISOString();

    const newTask = {
        id: Date.now(),
        name: task.name,
        due_date: task.due_date,
        category: task.category || 'other', // NEW: default category
        completed: false,
        created_at: now,
        updated_at: now
    };

    tasks.push(newTask);
    saveTasks(teamCode, tasks);

    return newTask;
}

/**
 * Update an existing task
 * @param {string} teamCode - The team code
 * @param {number} taskId - The task ID
 * @param {Object} updates - Object with fields to update
 * @returns {Object|null} The updated task or null if not found
 */
export function updateTask(teamCode, taskId, updates) {
    const tasks = getTasks(teamCode);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return null;
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...updates,
        updated_at: new Date().toISOString()
    };

    saveTasks(teamCode, tasks);
    return tasks[taskIndex];
}

/**
 * Delete a task
 * @param {string} teamCode - The team code
 * @param {number} taskId - The task ID
 * @returns {boolean} True if deleted, false if not found
 */
export function deleteTask(teamCode, taskId) {
    const tasks = getTasks(teamCode);
    const filteredTasks = tasks.filter(t => t.id !== taskId);

    if (filteredTasks.length === tasks.length) {
        return false;
    }

    saveTasks(teamCode, filteredTasks);
    return true;
}

/**
 * Setup storage event listener for cross-tab sync
 * @param {Function} callback - Callback function to call when storage changes
 * @returns {Function} Cleanup function to remove the listener
 */
export function setupStorageSync(callback) {
    const handleStorageChange = (e) => {
        if (e.key && e.key.startsWith('team_') && e.key.endsWith('_tasks')) {
            callback();
        }
    };

    window.addEventListener('storage', handleStorageChange);

    // Return cleanup function
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
}

/**
 * Get team info from localStorage
 * @returns {Object|null} Team info with teamCode and userName
 */
export function getTeamInfo() {
    try {
        const data = localStorage.getItem('team_info');
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting team info:', error);
        return null;
    }
}

/**
 * Save team info to localStorage
 * @param {string} teamCode - The team code
 * @param {string} userName - The user's name
 */
export function saveTeamInfo(teamCode, userName) {
    try {
        localStorage.setItem('team_info', JSON.stringify({ teamCode, userName }));
    } catch (error) {
        console.error('Error saving team info:', error);
    }
}

/**
 * Clear team info (logout)
 */
export function clearTeamInfo() {
    try {
        localStorage.removeItem('team_info');
    } catch (error) {
        console.error('Error clearing team info:', error);
    }
}

// NEW: Category utilities
export const CATEGORIES = {
    work: { label: '工作', color: 'purple' },
    personal: { label: '個人', color: 'cyan' },
    urgent: { label: '緊急', color: 'red' },
    other: { label: '其他', color: 'gray' }
};

/**
 * Get tasks by category
 * @param {Array} tasks - Array of tasks
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered tasks
 */
export function getTasksByCategory(tasks, category) {
    if (!category || category === 'all') return tasks;
    return tasks.filter(t => t.category === category);
}

/**
 * Search tasks by name or date
 * @param {Array} tasks - Array of tasks
 * @param {string} query - Search query
 * @returns {Array} Filtered tasks
 */
export function searchTasks(tasks, query) {
    if (!query) return tasks;

    const lowerQuery = query.toLowerCase();
    return tasks.filter(task => {
        const nameMatch = task.name.toLowerCase().includes(lowerQuery);
        const dateMatch = task.due_date.includes(query);
        return nameMatch || dateMatch;
    });
}
