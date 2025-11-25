// Statistics calculation utilities

/**
 * Calculate completion rate
 * @param {Array} tasks - Array of tasks
 * @returns {number} Completion rate as percentage (0-100)
 */
export function calculateCompletionRate(tasks) {
    if (tasks.length === 0) return 0;
    const completedCount = tasks.filter(t => t.completed).length;
    return Math.round((completedCount / tasks.length) * 100);
}

/**
 * Get overdue tasks
 * @param {Array} tasks - Array of tasks
 * @returns {Array} Overdue tasks
 */
export function getOverdueTasks(tasks) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return tasks.filter(task => {
        if (task.completed) return false;
        const dueDate = new Date(task.due_date);
        return dueDate < now;
    });
}

/**
 * Get tasks due today
 * @param {Array} tasks - Array of tasks
 * @returns {Array} Tasks due today
 */
export function getTasksDueToday(tasks) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tasks.filter(task => {
        if (task.completed) return false;
        const dueDate = new Date(task.due_date);
        return dueDate >= today && dueDate < tomorrow;
    });
}

/**
 * Get tasks by category with counts
 * @param {Array} tasks - Array of tasks
 * @returns {Object} Category counts
 */
export function getTasksByCategory(tasks) {
    const counts = {
        work: 0,
        personal: 0,
        urgent: 0,
        other: 0
    };

    tasks.forEach(task => {
        if (counts.hasOwnProperty(task.category)) {
            counts[task.category]++;
        }
    });

    return counts;
}

/**
 * Get upcoming tasks (due within 3 days)
 * @param {Array} tasks - Array of tasks
 * @returns {Array} Upcoming tasks
 */
export function getUpcomingTasks(tasks) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const threeDaysLater = new Date(now);
    threeDaysLater.setDate(threeDaysLater.getDate() + 3);

    return tasks.filter(task => {
        if (task.completed) return false;
        const dueDate = new Date(task.due_date);
        return dueDate >= now && dueDate <= threeDaysLater;
    });
}
