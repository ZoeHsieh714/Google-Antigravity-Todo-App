// Notification utilities

/**
 * Request browser notification permission
 * @returns {Promise<string>} Permission status
 */
export async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        console.warn('This browser does not support notifications');
        return 'denied';
    }

    if (Notification.permission === 'granted') {
        return 'granted';
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission;
    }

    return Notification.permission;
}

/**
 * Send browser notification
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {Object} options - Additional options
 */
export function sendBrowserNotification(title, body, options = {}) {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body,
            icon: '/vite.svg',
            ...options
        });
    }
}

/**
 * Check for upcoming deadlines and return notifications
 * @param {Array} tasks - Array of tasks
 * @returns {Array} Array of notification objects
 */
export function checkUpcomingDeadlines(tasks) {
    const notifications = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // Check for tasks due today
    const today = new Date(now);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    tasks.forEach(task => {
        if (task.completed) return;

        const dueDate = new Date(task.due_date);
        dueDate.setHours(0, 0, 0, 0);

        // Due today
        if (dueDate.getTime() === today.getTime()) {
            notifications.push({
                id: `task-${task.id}-today`,
                type: 'due-today',
                task,
                title: '今日到期',
                message: `任務「${task.name}」今天到期`
            });
        }
        // Overdue
        else if (dueDate < today) {
            notifications.push({
                id: `task-${task.id}-overdue`,
                type: 'overdue',
                task,
                title: '任務逾期',
                message: `任務「${task.name}」已逾期`
            });
        }
        // Due tomorrow
        else if (dueDate.getTime() === tomorrow.getTime()) {
            notifications.push({
                id: `task-${task.id}-tomorrow`,
                type: 'due-tomorrow',
                task,
                title: '明日到期',
                message: `任務「${task.name}」明天到期`
            });
        }
    });

    return notifications;
}

/**
 * Get notification settings from localStorage
 * @returns {Object} Notification settings
 */
export function getNotificationSettings() {
    try {
        const data = localStorage.getItem('notification_settings');
        return data ? JSON.parse(data) : { enabled: false };
    } catch (error) {
        return { enabled: false };
    }
}

/**
 * Save notification settings to localStorage
 * @param {Object} settings - Notification settings
 */
export function saveNotificationSettings(settings) {
    try {
        localStorage.setItem('notification_settings', JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving notification settings:', error);
    }
}
