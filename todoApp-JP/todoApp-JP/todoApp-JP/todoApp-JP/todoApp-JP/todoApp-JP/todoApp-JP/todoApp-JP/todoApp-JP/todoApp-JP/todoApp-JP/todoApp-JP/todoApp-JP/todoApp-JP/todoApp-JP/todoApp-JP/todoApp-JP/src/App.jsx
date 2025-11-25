import React, { useState, useEffect } from 'react';
import { getTeamInfo, saveTeamInfo, clearTeamInfo, getTasks } from './utils/storage';
import TeamSetup from './components/TeamSetup';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import StatsDashboard from './components/StatsDashboard';

function App() {
    const [teamInfo, setTeamInfo] = useState(null);
    const [currentView, setCurrentView] = useState('list');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const info = getTeamInfo();
        if (info) {
            setTeamInfo(info);
            loadTasks(info.teamCode);
        }
    }, []);

    const loadTasks = (teamCode) => {
        const allTasks = getTasks(teamCode);
        setTasks(allTasks);
    };

    useEffect(() => {
        if (teamInfo) {
            loadTasks(teamInfo.teamCode);

            // Reload tasks periodically to keep stats updated
            const interval = setInterval(() => {
                loadTasks(teamInfo.teamCode);
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [teamInfo]);

    const handleJoinTeam = (teamCode, userName) => {
        const info = { teamCode, userName };
        saveTeamInfo(teamCode, userName);
        setTeamInfo(info);
        loadTasks(teamCode);
    };

    const handleSwitchTeam = () => {
        if (window.confirm('確定要切換團隊嗎？')) {
            clearTeamInfo();
            setTeamInfo(null);
            setCurrentView('list');
            setEditingTaskId(null);
            setTasks([]);
        }
    };

    const handleAddTask = () => {
        setEditingTaskId(null);
        setCurrentView('detail');
    };

    const handleEditTask = (taskId) => {
        setEditingTaskId(taskId);
        setCurrentView('detail');
    };

    const handleBackToList = () => {
        setCurrentView('list');
        setEditingTaskId(null);
        if (teamInfo) {
            loadTasks(teamInfo.teamCode);
        }
    };

    if (!teamInfo) {
        return <TeamSetup onJoinTeam={handleJoinTeam} />;
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Header
                teamCode={teamInfo.teamCode}
                userName={teamInfo.userName}
                onSwitchTeam={handleSwitchTeam}
                tasks={tasks}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {currentView === 'list' ? (
                    <>
                        <div className="py-6">
                            <StatsDashboard tasks={tasks} />
                        </div>
                        <TaskList
                            teamCode={teamInfo.teamCode}
                            onEditTask={handleEditTask}
                            onAddTask={handleAddTask}
                        />
                    </>
                ) : (
                    <TaskDetail
                        teamCode={teamInfo.teamCode}
                        taskId={editingTaskId}
                        onBack={handleBackToList}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
