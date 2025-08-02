"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  Play,
  CheckCircle,
  AlertCircle,
  Award,
  BarChart3,
  Eye,
  MessageSquare,
  Calendar,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Share,
  Plus,
  Home,
  FileText,
  LogOut,
  Menu,
  ChevronRight,
  ChevronLeft,
  Save,
  MoreHorizontal,
} from "lucide-react"

export default function AdaptiveLearningPlatform() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [userRole, setUserRole] = useState("student")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)

  // Navigation items based on user role
  const getNavigationItems = () => {
    if (userRole === "student") {
      return [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "learning", label: "My Learning", icon: BookOpen },
        { id: "assessments", label: "Assessments", icon: FileText },
        { id: "progress", label: "Progress", icon: BarChart3 },
        { id: "groups", label: "Study Groups", icon: Users },
        { id: "achievements", label: "Achievements", icon: Award },
        { id: "settings", label: "Settings", icon: Settings },
      ]
    } else {
      return [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "students", label: "Students", icon: Users },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "content", label: "Content", icon: BookOpen },
        { id: "assessments", label: "Assessments", icon: FileText },
        { id: "insights", label: "AI Insights", icon: Brain },
        { id: "settings", label: "Settings", icon: Settings },
      ]
    }
  }

  const navigationItems = getNavigationItems()

  // Sample data
  const students = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      progress: 87,
      status: "excelling",
      lastActive: "2 hours ago",
      subjects: ["Mathematics", "Science"],
      currentTopic: "Quadratic Equations",
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "MC",
      progress: 92,
      status: "excelling",
      lastActive: "1 hour ago",
      subjects: ["Mathematics", "Physics"],
      currentTopic: "Linear Functions",
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "ED",
      progress: 45,
      status: "struggling",
      lastActive: "30 min ago",
      subjects: ["Mathematics"],
      currentTopic: "Basic Algebra",
    },
  ]

  const assessments = [
    {
      id: 1,
      title: "Quadratic Equations Mastery",
      type: "adaptive",
      duration: "45 min",
      questions: 25,
      difficulty: "Medium",
      status: "available",
      dueDate: "Tomorrow",
    },
    {
      id: 2,
      title: "Critical Thinking Assessment",
      type: "diagnostic",
      duration: "30 min",
      questions: 15,
      difficulty: "Hard",
      status: "completed",
      score: 85,
    },
    {
      id: 3,
      title: "Problem Solving Skills",
      type: "formative",
      duration: "20 min",
      questions: 12,
      difficulty: "Easy",
      status: "in_progress",
      progress: 60,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AdaptiveLearn AI</h1>
                <p className="text-xs text-gray-500">Personalized Learning Platform</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={userRole === "student" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setUserRole("student")
                    setCurrentView("dashboard")
                  }}
                  className="text-xs"
                >
                  Student
                </Button>
                <Button
                  variant={userRole === "teacher" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setUserRole("teacher")
                    setCurrentView("dashboard")
                  }}
                  className="text-xs"
                >
                  Teacher
                </Button>
              </div>

              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>

              <Avatar className="w-8 h-8 cursor-pointer" onClick={() => setCurrentView("settings")}>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="text-xs">{userRole === "student" ? "SA" : "TR"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <div className="flex-1 flex flex-col min-h-0 bg-white">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navigationItems.map((item) => {
                    const IconComponent = item.icon
                    return (
                      <Button
                        key={item.id}
                        variant={currentView === item.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          setCurrentView(item.id)
                          setSidebarOpen(false)
                        }}
                      >
                        <IconComponent className="w-5 h-5 mr-3" />
                        {item.label}
                      </Button>
                    )
                  })}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700">
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Dashboard View */}
            {currentView === "dashboard" && (
              <div className="space-y-6">
                {userRole === "student" ? (
                  <>
                    {/* Student Dashboard */}
                    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold mb-2">👋 Welcome back, Sarah!</h2>
                          <p className="text-blue-100 mb-6 text-lg">
                            Your AI learning companion has prepared a personalized journey for you today.
                          </p>
                          <Button
                            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                            onClick={() => setCurrentView("learning")}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Continue Learning
                          </Button>
                        </div>
                        <div className="hidden lg:block text-right">
                          <div className="text-5xl font-bold mb-2">87%</div>
                          <div className="text-blue-100 text-lg">Overall Progress</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <Card className="border-0 shadow-lg">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Zap className="w-5 h-5 text-yellow-500" />
                              <span>AI Recommendations</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div
                              className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
                              onClick={() => {
                                setCurrentLesson({
                                  title: "Quadratic Equations",
                                  type: "interactive_video",
                                  duration: 25,
                                })
                                setCurrentView("lesson")
                              }}
                            >
                              <h4 className="font-semibold text-green-800 mb-2">Ready: Quadratic Equations</h4>
                              <p className="text-sm text-green-700 mb-4">
                                Based on your strong algebra foundation, you're ready for the next challenge!
                              </p>
                              <div className="flex items-center space-x-2">
                                <Badge className="bg-green-100 text-green-700">
                                  <Play className="w-3 h-3 mr-1" />
                                  Start Now
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-6">
                        <Card className="border-0 shadow-lg">
                          <CardHeader>
                            <CardTitle className="text-base">Today's Goals</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {[
                                { task: "Complete 3 quadratic problems", completed: true },
                                { task: "Practice critical thinking", completed: true },
                                { task: "Review collaboration notes", completed: false },
                                { task: "Take adaptive assessment", completed: false },
                              ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${
                                      item.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                                    }`}
                                  >
                                    {item.completed && <CheckCircle className="w-3 h-3 text-white" />}
                                  </div>
                                  <span className={`text-sm ${item.completed ? "line-through text-gray-500" : ""}`}>
                                    {item.task}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Teacher Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <Card
                        className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() => setCurrentView("students")}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                              <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">28</div>
                              <div className="text-sm text-gray-600">Active Students</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() => setCurrentView("analytics")}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                              <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">92%</div>
                              <div className="text-sm text-gray-600">Avg. Progress</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() => setCurrentView("insights")}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                              <AlertCircle className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">3</div>
                              <div className="text-sm text-gray-600">Need Attention</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                              <Brain className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">+18%</div>
                              <div className="text-sm text-gray-600">Skill Growth</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Recent Student Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {students.slice(0, 3).map((student) => (
                            <div
                              key={student.id}
                              className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                              onClick={() => {
                                setSelectedStudent(student)
                                setCurrentView("student-detail")
                              }}
                            >
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarFallback>{student.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold">{student.name}</h4>
                                  <p className="text-sm text-gray-600">Working on {student.currentTopic}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold">{student.progress}%</div>
                                <div className="text-sm text-gray-500">{student.lastActive}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            )}

            {/* Learning View (Student) */}
            {currentView === "learning" && userRole === "student" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">My Learning Journey</h1>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Current Learning Path</CardTitle>
                        <CardDescription>Mathematics • Algebra Track</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              title: "Linear Equations",
                              status: "completed",
                              progress: 100,
                              duration: "4.5 hours",
                            },
                            {
                              title: "Quadratic Equations",
                              status: "current",
                              progress: 65,
                              duration: "2.1 hours",
                            },
                            {
                              title: "Polynomial Functions",
                              status: "upcoming",
                              progress: 0,
                              duration: "0 hours",
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all ${
                                item.status === "current"
                                  ? "border-blue-200 bg-blue-50"
                                  : item.status === "completed"
                                    ? "border-green-200 bg-green-50"
                                    : "border-gray-200 bg-gray-50"
                              }`}
                              onClick={() => {
                                if (item.status !== "upcoming") {
                                  setCurrentLesson({
                                    title: item.title,
                                    type: "interactive_video",
                                    duration: 25,
                                    progress: item.progress,
                                  })
                                  setCurrentView("lesson")
                                }
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold">{item.title}</h4>
                                  <p className="text-sm text-gray-600">{item.duration}</p>
                                  {item.progress > 0 && <Progress value={item.progress} className="mt-2 h-2" />}
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-base">Learning Stats</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">47</div>
                            <div className="text-xs text-gray-600">Hours This Month</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">12</div>
                            <div className="text-xs text-gray-600">Concepts Mastered</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Lesson View */}
            {currentView === "lesson" && currentLesson && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button variant="ghost" onClick={() => setCurrentView("learning")}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Learning
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{currentLesson.type}</Badge>
                    <Badge variant="outline">{currentLesson.duration} min</Badge>
                  </div>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">{currentLesson.title}</CardTitle>
                    <CardDescription>Interactive learning experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-blue-800">Interactive Video Content</p>
                        <p className="text-blue-600">Click to start learning</p>
                      </div>
                    </div>

                    {currentLesson.progress > 0 && (
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{currentLesson.progress}%</span>
                        </div>
                        <Progress value={currentLesson.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Button variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Ask Question
                      </Button>
                      <Button>
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Assessments View */}
            {currentView === "assessments" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Assessments</h1>
                  {userRole === "teacher" && (
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Assessment
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {assessments.map((assessment) => (
                    <Card
                      key={assessment.id}
                      className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                      onClick={() => {
                        setSelectedAssessment(assessment)
                        setCurrentView("assessment-detail")
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{assessment.title}</CardTitle>
                          <Badge
                            variant={
                              assessment.status === "completed"
                                ? "default"
                                : assessment.status === "available"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {assessment.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <CardDescription>{assessment.type} assessment</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Duration:</span>
                            <span>{assessment.duration}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Questions:</span>
                            <span>{assessment.questions}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Difficulty:</span>
                            <Badge variant="outline" className="text-xs">
                              {assessment.difficulty}
                            </Badge>
                          </div>
                          {assessment.status === "completed" && assessment.score && (
                            <div className="flex justify-between text-sm">
                              <span>Score:</span>
                              <span className="font-semibold text-green-600">{assessment.score}%</span>
                            </div>
                          )}
                          {assessment.status === "in_progress" && assessment.progress && (
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress:</span>
                                <span>{assessment.progress}%</span>
                              </div>
                              <Progress value={assessment.progress} className="h-2" />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Assessment Detail View */}
            {currentView === "assessment-detail" && selectedAssessment && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button variant="ghost" onClick={() => setCurrentView("assessments")}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Assessments
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{selectedAssessment.type}</Badge>
                    <Badge variant="outline">{selectedAssessment.difficulty}</Badge>
                  </div>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">{selectedAssessment.title}</CardTitle>
                    <CardDescription>
                      {selectedAssessment.questions} questions • {selectedAssessment.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-4">Assessment Details</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Type:</span>
                            <span className="capitalize">{selectedAssessment.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{selectedAssessment.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Questions:</span>
                            <span>{selectedAssessment.questions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Difficulty:</span>
                            <span>{selectedAssessment.difficulty}</span>
                          </div>
                          {selectedAssessment.dueDate && (
                            <div className="flex justify-between">
                              <span>Due:</span>
                              <span>{selectedAssessment.dueDate}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">Instructions</h3>
                        <div className="text-sm text-gray-600 space-y-2">
                          <p>• Read each question carefully before answering</p>
                          <p>• You can navigate between questions freely</p>
                          <p>• Your progress is automatically saved</p>
                          <p>• Submit when you're confident with your answers</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Questions
                      </Button>
                      {selectedAssessment.status === "available" && (
                        <Button>
                          <Play className="w-4 h-4 mr-2" />
                          Start Assessment
                        </Button>
                      )}
                      {selectedAssessment.status === "in_progress" && (
                        <Button>
                          <Play className="w-4 h-4 mr-2" />
                          Continue Assessment
                        </Button>
                      )}
                      {selectedAssessment.status === "completed" && (
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Results
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Students View (Teacher) */}
            {currentView === "students" && userRole === "teacher" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Students</h1>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {students.map((student) => (
                    <Card
                      key={student.id}
                      className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                      onClick={() => {
                        setSelectedStudent(student)
                        setCurrentView("student-detail")
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="font-semibold">{student.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{student.name}</CardTitle>
                            <CardDescription>Last active: {student.lastActive}</CardDescription>
                          </div>
                          <div
                            className={`w-3 h-3 rounded-full ${
                              student.status === "excelling"
                                ? "bg-green-500"
                                : student.status === "struggling"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                            }`}
                          />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Overall Progress</span>
                              <span>{student.progress}%</span>
                            </div>
                            <Progress value={student.progress} className="h-2" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Current Topic:</div>
                            <div className="font-medium">{student.currentTopic}</div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {student.subjects.map((subject, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Student Detail View (Teacher) */}
            {currentView === "student-detail" && selectedStudent && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button variant="ghost" onClick={() => setCurrentView("students")}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Students
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback className="text-xl font-bold">{selectedStudent.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-2xl">{selectedStudent.name}</CardTitle>
                            <CardDescription>
                              Status: <span className="capitalize">{selectedStudent.status}</span> • Last active:{" "}
                              {selectedStudent.lastActive}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold mb-3">Learning Progress</h3>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Overall Progress</span>
                                  <span>{selectedStudent.progress}%</span>
                                </div>
                                <Progress value={selectedStudent.progress} className="h-2" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Current Topic:</div>
                                <div className="font-medium">{selectedStudent.currentTopic}</div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-3">Subjects</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedStudent.subjects.map((subject, index) => (
                                <Badge key={index} variant="outline">
                                  {subject}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>AI Insights & Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedStudent.status === "struggling" ? (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                              <h4 className="font-medium text-red-800">Needs Attention</h4>
                              <p className="text-sm text-red-600 mt-1">
                                Student is struggling with current concepts. Consider providing additional support or
                                switching to visual learning materials.
                              </p>
                            </div>
                          ) : (
                            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                              <h4 className="font-medium text-green-800">Performing Well</h4>
                              <p className="text-sm text-green-600 mt-1">
                                Student is excelling and ready for more advanced challenges. Consider accelerating their
                                learning path.
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-base">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Meeting
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          Assign Task
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Analytics
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-base">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Completed Linear Equations</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Started Quadratic Equations</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Joined study group</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Settings View */}
            {currentView === "settings" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Settings</h1>

                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="learning">Learning</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="Sarah" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Johnson" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="sarah.johnson@example.com" />
                        </div>
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea id="bio" placeholder="Tell us about yourself..." />
                        </div>
                        <Button>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="learning" className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Learning Preferences</CardTitle>
                        <CardDescription>Customize your learning experience</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Adaptive Difficulty</Label>
                              <p className="text-sm text-gray-600">Automatically adjust content difficulty</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>AI Recommendations</Label>
                              <p className="text-sm text-gray-600">Receive personalized content suggestions</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Progress Tracking</Label>
                              <p className="text-sm text-gray-600">Track detailed learning analytics</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        <Button>
                          <Save className="w-4 h-4 mr-2" />
                          Save Preferences
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>Choose what notifications you want to receive</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Learning Reminders</Label>
                              <p className="text-sm text-gray-600">Daily study reminders</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Achievement Notifications</Label>
                              <p className="text-sm text-gray-600">When you earn badges or complete goals</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Progress Updates</Label>
                              <p className="text-sm text-gray-600">Weekly progress summaries</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                        <Button>
                          <Save className="w-4 h-4 mr-2" />
                          Save Settings
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="privacy" className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Privacy Settings</CardTitle>
                        <CardDescription>Control your data and privacy preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Data Analytics</Label>
                              <p className="text-sm text-gray-600">Allow anonymous usage analytics</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Profile Visibility</Label>
                              <p className="text-sm text-gray-600">Make profile visible to other students</p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Learning Data Sharing</Label>
                              <p className="text-sm text-gray-600">Share learning data with teachers</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        <Button>
                          <Save className="w-4 h-4 mr-2" />
                          Save Settings
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Analytics View (Teacher) */}
            {currentView === "analytics" && userRole === "teacher" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">28</div>
                          <div className="text-sm text-gray-600">Total Students</div>
                          <div className="text-xs text-green-600">+3 this month</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">92%</div>
                          <div className="text-sm text-gray-600">Avg Completion</div>
                          <div className="text-xs text-green-600">+5% this month</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">47</div>
                          <div className="text-sm text-gray-600">Avg Hours/Month</div>
                          <div className="text-xs text-green-600">+12% this month</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <Target className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">89%</div>
                          <div className="text-sm text-gray-600">Goal Achievement</div>
                          <div className="text-xs text-green-600">+8% this month</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Class Performance Trends</CardTitle>
                    <CardDescription>Cognitive skill development over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { skill: "Critical Thinking", current: 78, target: 75, trend: "+22%" },
                        { skill: "Problem Solving", current: 85, target: 80, trend: "+15%" },
                        { skill: "Knowledge Retention", current: 92, target: 85, trend: "+18%" },
                        { skill: "Collaborative Learning", current: 73, target: 80, trend: "+12%" },
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{item.skill}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-green-600 font-medium">{item.trend}</span>
                              <Badge
                                variant={item.current >= item.target ? "default" : "secondary"}
                                className={item.current >= item.target ? "bg-green-100 text-green-700" : ""}
                              >
                                {item.current >= item.target ? "On Track" : "Needs Focus"}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <Progress value={item.current} className="h-3" />
                            </div>
                            <div className="text-sm text-gray-600 min-w-0">
                              {item.current}% / {item.target}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* AI Insights View (Teacher) */}
            {currentView === "insights" && userRole === "teacher" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">AI Insights</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span>Students Needing Attention</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                          <h4 className="font-medium text-red-800">Emma Davis</h4>
                          <p className="text-sm text-red-600 mt-1">
                            Struggling with algebra concepts. Recommend visual learning materials and peer support.
                          </p>
                          <div className="mt-3 flex space-x-2">
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Contact
                            </Button>
                            <Button size="sm" variant="outline">
                              <Users className="w-4 h-4 mr-1" />
                              Assign Tutor
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span>Opportunities</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                          <h4 className="font-medium text-green-800">Advanced Students Ready</h4>
                          <p className="text-sm text-green-600 mt-1">
                            12 students are ready for advanced calculus concepts. Consider accelerating their
                            curriculum.
                          </p>
                          <div className="mt-3 flex space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Plus className="w-4 h-4 mr-1" />
                              Create Advanced Group
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="w-5 h-5 text-blue-500" />
                      <span>Curriculum Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                        <h4 className="font-medium text-blue-800">Visual Learning Content</h4>
                        <p className="text-sm text-blue-600 mt-1">
                          Students respond 40% better to visual content. Consider adding more interactive diagrams and
                          animations to geometry lessons.
                        </p>
                        <div className="mt-3">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Eye className="w-4 h-4 mr-1" />
                            Browse Visual Content
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg">
                        <h4 className="font-medium text-purple-800">Collaborative Learning</h4>
                        <p className="text-sm text-purple-600 mt-1">
                          Students in study groups show 25% better retention. Consider implementing more peer learning
                          activities.
                        </p>
                        <div className="mt-3">
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Users className="w-4 h-4 mr-1" />
                            Create Study Groups
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
