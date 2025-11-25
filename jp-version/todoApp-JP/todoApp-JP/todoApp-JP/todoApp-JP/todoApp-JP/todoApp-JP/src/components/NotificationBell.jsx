import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { checkUpcomingDeadlines, getNotificationSettings, saveNotificationSettings, requestNotificationPermission, sendBrowserNotification } from '../utils/notifications';

function NotificationBell({ tasks }) {
    const [notifications, setNotifications] = useState([]);
    const [showPanel, setShowPanel] = useState(false);
    const [settings, setSettings] = useState(getNotificationSettings());

    useEffect(() => {
        const notifs = checkUpcomingDeadlines(tasks);
        setNotifications(notifs);
    }, [tasks]);

    const handleToggleNotifications = async () => {
        if (!settings.enabled) {
            const permission = await requestNotificationPermission();
            if (permission === 'granted') {
                const newSettings = { enabled: true };
                setSettings(newSettings);
                saveNotificationSettings(newSettings);

                // Send a test notification
                sendBrowserNotification('通知已啟用', '您將收到任務到期提醒');
            }
        } else {
            const newSettings = { enabled: false };
            setSettings(newSettings);
            saveNotificationSettings(newSettings);
        }
    };

    const unreadCount = notifications.length;

    return (
        <div className="relative">
            <button
                onClick={() => setShowPanel(!showPanel)}
                className="relative p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {showPanel && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-100">通知</h3>
                            <button
                                onClick={() => setShowPanel(false)}
                                className="text-gray-400 hover:text-gray-300"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.enabled}
                                onChange={handleToggleNotifications}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 focus:ring-2"
                            />
                            <span className="text-sm text-gray-300">啟用瀏覽器通知</span>
                        </label>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-400">
                                <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">沒有新通知</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-700">
                                {notifications.map((notif) => (
                                    <div key={notif.id} className="p-4 hover:bg-gray-750 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${notif.type === 'overdue' ? 'bg-red-500' :
                                                    notif.type === 'due-today' ? 'bg-amber-500' :
                                                        'bg-blue-500'
                                                }`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-200">{notif.title}</p>
                                                <p className="text-sm text-gray-400 mt-1">{notif.message}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    到期日：{new Date(notif.task.due_date).toLocaleDateString('zh-TW')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationBell;
