"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Brain,
  Target,
  TrendingUp,
  Clock,
  Users,
  BookOpen,
  Lightbulb,
  Zap,
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  BarChart3,
  Eye,
  Settings,
  Menu,
  X,
  Home,
  Activity,
  Calendar,
  MessageSquare,
  Bell,
  Search,
  Filter,
  ChevronRight,
  PlusCircle,
  FileText,
  Video,
  Headphones,
  Gamepad2,
  Puzzle,
  Timer,
  Flame,
  Trophy,
  Smile,
  Frown,
  Meh,
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

function LearningJourney() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Learning Journey</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your progress, see how AI adapts to your learning style, and discover your intellectual growth over
          time.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cognitive Growth</h3>
            <div className="text-3xl font-bold text-blue-600 mb-1">+23%</div>
            <p className="text-sm text-gray-600">Problem-solving speed improved</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning Velocity</h3>
            <div className="text-3xl font-bold text-green-600 mb-1">1.8x</div>
            <p className="text-sm text-gray-600">Faster than average learner</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Goal Achievement</h3>
            <div className="text-3xl font-bold text-purple-600 mb-1">94%</div>
            <p className="text-sm text-gray-600">Weekly goals completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Journey */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Learning Path Visualization</CardTitle>
            <CardDescription>See how your knowledge has expanded over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  subject: "Mathematics",
                  topics: ["Basic Algebra", "Quadratic Equations", "Functions", "Calculus Prep"],
                  progress: [100, 100, 85, 30],
                  color: "blue",
                },
                {
                  subject: "Physics",
                  topics: ["Mechanics", "Thermodynamics", "Waves", "Electricity"],
                  progress: [90, 75, 60, 20],
                  color: "green",
                },
              ].map((subject, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-semibold text-gray-900">{subject.subject}</h4>
                  <div className="space-y-2">
                    {subject.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-700">{topic}</span>
                            <span className="text-sm text-gray-500">{subject.progress[topicIndex]}%</span>
                          </div>
                          <Progress value={subject.progress[topicIndex]} className="h-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Adaptations Timeline</CardTitle>
            <CardDescription>How AI has personalized your learning experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  date: "Today",
                  adaptation: "Increased visual content by 20%",
                  reason: "Better engagement with diagrams detected",
                  type: "content",
                },
                {
                  date: "2 days ago",
                  adaptation: "Adjusted difficulty progression",
                  reason: "Mastery rate exceeded expectations",
                  type: "difficulty",
                },
                {
                  date: "1 week ago",
                  adaptation: "Switched to kinesthetic learning mode",
                  reason: "Low engagement with traditional methods",
                  type: "modality",
                },
                {
                  date: "2 weeks ago",
                  adaptation: "Implemented spaced repetition",
                  reason: "Retention patterns analysis",
                  type: "timing",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 ${
                      item.type === "content"
                        ? "bg-blue-500"
                        : item.type === "difficulty"
                          ? "bg-green-500"
                          : item.type === "modality"
                            ? "bg-purple-500"
                            : "bg-orange-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-semibold text-gray-900 text-sm">{item.adaptation}</h5>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                    <p className="text-xs text-gray-600">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AIRecommendations() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Recommendations</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Personalized suggestions based on your learning patterns, cognitive strengths, and performance data.
        </p>
      </div>

      {/* Recommendation Categories */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="timing">Timing</TabsTrigger>
          <TabsTrigger value="methods">Methods</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Advanced Calculus Concepts",
                description: "Your pattern recognition skills suggest you're ready for derivatives and integrals.",
                confidence: 94,
                type: "challenge",
                icon: TrendingUp,
                color: "green",
              },
              {
                title: "Visual Physics Simulations",
                description: "Interactive simulations will help you grasp complex physics concepts better.",
                confidence: 87,
                type: "method",
                icon: Eye,
                color: "blue",
              },
              {
                title: "Chemistry Lab Experiments",
                description: "Hands-on experiments align with your kinesthetic learning preference.",
                confidence: 91,
                type: "activity",
                icon: Zap,
                color: "purple",
              },
              {
                title: "Mathematical Proofs",
                description: "Your logical reasoning skills are strong enough for proof-based mathematics.",
                confidence: 89,
                type: "challenge",
                icon: Brain,
                color: "orange",
              },
            ].map((rec, index) => {
              const IconComponent = rec.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          rec.color === "green"
                            ? "bg-green-100"
                            : rec.color === "blue"
                              ? "bg-blue-100"
                              : rec.color === "purple"
                                ? "bg-purple-100"
                                : "bg-orange-100"
                        }`}
                      >
                        <IconComponent
                          className={`w-6 h-6 ${
                            rec.color === "green"
                              ? "text-green-600"
                              : rec.color === "blue"
                                ? "text-blue-600"
                                : rec.color === "purple"
                                  ? "text-purple-600"
                                  : "text-orange-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                          <Badge
                            className={`${
                              rec.confidence > 90
                                ? "bg-green-100 text-green-700"
                                : rec.confidence > 85
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {rec.confidence}% match
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{rec.description}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Start Learning
                          </Button>
                          <Button size="sm" variant="outline">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="timing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Optimal Learning Schedule</CardTitle>
              <CardDescription>Based on your attention patterns and performance data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "9:00 AM - 10:30 AM", activity: "Mathematics (Peak Focus)", efficiency: 95 },
                  { time: "11:00 AM - 12:00 PM", activity: "Physics Problem Solving", efficiency: 88 },
                  { time: "2:00 PM - 3:30 PM", activity: "Chemistry Lab Work", efficiency: 92 },
                  { time: "4:00 PM - 5:00 PM", activity: "Review & Practice", efficiency: 78 },
                ].map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{slot.time}</h4>
                      <p className="text-sm text-gray-600">{slot.activity}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{slot.efficiency}%</div>
                      <div className="text-xs text-gray-500">Efficiency</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                method: "Visual Learning",
                description: "Diagrams, charts, and visual representations",
                effectiveness: 85,
                icon: Eye,
              },
              {
                method: "Interactive Simulations",
                description: "Hands-on digital experiments and models",
                effectiveness: 92,
                icon: Gamepad2,
              },
              {
                method: "Collaborative Learning",
                description: "Group discussions and peer teaching",
                effectiveness: 78,
                icon: Users,
              },
            ].map((method, index) => {
              const IconComponent = method.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{method.method}</h3>
                    <p className="text-sm text-gray-600 mb-4">{method.description}</p>
                    <div className="text-2xl font-bold text-blue-600 mb-1">{method.effectiveness}%</div>
                    <div className="text-xs text-gray-500">Effectiveness for you</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Short-term Goals</CardTitle>
                <CardDescription>Achievable targets for the next 2 weeks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Master quadratic equation solving (85% accuracy)",
                  "Complete 3 physics simulation exercises",
                  "Join 2 study group sessions",
                  "Achieve 7-day learning streak",
                ].map((goal, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">{goal}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Long-term Objectives</CardTitle>
                <CardDescription>Ambitious goals for the next semester</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Advance to Calculus BC level",
                  "Complete advanced physics track",
                  "Develop strong problem-solving portfolio",
                  "Mentor other students in mathematics",
                ].map((goal, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-purple-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">{goal}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StudyGroups() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Study Groups</h2>
          <p className="text-gray-600 mt-2">Connect with peers and learn together</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Active Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Calculus Masters",
            subject: "Mathematics",
            members: 8,
            status: "live",
            topic: "Derivatives and Chain Rule",
            nextSession: "Now",
            color: "green",
          },
          {
            name: "Physics Problem Solvers",
            subject: "Physics",
            members: 12,
            status: "scheduled",
            topic: "Mechanics Review",
            nextSession: "Tomorrow 3 PM",
            color: "blue",
          },
          {
            name: "Chemistry Lab Partners",
            subject: "Chemistry",
            members: 6,
            status: "scheduled",
            topic: "Organic Reactions",
            nextSession: "Friday 2 PM",
            color: "purple",
          },
          {
            name: "AP Prep Squad",
            subject: "Multiple",
            members: 15,
            status: "scheduled",
            topic: "Test Strategies",
            nextSession: "Monday 4 PM",
            color: "orange",
          },
        ].map((group, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{group.name}</h3>
                <Badge
                  className={`${group.status === "live" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                >
                  {group.status === "live" ? "Live" : "Scheduled"}
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{group.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{group.members} members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{group.topic}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{group.nextSession}</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button
                  size="sm"
                  className={`flex-1 ${
                    group.status === "live" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {group.status === "live" ? "Join Now" : "Set Reminder"}
                </Button>
                <Button size="sm" variant="outline">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommended Groups */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Based on your learning interests and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Advanced Problem Solving",
                description: "For students excelling in mathematics who want extra challenges",
                match: 95,
                members: 5,
              },
              {
                name: "Visual Learners Unite",
                description: "Study group focused on visual learning techniques and methods",
                match: 88,
                members: 9,
              },
              {
                name: "STEM Career Prep",
                description: "Discussing career paths and preparation for STEM fields",
                match: 82,
                members: 12,
              },
            ].map((group, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{group.name}</h4>
                    <Badge className="bg-green-100 text-green-700">{group.match}% match</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{group.members} members</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Join Group
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Achievements() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Achievements</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Celebrate your learning milestones and track your intellectual growth journey.
        </p>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">24</div>
            <div className="text-sm text-gray-600">Total Achievements</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">1,247</div>
            <div className="text-sm text-gray-600">Points Earned</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flame className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
            <div className="text-sm text-gray-600">Rare Badges</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
          <CardDescription>Your latest accomplishments and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Speed Demon",
                description: "Solved 20 problems in under 10 minutes",
                date: "Today",
                rarity: "rare",
                icon: Zap,
                points: 150,
              },
              {
                title: "Consistent Learner",
                description: "Maintained a 10-day learning streak",
                date: "Yesterday",
                rarity: "common",
                icon: Flame,
                points: 100,
              },
              {
                title: "Problem Solver",
                description: "Completed 50 algebra problems",
                date: "2 days ago",
                rarity: "uncommon",
                icon: Puzzle,
                points: 75,
              },
              {
                title: "Team Player",
                description: "Helped 5 students in study groups",
                date: "3 days ago",
                rarity: "uncommon",
                icon: Users,
                points: 80,
              },
            ].map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.rarity === "rare"
                        ? "bg-purple-100"
                        : achievement.rarity === "uncommon"
                          ? "bg-blue-100"
                          : "bg-green-100"
                    }`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${
                        achievement.rarity === "rare"
                          ? "text-purple-600"
                          : achievement.rarity === "uncommon"
                            ? "text-blue-600"
                            : "text-green-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      <Badge
                        className={`${
                          achievement.rarity === "rare"
                            ? "bg-purple-100 text-purple-700"
                            : achievement.rarity === "uncommon"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">+{achievement.points}</div>
                    <div className="text-xs text-gray-500">{achievement.date}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            category: "Learning Mastery",
            description: "Achievements for mastering subjects and concepts",
            achievements: 8,
            icon: Brain,
            color: "blue",
          },
          {
            category: "Consistency",
            description: "Rewards for regular learning habits",
            achievements: 6,
            icon: Flame,
            color: "orange",
          },
          {
            category: "Collaboration",
            description: "Recognition for helping others and teamwork",
            achievements: 4,
            icon: Users,
            color: "green",
          },
          {
            category: "Innovation",
            description: "Creative problem-solving and unique approaches",
            achievements: 3,
            icon: Lightbulb,
            color: "yellow",
          },
          {
            category: "Speed & Efficiency",
            description: "Fast learning and quick problem resolution",
            achievements: 2,
            icon: Zap,
            color: "purple",
          },
          {
            category: "Leadership",
            description: "Mentoring others and leading study groups",
            achievements: 1,
            icon: Award,
            color: "red",
          },
        ].map((category, index) => {
          const IconComponent = category.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    category.color === "blue"
                      ? "bg-blue-100"
                      : category.color === "orange"
                        ? "bg-orange-100"
                        : category.color === "green"
                          ? "bg-green-100"
                          : category.color === "yellow"
                            ? "bg-yellow-100"
                            : category.color === "purple"
                              ? "bg-purple-100"
                              : "bg-red-100"
                  }`}
                >
                  <IconComponent
                    className={`w-8 h-8 ${
                      category.color === "blue"
                        ? "text-blue-600"
                        : category.color === "orange"
                          ? "text-orange-600"
                          : category.color === "green"
                            ? "text-green-600"
                            : category.color === "yellow"
                              ? "text-yellow-600"
                              : category.color === "purple"
                                ? "text-purple-600"
                                : "text-red-600"
                    }`}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.category}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                <div className="text-2xl font-bold text-gray-900 mb-1">{category.achievements}</div>
                <div className="text-xs text-gray-500">Achievements earned</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// Teacher Dashboard Components
function TeacherDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Good morning, Ms. Johnson! 👩‍🏫</h2>
            <p className="text-indigo-100 text-lg">Your students are making excellent progress today.</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Class 10A</div>
            <div className="text-indigo-200">Mathematics</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">28/30</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Interventions</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
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
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">94%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>AI Insights & Recommendations</span>
              </CardTitle>
              <CardDescription>Real-time analysis of your class performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-900">Excellent Progress Detected</h4>
                    <p className="text-sm text-green-700 mt-1">
                      15 students showing accelerated learning in quadratic equations. Consider introducing advanced
                      topics.
                    </p>
                    <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-orange-900">Students Need Support</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      3 students struggling with abstract concepts. AI suggests visual learning approaches.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3 border-orange-600 text-orange-600 bg-transparent"
                    >
                      Create Intervention
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Class Performance Analytics</span>
              </CardTitle>
              <CardDescription>Track learning progress across different topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { topic: "Linear Equations", avgScore: 92, improvement: "+8%", difficulty: "Mastered" },
                  { topic: "Quadratic Functions", avgScore: 78, improvement: "+15%", difficulty: "In Progress" },
                  { topic: "Polynomials", avgScore: 65, improvement: "+5%", difficulty: "Challenging" },
                ].map((topic, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{topic.topic}</h4>
                        <p className="text-sm text-gray-500">{topic.difficulty}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{topic.avgScore}%</div>
                        <div className="text-sm text-green-600">{topic.improvement}</div>
                      </div>
                    </div>
                    <Progress value={topic.avgScore} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Student Spotlight */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <span>Student Spotlight</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-yellow-500 text-white">AK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-yellow-900">Alex Kim</h4>
                    <p className="text-sm text-yellow-700">Top Performer</p>
                  </div>
                </div>
                <p className="text-sm text-yellow-800">
                  Completed all assignments with 98% accuracy. Ready for advanced challenges.
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-500 text-white">MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-blue-900">Maria Johnson</h4>
                    <p className="text-sm text-blue-700">Most Improved</p>
                  </div>
                </div>
                <p className="text-sm text-blue-800">35% improvement in problem-solving speed over the past week.</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create New Assignment
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Class Announcement
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Progress Report
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Parent Meetings
              </Button>
            </CardContent>
          </Card>

          {/* Class Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span>Class Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Study Time</span>
                <span className="font-semibold">2.3 hrs/day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Engagement Rate</span>
                <span className="font-semibold">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI Adaptations</span>
                <span className="font-semibold">247 this week</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Parent Satisfaction</span>
                <span className="font-semibold">4.8/5</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { action: "Emma completed Algebra Quiz", time: "5 min ago", type: "completion" },
                { action: "AI adapted content for 3 students", time: "12 min ago", type: "ai" },
                { action: "New parent message received", time: "1 hour ago", type: "message" },
                { action: "Weekly report generated", time: "2 hours ago", type: "report" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "completion"
                        ? "bg-green-500"
                        : activity.type === "ai"
                          ? "bg-purple-500"
                          : activity.type === "message"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StudentAnalytics() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Student Analytics</h2>
          <p className="text-gray-600 mt-2">Deep insights into individual student performance and learning patterns</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Student List with Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Class Overview</CardTitle>
          <CardDescription>Individual student performance and AI-detected patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Alex Kim",
                avatar: "AK",
                performance: 96,
                trend: "up",
                status: "excelling",
                aiInsight: "Ready for advanced challenges",
                lastActive: "2 min ago",
                mood: "happy",
              },
              {
                name: "Emma Rodriguez",
                avatar: "ER",
                performance: 73,
                trend: "down",
                status: "struggling",
                aiInsight: "Needs visual learning support",
                lastActive: "15 min ago",
                mood: "neutral",
              },
              {
                name: "Marcus Johnson",
                avatar: "MJ",
                performance: 88,
                trend: "up",
                status: "improving",
                aiInsight: "Responding well to peer learning",
                lastActive: "5 min ago",
                mood: "happy",
              },
              {
                name: "Sofia Chen",
                avatar: "SC",
                performance: 91,
                trend: "stable",
                status: "consistent",
                aiInsight: "Optimal learning pace maintained",
                lastActive: "1 min ago",
                mood: "happy",
              },
              {
                name: "David Wilson",
                avatar: "DW",
                performance: 67,
                trend: "up",
                status: "recovering",
                aiInsight: "Breakthrough in pattern recognition",
                lastActive: "8 min ago",
                mood: "neutral",
              },
            ].map((student, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Avatar className="w-12 h-12">
                  <AvatarFallback
                    className={`${
                      student.status === "excelling"
                        ? "bg-green-500"
                        : student.status === "struggling"
                          ? "bg-red-500"
                          : student.status === "improving"
                            ? "bg-blue-500"
                            : student.status === "recovering"
                              ? "bg-orange-500"
                              : "bg-gray-500"
                    } text-white`}
                  >
                    {student.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{student.name}</h4>
                    <Badge
                      className={`${
                        student.status === "excelling"
                          ? "bg-green-100 text-green-700"
                          : student.status === "struggling"
                            ? "bg-red-100 text-red-700"
                            : student.status === "improving"
                              ? "bg-blue-100 text-blue-700"
                              : student.status === "recovering"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {student.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {student.mood === "happy" ? (
                        <Smile className="w-4 h-4 text-green-500" />
                      ) : student.mood === "neutral" ? (
                        <Meh className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <Frown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{student.aiInsight}</p>
                  <p className="text-xs text-gray-500">Last active: {student.lastActive}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg font-bold text-gray-900">{student.performance}%</span>
                    {student.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : student.trend === "down" ? (
                      <div className="w-4 h-4 text-red-500 transform rotate-180">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    )}
                  </div>
                  <Progress value={student.performance} className="w-20 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Learning Pattern Analysis</CardTitle>
            <CardDescription>AI-detected learning preferences and optimal conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Preferred Learning Modalities</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Visual Learning</span>
                    <span className="text-sm font-semibold">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Auditory Learning</span>
                    <span className="text-sm font-semibold">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kinesthetic Learning</span>
                    <span className="text-sm font-semibold">10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Optimal Study Times</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["9-10 AM", "2-3 PM", "7-8 PM"].map((time, index) => (
                    <div key={index} className="text-center p-2 bg-blue-50 rounded-lg">
                      <div className="text-sm font-semibold text-blue-900">{time}</div>
                      <div className="text-xs text-blue-600">Peak Focus</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intervention Recommendations</CardTitle>
            <CardDescription>AI-suggested actions to improve student outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  student: "Emma Rodriguez",
                  intervention: "Implement visual learning aids",
                  priority: "high",
                  impact: "Expected 15% improvement",
                },
                {
                  student: "David Wilson",
                  intervention: "Increase peer collaboration",
                  priority: "medium",
                  impact: "Boost confidence and engagement",
                },
                {
                  student: "Marcus Johnson",
                  intervention: "Provide advanced challenges",
                  priority: "low",
                  impact: "Maintain motivation",
                },
              ].map((rec, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-gray-900">{rec.student}</h5>
                    <Badge
                      className={`${
                        rec.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : rec.priority === "medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {rec.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{rec.intervention}</p>
                  <p className="text-xs text-gray-500">{rec.impact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ContentManagement() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Content Management</h2>
          <p className="text-gray-600 mt-2">Create, organize, and optimize learning materials</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Content
        </Button>
      </div>

      {/* Content Types */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { type: "Videos", count: 24, icon: Video, color: "blue" },
          { type: "Interactive", count: 18, icon: Gamepad2, color: "green" },
          { type: "Audio", count: 12, icon: Headphones, color: "purple" },
          { type: "Documents", count: 36, icon: FileText, color: "orange" },
        ].map((content, index) => {
          const IconComponent = content.icon
          return (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    content.color === "blue"
                      ? "bg-blue-100"
                      : content.color === "green"
                        ? "bg-green-100"
                        : content.color === "purple"
                          ? "bg-purple-100"
                          : "bg-orange-100"
                  }`}
                >
                  <IconComponent
                    className={`w-6 h-6 ${
                      content.color === "blue"
                        ? "text-blue-600"
                        : content.color === "green"
                          ? "text-green-600"
                          : content.color === "purple"
                            ? "text-purple-600"
                            : "text-orange-600"
                    }`}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{content.type}</h3>
                <p className="text-2xl font-bold text-gray-900">{content.count}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Content Library */}
      <Card>
        <CardHeader>
          <CardTitle>Content Library</CardTitle>
          <CardDescription>Manage your learning materials and track their effectiveness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Introduction to Quadratic Functions",
                type: "Video",
                duration: "12 min",
                engagement: 94,
                difficulty: "Intermediate",
                adaptations: 23,
              },
              {
                title: "Interactive Graphing Tool",
                type: "Interactive",
                duration: "15 min",
                engagement: 89,
                difficulty: "Advanced",
                adaptations: 31,
              },
              {
                title: "Solving Equations Practice",
                type: "Exercise",
                duration: "20 min",
                engagement: 76,
                difficulty: "Beginner",
                adaptations: 12,
              },
              {
                title: "Physics Simulation: Pendulum",
                type: "Simulation",
                duration: "18 min",
                engagement: 92,
                difficulty: "Intermediate",
                adaptations: 28,
              },
            ].map((content, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    content.type === "Video"
                      ? "bg-red-100"
                      : content.type === "Interactive"
                        ? "bg-green-100"
                        : content.type === "Exercise"
                          ? "bg-blue-100"
                          : "bg-purple-100"
                  }`}
                >
                  {content.type === "Video" ? (
                    <Video className="w-5 h-5 text-red-600" />
                  ) : content.type === "Interactive" ? (
                    <Gamepad2 className="w-5 h-5 text-green-600" />
                  ) : content.type === "Exercise" ? (
                    <FileText className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Zap className="w-5 h-5 text-purple-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{content.title}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">{content.type}</span>
                    <span className="text-sm text-gray-500">{content.duration}</span>
                    <Badge
                      className={`${
                        content.difficulty === "Beginner"
                          ? "bg-green-100 text-green-700"
                          : content.difficulty === "Intermediate"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {content.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{content.engagement}% engagement</div>
                  <div className="text-xs text-gray-500">{content.adaptations} AI adaptations</div>
                </div>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Content Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>AI Content Optimization</span>
          </CardTitle>
          <CardDescription>Recommendations to improve content effectiveness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                content: "Algebra Basics Video",
                suggestion: "Add visual diagrams to improve comprehension for visual learners",
                impact: "Expected 12% engagement increase",
                priority: "high",
              },
              {
                content: "Physics Problem Set",
                suggestion: "Break into smaller chunks for better cognitive load management",
                impact: "Reduce completion time by 15%",
                priority: "medium",
              },
              {
                content: "Chemistry Lab Simulation",
                suggestion: "Add audio narration for auditory learners",
                impact: "Improve accessibility and engagement",
                priority: "low",
              },
            ].map((opt, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-900">{opt.content}</h4>
                  <Badge
                    className={`${
                      opt.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : opt.priority === "medium"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {opt.priority}
                  </Badge>
                </div>
                <p className="text-sm text-blue-800 mb-2">{opt.suggestion}</p>
                <p className="text-xs text-blue-600 mb-3">{opt.impact}</p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Apply Suggestion
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Assessments() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Assessments</h2>
          <p className="text-gray-600 mt-2">Create and manage adaptive assessments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Assessment
        </Button>
      </div>

      {/* Assessment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Active Assessments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">89%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">247</div>
            <div className="text-sm text-gray-600">AI Adaptations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">+15%</div>
            <div className="text-sm text-gray-600">Avg Improvement</div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Assessments</CardTitle>
          <CardDescription>Track performance and AI adaptations across all assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Quadratic Functions Quiz",
                type: "Adaptive Quiz",
                students: 28,
                avgScore: 87,
                status: "completed",
                adaptations: 34,
                date: "Today",
              },
              {
                title: "Physics Mechanics Test",
                type: "Standard Test",
                students: 30,
                avgScore: 82,
                status: "in-progress",
                adaptations: 0,
                date: "Yesterday",
              },
              {
                title: "Chemistry Lab Assessment",
                type: "Practical",
                students: 25,
                avgScore: 91,
                status: "completed",
                adaptations: 18,
                date: "2 days ago",
              },
              {
                title: "Algebra Problem Solving",
                type: "Adaptive Quiz",
                students: 29,
                avgScore: 79,
                status: "scheduled",
                adaptations: 0,
                date: "Tomorrow",
              },
            ].map((assessment, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{assessment.title}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">{assessment.type}</span>
                    <span className="text-sm text-gray-500">{assessment.students} students</span>
                    <span className="text-sm text-gray-500">{assessment.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {assessment.status === "scheduled" ? "Scheduled" : `${assessment.avgScore}% avg`}
                  </div>
                  <div className="text-xs text-gray-500">
                    {assessment.adaptations > 0 ? `${assessment.adaptations} adaptations` : "No adaptations"}
                  </div>
                </div>
                <Badge
                  className={`${
                    assessment.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : assessment.status === "in-progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {assessment.status}
                </Badge>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SettingsPanel() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-2">Configure your learning preferences and system settings</p>
      </div>

      <Tabs defaultValue="learning" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="learning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>Customize how AI adapts to your learning style</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Adaptations</h4>
                    <p className="text-sm text-gray-600">Allow AI to automatically adjust content difficulty</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-time Feedback</h4>
                    <p className="text-sm text-gray-600">Receive immediate feedback on your performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Personalized Recommendations</h4>
                    <p className="text-sm text-gray-600">Get AI-powered learning suggestions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Study Reminders</h4>
                    <p className="text-sm text-gray-600">Get reminded about your study schedule</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Achievement Alerts</h4>
                    <p className="text-sm text-gray-600">Celebrate your learning milestones</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Group Activity</h4>
                    <p className="text-sm text-gray-600">Updates from your study groups</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control how your data is used and shared</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Learning Analytics</h4>
                    <p className="text-sm text-gray-600">Allow collection of learning data for AI improvements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Performance Sharing</h4>
                    <p className="text-sm text-gray-600">Share anonymous performance data with educators</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Profile Visibility</h4>
                    <p className="text-sm text-gray-600">Make your profile visible to other students</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Grade Level</label>
                  <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option>Grade 9</option>
                    <option selected>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Time Zone</label>
                  <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option>Eastern Time</option>
                    <option>Central Time</option>
                    <option>Mountain Time</option>
                    <option>Pacific Time</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
