import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardPage from './pages/DashboardPage'
import CalendarPage from './pages/CalendarPage'
import AnnouncementsPage from './pages/AnnouncementsPage'
import TasksPage from './pages/TasksPage'
import HoursPage from './pages/HoursPage'
import VolunteersPage from './pages/VolunteersPage'
import ProjectsPage from './pages/ProjectsPage'
import DocumentsPage from './pages/DocumentsPage'
import StatisticsPage from './pages/StatisticsPage'
import ProfilePage from './pages/ProfilePage'
import Error401Page from './pages/errors/Error401Page'
import Error403Page from './pages/errors/Error403Page'
import Error404Page from './pages/errors/Error404Page'
import Error500Page from './pages/errors/Error500Page'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/error/401" element={<Error401Page />} />
      <Route path="/error/403" element={<Error403Page />} />
      <Route path="/error/500" element={<Error500Page />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="hours" element={<HoursPage />} />
        <Route path="volunteers" element={<VolunteersPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Error404Page />} />
    </Routes>
  )
}
