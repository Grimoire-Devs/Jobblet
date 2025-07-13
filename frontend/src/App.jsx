import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./contexts/LanguageContext"
import { AuthProvider } from "./contexts/AuthContext"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from './pages/Home'
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import PosterDashboard from "./pages/PosterDashboard"
import WorkerDashboard from "./pages/WorkerDashboard"
import CreateJob from "./pages/CreateJob"
import JobFeed from "./pages/JobFeed"
import JobDetail from "./pages/JobDetails"
import "./App.css"

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/poster/dashboard" element={<PosterDashboard />} />
                <Route path="/worker/dashboard" element={<WorkerDashboard />} />
                <Route path="/poster/jobs/new" element={<CreateJob />} />
                <Route path="/jobs" element={<JobFeed />} />
                <Route path="/jobs/:jobId" element={<JobDetail />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App
