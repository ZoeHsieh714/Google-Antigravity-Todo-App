import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ListTodo } from 'lucide-react';
import { calculateCompletionRate, getOverdueTasks, getTasksDueToday } from '../utils/stats';

function StatsDashboard({ tasks }) {
    const completionRate = calculateCompletionRate(tasks);
    const overdueTasks = getOverdueTasks(tasks);
    const tasksDueToday = getTasksDueToday(tasks);
    const completedTasks = tasks.filter(t => t.completed);

    const stats = [
        {
            label: '總任務數',
            value: tasks.length,
            icon: ListTodo,
            color: 'blue',
            bgColor: 'bg-blue-600/20',
            textColor: 'text-blue-400',
            borderColor: 'border-blue-600/30'
        },
        {
            label: '已完成',
            value: completedTasks.length,
            subtitle: `${completionRate}% 完成率`,
            icon: CheckCircle2,
            color: 'green',
            bgColor: 'bg-green-600/20',
            textColor: 'text-green-400',
            borderColor: 'border-green-600/30'
        },
        {
            label: '今日到期',
            value: tasksDueToday.length,
            icon: Clock,
            color: 'amber',
            bgColor: 'bg-amber-600/20',
            textColor: 'text-amber-400',
            borderColor: 'border-amber-600/30'
        },
        {
            label: '已逾期',
            value: overdueTasks.length,
            icon: AlertTriangle,
            color: 'red',
            bgColor: 'bg-red-600/20',
            textColor: 'text-red-400',
            borderColor: 'border-red-600/30'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={index}
                        className={`${stat.bgColor} ${stat.borderColor} border rounded-lg p-4 transition-all hover:scale-105`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-300">{stat.label}</span>
                            <Icon className={`w-5 h-5 ${stat.textColor}`} />
                        </div>
                        <div className={`text-3xl font-bold ${stat.textColor} mb-1`}>
                            {stat.value}
                        </div>
                        {stat.subtitle && (
                            <div className="text-xs text-gray-400">{stat.subtitle}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default StatsDashboard;
