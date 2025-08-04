"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Brain,
  Target,
  Users,
  BookOpen,
  Lightbulb,
  Zap,
  CheckCircle,
  Award,
  BarChart3,
  Settings,
  Menu,
  X,
  Home,
  Activity,
  Bell,
  Search,
  ChevronRight,
  FileText,
  Puzzle,
  Timer,
  Flame,
} from "lucide-react"

export default function AdaptiveLearningDashboard() {
  const [currentView, setCurrentView] = useState("student-dashboard")
  const [userRole, setUserRole] = useState<"student" | "teacher">("student")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const navigation = [
    { id: "student-dashboard", name: "Dashboard", icon: Home, role: "student" },
    { id: "learning-journey", name: "Learning Journey", icon: Target, role: "student" },
    { id: "ai-recommendations", name: "AI Recommendations", icon: Brain, role: "student" },
    { id: "study-groups", name: "Study Groups", icon: Users, role: "student" },
    { id: "achievements", name: "Achievements", icon: Award, role: "student" },
    { id: "teacher-dashboard", name: "Class Overview", icon: BarChart3, role: "teacher" },
    { id: "student-analytics", name: "Student Analytics", icon: Activity, role: "teacher" },
    { id: "content-management", name: "Content", icon: BookOpen, role: "teacher" },
    { id: "assessments", name: "Assessments", icon: FileText, role: "teacher" },
    { id: "settings", name: "Settings", icon: Settings, role: "both" },
  ]

  const filteredNavigation = navigation.filter((item) => item.role === userRole || item.role === "both")

  const renderContent = () => {
    switch (currentView) {
      case "student-dashboard":
        return <StudentDashboard />
      case "learning-journey":
        return <LearningJourney />
      case "ai-recommendations":
        return <AIRecommendations />
      case "study-groups":
        return <StudyGroups />
      case "achievements":
        return <Achievements />
      case "teacher-dashboard":
        return <TeacherDashboard />
      case "student-analytics":
        return <StudentAnalytics />
      case "content-management":
        return <ContentManagement />
      case "assessments":
        return <Assessments />
      case "settings":
        return <SettingsPanel />
      default:
        return <StudentDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
            <SidebarContent
              navigation={filteredNavigation}
              currentView={currentView}
              setCurrentView={setCurrentView}
              setSidebarOpen={setSidebarOpen}
              userRole={userRole}
              setUserRole={setUserRole}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:block">
        <SidebarContent
          navigation={filteredNavigation}
          currentView={currentView}
          setCurrentView={setCurrentView}
          setSidebarOpen={setSidebarOpen}
          userRole={userRole}
          setUserRole={setUserRole}
        />
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {navigation.find((item) => item.id === currentView)?.name || "Dashboard"}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {currentTime.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{renderContent()}</main>
      </div>
    </div>
  )
}

function SidebarContent({
  navigation,
  currentView,
  setCurrentView,
  setSidebarOpen,
  userRole,
  setUserRole,
}: {
  navigation: any[]
  currentView: string
  setCurrentView: (view: string) => void
  setSidebarOpen: (open: boolean) => void
  userRole: "student" | "teacher"
  setUserRole: (role: "student" | "teacher") => void
}) {
  return (
    <div className="flex h-full flex-col bg-white shadow-xl">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AdaptiveLearn</h2>
            <p className="text-xs text-gray-500">AI-Powered Learning</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Role switcher */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">View as:</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${userRole === "student" ? "text-blue-600" : "text-gray-500"}`}>Student</span>
            <Switch
              checked={userRole === "teacher"}
              onCheckedChange={(checked) => {
                setUserRole(checked ? "teacher" : "student")
                setCurrentView(checked ? "teacher-dashboard" : "student-dashboard")
              }}
            />
            <span className={`text-sm ${userRole === "teacher" ? "text-blue-600" : "text-gray-500"}`}>Teacher</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const IconComponent = item.icon
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <IconComponent className="w-5 h-5 mr-3" />
              {item.name}
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          )
        })}
      </nav>

      {/* User profile */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">
              {userRole === "student" ? "Grade 10 Student" : "Mathematics Teacher"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Student Dashboard Components
function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
            <p className="text-blue-100 text-lg">Ready to continue your learning journey?</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Level 12</div>
            <div className="text-blue-200">Mathematics</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                <p className="text-2xl font-bold text-gray-900">12 days</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-gray-900">3/5</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Adaptations</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Goal</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>AI Recommendations</span>
              </CardTitle>
              <CardDescription>Personalized suggestions based on your learning patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900">Focus on Quadratic Functions</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your pattern recognition shows you're ready for advanced concepts. Try the interactive graphing
                      tool.
                    </p>
                    <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                      Start Learning
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <Timer className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-900">Optimal Study Time Detected</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your focus peaks at 2:30 PM. Schedule your most challenging topics then.
                    </p>
                    <Button size="sm" variant="outline" className="mt-3 border-green-600 text-green-600 bg-transparent">
                      Set Reminder
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Journey Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Learning Journey</span>
              </CardTitle>
              <CardDescription>Track your progress across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { subject: "Algebra II", progress: 78, level: "Advanced", color: "blue" },
                  { subject: "Physics", progress: 65, level: "Intermediate", color: "green" },
                  { subject: "Chemistry", progress: 45, level: "Beginner", color: "orange" },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.subject}</h4>
                        <p className="text-sm text-gray-500">{item.level}</p>
                      </div>
                      <Badge
                        className={`${
                          item.color === "blue"
                            ? "bg-blue-100 text-blue-700"
                            : item.color === "green"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.progress}%
                      </Badge>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Today's Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Today's Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { task: "Complete Algebra Quiz", completed: true },
                { task: "Watch Physics Video", completed: true },
                { task: "Practice Chemistry Problems", completed: true },
                { task: "Review Yesterday's Notes", completed: false },
                { task: "Join Study Group Session", completed: false },
              ].map((goal, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      goal.completed
                        ? "bg-green-600 border-green-600"
                        : "border-gray-300 hover:border-green-600 cursor-pointer"
                    }`}
                  >
                    {goal.completed && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`text-sm ${goal.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                    {goal.task}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Study Groups */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Study Groups</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-900">Calculus Study Group</h4>
                  <Badge className="bg-blue-600 text-white">Live</Badge>
                </div>
                <p className="text-sm text-blue-700 mb-3">5 members • Discussing derivatives</p>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  Join Session
                </Button>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Physics Problem Solving</h4>
                  <span className="text-sm text-gray-500">Tomorrow 3 PM</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">8 members • Mechanics review</p>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Set Reminder
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Problem Solver", description: "Solved 50 algebra problems", icon: Puzzle },
                { title: "Consistent Learner", description: "10-day learning streak", icon: Flame },
                { title: "Quick Thinker", description: "Improved response time by 30%", icon: Zap },
              ].map((achievement, index) => {
                const IconComponent = achievement.icon
                return (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Placeholder functions for other components
function LearningJourney() {
  return <div className="p-8 text-center text-gray-500">Learning Journey component would go here</div>
}

function AIRecommendations() {
  return <div className="p-8 text-center text-gray-500">AI Recommendations component would go here</div>
}

function StudyGroups() {
  return <div className="p-8 text-center text-gray-500">Study Groups component would go here</div>
}

function Achievements() {
  return <div className="p-8 text-center text-gray-500">Achievements component would go here</div>
}

function TeacherDashboard() {
  return <div className="p-8 text-center text-gray-500">Teacher Dashboard component would go here</div>
}

function StudentAnalytics() {
  return <div className="p-8 text-center text-gray-500">Student Analytics component would go here</div>
}

function ContentManagement() {
  return <div className="p-8 text-center text-gray-500">Content Management component would go here</div>
}

function Assessments() {
  return <div className="p-8 text-center text-gray-500">Assessments component would go here</div>
}

function SettingsPanel() {
  return <div className="p-8 text-center text-gray-500">Settings Panel component would go here</div>
}
