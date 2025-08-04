"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AIChatbot } from "@/components/ai-chatbot"
import { MediaLearningInterface } from "@/components/media-learning-interface"
import {
  Brain,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Award,
  BarChart3,
  Eye,
  Activity,
  Gamepad2,
  Timer,
  Flame,
  Smile,
  Frown,
  Meh,
  Network,
  Sparkles,
  Gauge,
  BrainCircuit,
  Play,
  Pause,
  UserCheck,
  GraduationCap,
  MousePointer,
  HeadphonesIcon,
  MessageCircle,
  Video,
} from "lucide-react"

export default function AdaptiveLearningPrototype() {
  const [userRole, setUserRole] = useState<"student" | "teacher">("student")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeDemo, setActiveDemo] = useState(0)
  const [isLearning, setIsLearning] = useState(false)
  const [learningProgress, setLearningProgress] = useState(0)
  const [adaptationCount, setAdaptationCount] = useState(0)
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatbotMinimized, setChatbotMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState<"adaptive" | "media">("adaptive")

  // Simulate real-time learning
  useEffect(() => {
    if (isLearning) {
      const interval = setInterval(() => {
        setLearningProgress((prev) => {
          if (prev >= 100) {
            setIsLearning(false)
            setAdaptationCount((count) => count + 1)
            return 0
          }
          return prev + 2
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isLearning])

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Auto-show chatbot for students after 3 seconds
  useEffect(() => {
    if (userRole === "student") {
      const timer = setTimeout(() => {
        setShowChatbot(true)
        setChatbotMinimized(true)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setShowChatbot(false)
    }
  }, [userRole])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">X'Presso ALS</h1>
                <p className="text-xs text-gray-500">Neuro-Adaptive Learning Platform</p>
              </div>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setUserRole("student")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    userRole === "student" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <GraduationCap className="w-4 h-4 mr-1 inline" />
                  Student
                </button>
                <button
                  onClick={() => setUserRole("teacher")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    userRole === "teacher" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <UserCheck className="w-4 h-4 mr-1 inline" />
                  Teacher
                </button>
              </div>

              {/* AI Chatbot Toggle for Students */}
              {userRole === "student" && (
                <Button
                  onClick={() => {
                    setShowChatbot(true)
                    setChatbotMinimized(false)
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Tutor
                </Button>
              )}

              <Avatar className="w-8 h-8">
                <AvatarFallback className={userRole === "student" ? "bg-blue-500" : "bg-purple-500"}>
                  {userRole === "student" ? "JS" : "MT"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userRole === "student" ? (
          <StudentExperience
            isLearning={isLearning}
            setIsLearning={setIsLearning}
            learningProgress={learningProgress}
            adaptationCount={adaptationCount}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : (
          <TeacherExperience />
        )}
      </main>

      {/* AI Chatbot for Students */}
      {userRole === "student" && showChatbot && (
        <AIChatbot
          studentData={{
            name: "Jordan",
            currentTopic: "Quadratic Functions",
            performance: 87,
            learningStyle: { visual: 65, auditory: 25, kinesthetic: 10 },
            cognitiveState: { focus: 85, engagement: 92, comprehension: 78 },
            strugglingAreas: ["Abstract concepts", "Word problems"],
            strengths: ["Pattern recognition", "Visual analysis"],
          }}
          onClose={() => setShowChatbot(false)}
          isMinimized={chatbotMinimized}
          onToggleMinimize={() => setChatbotMinimized(!chatbotMinimized)}
        />
      )}
    </div>
  )
}

function StudentExperience({
  isLearning,
  setIsLearning,
  learningProgress,
  adaptationCount,
  activeTab,
  setActiveTab,
}: {
  isLearning: boolean
  setIsLearning: (learning: boolean) => void
  learningProgress: number
  adaptationCount: number
  activeTab: "adaptive" | "media"
  setActiveTab: (tab: "adaptive" | "media") => void
}) {
  const [selectedTopic, setSelectedTopic] = useState("quadratic-functions")
  const [learningStyle, setLearningStyle] = useState({ visual: 65, auditory: 25, kinesthetic: 10 })
  const [cognitiveState, setCognitiveState] = useState({ focus: 85, engagement: 92, comprehension: 78 })

  const studentProfile = {
    name: "Jordan",
    learningStyle: learningStyle,
    comprehensionLevel: cognitiveState.comprehension,
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section with Real-time AI Status */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">AI Active</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, Jordan! 👋</h2>
            <p className="text-blue-100 text-lg mb-4">Your AI tutor has prepared a personalized learning session</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Brain className="w-4 h-4" />
                <span>{adaptationCount} AI adaptations today</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>87% goal completion</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>AI Tutor available</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Level 12</div>
            <div className="text-blue-200">Mathematics</div>
            <div className="text-sm text-blue-300 mt-1">Next: Advanced Calculus</div>
          </div>
        </div>
      </div>

      {/* Learning Mode Tabs */}
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          <button
            onClick={() => setActiveTab("adaptive")}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
              activeTab === "adaptive" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Adaptive Learning</span>
          </button>
          <button
            onClick={() => setActiveTab("media")}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
              activeTab === "media" ? "bg-purple-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Interactive Media</span>
          </button>
        </div>
      </div>

      {activeTab === "adaptive" ? (
        <AdaptiveLearningContent
          isLearning={isLearning}
          setIsLearning={setIsLearning}
          learningProgress={learningProgress}
          adaptationCount={adaptationCount}
          learningStyle={learningStyle}
          cognitiveState={cognitiveState}
        />
      ) : (
        <MediaLearningInterface studentProfile={studentProfile} />
      )}
    </div>
  )
}

function AdaptiveLearningContent({
  isLearning,
  setIsLearning,
  learningProgress,
  adaptationCount,
  learningStyle,
  cognitiveState,
}: {
  isLearning: boolean
  setIsLearning: (learning: boolean) => void
  learningProgress: number
  adaptationCount: number
  learningStyle: { visual: number; auditory: number; kinesthetic: number }
  cognitiveState: { focus: number; engagement: number; comprehension: number }
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Learning Area */}
      <div className="lg:col-span-2 space-y-6">
        {/* AI-Powered Content Adaptation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>Adaptive Learning Session</span>
                </CardTitle>
                <CardDescription>AI is personalizing content based on your learning patterns</CardDescription>
              </div>
              <Button
                onClick={() => setIsLearning(!isLearning)}
                className={`${isLearning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
              >
                {isLearning ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Learning
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Learning Content Simulation */}
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quadratic Functions: Vertex Form</h3>

                {/* Visual Learning Component (Adapted based on learning style) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-gray-800 mb-2">Interactive Graph</h4>
                      <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <BarChart3 className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-sm text-gray-600">y = a(x - h)² + k</p>
                        </div>
                      </div>
                    </div>

                    {/* AI Adaptation Notice */}
                    {isLearning && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-green-800">AI Adaptation Active</span>
                        </div>
                        <p className="text-xs text-green-700">
                          Increasing visual elements by 20% based on your learning preference
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-gray-800 mb-2">Step-by-Step Solution</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                            1
                          </div>
                          <span>Identify the vertex (h, k)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                            2
                          </div>
                          <span>Determine the direction of opening</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                            3
                          </div>
                          <span>Plot additional points</span>
                        </div>
                      </div>
                    </div>

                    {/* Learning Progress */}
                    {isLearning && (
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Understanding Progress</span>
                          <span className="text-sm text-gray-500">{learningProgress}%</span>
                        </div>
                        <Progress value={learningProgress} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive Practice */}
              <div className="p-4 bg-white rounded-lg border">
                <h4 className="font-medium text-gray-800 mb-3">Practice Problem</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Find the vertex of: y = 2(x - 3)² + 1</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Vertex: (3, 1)
                    </Button>
                    <Button size="sm" variant="outline">
                      Vertex: (-3, 1)
                    </Button>
                    <Button size="sm" variant="outline">
                      Vertex: (3, -1)
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights and Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <span>AI Learning Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Visual Learner Detected</span>
                </div>
                <p className="text-sm text-blue-800">You respond 40% better to visual content. More diagrams added.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-900">Peak Performance Time</span>
                </div>
                <p className="text-sm text-green-800">
                  Your focus is highest at 2:30 PM. Schedule complex topics then.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-900">Cognitive Load Optimal</span>
                </div>
                <p className="text-sm text-purple-800">Current difficulty level is perfect for your learning pace.</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-orange-900">Next Challenge Ready</span>
                </div>
                <p className="text-sm text-orange-800">Ready for calculus concepts based on your progress pattern.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar - Real-time Analytics */}
      <div className="space-y-6">
        {/* Learning Style Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Network className="w-5 h-5 text-cyan-600" />
              <span>Learning Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Visual</span>
                  </div>
                  <span className="text-sm font-bold">{learningStyle.visual}%</span>
                </div>
                <Progress value={learningStyle.visual} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <HeadphonesIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Auditory</span>
                  </div>
                  <span className="text-sm font-bold">{learningStyle.auditory}%</span>
                </div>
                <Progress value={learningStyle.auditory} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MousePointer className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Kinesthetic</span>
                  </div>
                  <span className="text-sm font-bold">{learningStyle.kinesthetic}%</span>
                </div>
                <Progress value={learningStyle.kinesthetic} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Cognitive State */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-red-600" />
              <span>Cognitive State</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Focus Level</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-green-600">{cognitiveState.focus}%</span>
                </div>
              </div>
              <Progress value={cognitiveState.focus} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Engagement</span>
                <span className="text-sm font-bold text-blue-600">{cognitiveState.engagement}%</span>
              </div>
              <Progress value={cognitiveState.engagement} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Comprehension</span>
                <span className="text-sm font-bold text-purple-600">{cognitiveState.comprehension}%</span>
              </div>
              <Progress value={cognitiveState.comprehension} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-600" />
              <span>Smart Suggestions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Timer className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Take a Break</span>
              </div>
              <p className="text-xs text-blue-800">
                You've been focused for 45 minutes. A 5-minute break will help retention.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Users className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Study Group</span>
              </div>
              <p className="text-xs text-green-800">
                Join the Calculus study group at 3 PM for collaborative learning.
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Next Topic</span>
              </div>
              <p className="text-xs text-purple-800">Ready for "Completing the Square" based on your mastery level.</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Video className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Try Interactive Media</span>
              </div>
              <p className="text-xs text-orange-800">
                Switch to video learning with your AI companion for deeper concept understanding.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <span>Today's Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Problems Solved</span>
                </div>
                <span className="text-sm font-bold">12/15</span>
              </div>
              <Progress value={80} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Learning Streak</span>
                </div>
                <span className="text-sm font-bold">7 days</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">AI Adaptations</span>
                </div>
                <span className="text-sm font-bold">{adaptationCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TeacherExperience() {
  const [selectedStudent, setSelectedStudent] = useState("alex-kim")
  const [classMetrics, setClassMetrics] = useState({
    activeStudents: 28,
    avgPerformance: 87,
    aiInterventions: 12,
    completionRate: 94,
  })

  const students = [
    {
      id: "alex-kim",
      name: "Alex Kim",
      avatar: "AK",
      performance: 96,
      trend: "up",
      status: "excelling",
      aiInsight: "Ready for advanced challenges",
      cognitiveProfile: { visual: 45, auditory: 35, kinesthetic: 20 },
      recentActivity: "Completed advanced calculus problems",
      mood: "happy",
      focusLevel: 92,
      engagementLevel: 89,
    },
    {
      id: "emma-rodriguez",
      name: "Emma Rodriguez",
      avatar: "ER",
      performance: 73,
      trend: "down",
      status: "struggling",
      aiInsight: "Needs visual learning support",
      cognitiveProfile: { visual: 75, auditory: 15, kinesthetic: 10 },
      recentActivity: "Struggling with abstract concepts",
      mood: "neutral",
      focusLevel: 65,
      engagementLevel: 58,
    },
    {
      id: "marcus-johnson",
      name: "Marcus Johnson",
      avatar: "MJ",
      performance: 88,
      trend: "up",
      status: "improving",
      aiInsight: "Responding well to peer learning",
      cognitiveProfile: { visual: 30, auditory: 25, kinesthetic: 45 },
      recentActivity: "Improved problem-solving speed by 30%",
      mood: "happy",
      focusLevel: 84,
      engagementLevel: 91,
    },
  ]

  const currentStudent = students.find((s) => s.id === selectedStudent) || students[0]

  return (
    <div className="space-y-8">
      {/* Teacher Dashboard Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Good morning, Ms. Thompson! 👩‍🏫</h2>
            <p className="text-purple-100 text-lg mb-4">Your AI teaching assistant has insights ready</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{classMetrics.activeStudents}/30 students active</span>
              </div>
              <div className="flex items-center space-x-1">
                <Brain className="w-4 h-4" />
                <span>{classMetrics.aiInterventions} AI interventions today</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Class 10A</div>
            <div className="text-purple-200">Advanced Mathematics</div>
            <div className="text-sm text-purple-300 mt-1">Next: Physics Integration</div>
          </div>
        </div>
      </div>

      {/* Real-time Class Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">{classMetrics.activeStudents}/30</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600">2 students just joined</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                <p className="text-2xl font-bold text-gray-900">{classMetrics.avgPerformance}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-green-600">+5% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Interventions</p>
                <p className="text-2xl font-bold text-gray-900">{classMetrics.aiInterventions}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-purple-600">3 active now</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{classMetrics.completionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-orange-600">Above target</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Teaching Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI-Powered Class Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>AI Teaching Assistant</span>
              </CardTitle>
              <CardDescription>Real-time insights and recommendations for your class</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-900">Breakthrough Detected</h4>
                      <p className="text-sm text-green-700 mt-1">
                        15 students showing accelerated learning in quadratic functions. Consider introducing calculus
                        concepts.
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Create Advanced Content
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-600 text-green-600 bg-transparent">
                          View Details
                        </Button>
                      </div>
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
                        3 students (Emma, David, Sarah) struggling with abstract concepts. AI suggests visual learning
                        approaches.
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          Create Intervention
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-orange-600 text-orange-600 bg-transparent"
                        >
                          Schedule Meeting
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900">Optimal Teaching Moment</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Class attention is at peak (94%). Perfect time to introduce complex concepts.
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 mt-3">
                        Start Advanced Lesson
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Methodology & Data Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <span>AI Analysis Methodology</span>
              </CardTitle>
              <CardDescription>How we arrive at intelligent teaching recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Breakthrough Detection Methodology */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-900 mb-2">Breakthrough Detection Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-green-800 mb-1">Data Sources</div>
                          <ul className="text-green-700 space-y-1">
                            <li>• Problem-solving speed: +47% avg</li>
                            <li>• Accuracy rates: 92%+ sustained</li>
                            <li>• Engagement metrics: 89%+ focus</li>
                            <li>• Concept mastery: 15 students at 95%+</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-green-800 mb-1">AI Algorithm</div>
                          <ul className="text-green-700 space-y-1">
                            <li>• Pattern recognition on 72hr data</li>
                            <li>• Cognitive load analysis</li>
                            <li>• Learning velocity tracking</li>
                            <li>• Prerequisite mastery validation</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-green-800 mb-1">Confidence Metrics</div>
                          <ul className="text-green-700 space-y-1">
                            <li>• Statistical significance: 94%</li>
                            <li>• Sample size: 15/30 students</li>
                            <li>• Trend consistency: 3+ days</li>
                            <li>• Cross-validation score: 0.89</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Needed Methodology */}
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-orange-900 mb-2">Support Detection Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-orange-800 mb-1">Struggle Indicators</div>
                          <ul className="text-orange-700 space-y-1">
                            <li>• Emma: 3+ failed attempts on abstract concepts</li>
                            <li>• David: 65% accuracy drop in 2 days</li>
                            <li>• Sarah: Engagement below 45% threshold</li>
                            <li>• Time-on-task: 40% above class average</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-orange-800 mb-1">Learning Style Analysis</div>
                          <ul className="text-orange-700 space-y-1">
                            <li>• Visual preference: 75% (Emma)</li>
                            <li>• Current content: 80% text-based</li>
                            <li>• Mismatch correlation: 0.73</li>
                            <li>• Historical visual success: +34%</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-orange-800 mb-1">Intervention Timing</div>
                          <ul className="text-orange-700 space-y-1">
                            <li>• Early detection: Day 2 of struggle</li>
                            <li>• Optimal window: Next 24-48 hours</li>
                            <li>• Success probability: 78%</li>
                            <li>• Without intervention: 23% recovery</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optimal Moment Methodology */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-2">Optimal Teaching Moment Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-blue-800 mb-1">Attention Metrics</div>
                          <ul className="text-blue-700 space-y-1">
                            <li>• Class attention: 94% (peak threshold: 90%)</li>
                            <li>• Individual focus: 28/30 students &gt;85%</li>
                            <li>• Distraction events: 0 in last 8 minutes</li>
                            <li>• Cognitive load: Optimal (3.2/5 scale)</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-blue-800 mb-1">Readiness Indicators</div>
                          <ul className="text-blue-700 space-y-1">
                            <li>• Prerequisite mastery: 89% class average</li>
                            <li>• Recent success rate: 91% on practice</li>
                            <li>• Question frequency: +23% (curiosity spike)</li>
                            <li>• Engagement trajectory: Ascending 12 min</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-blue-800 mb-1">Timing Optimization</div>
                          <ul className="text-blue-700 space-y-1">
                            <li>• Window duration: 8-12 minutes remaining</li>
                            <li>• Historical success: 87% when &gt;90% attention</li>
                            <li>• Complexity budget: 2.1/5 available</li>
                            <li>• Retention prediction: 94% for new concepts</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real-time Data Sources */}
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-gray-600" />
                    <span>Real-time Data Sources</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-800">Behavioral Data</div>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Mouse/touch patterns</li>
                        <li>• Response timing</li>
                        <li>• Session duration</li>
                        <li>• Navigation patterns</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Performance Data</div>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Answer accuracy</li>
                        <li>• Problem-solving steps</li>
                        <li>• Error patterns</li>
                        <li>• Improvement velocity</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Engagement Data</div>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Active time on task</li>
                        <li>• Question asking frequency</li>
                        <li>• Help-seeking behavior</li>
                        <li>• Voluntary practice</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Cognitive Data</div>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Working memory load</li>
                        <li>• Attention span patterns</li>
                        <li>• Processing speed</li>
                        <li>• Metacognitive awareness</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Algorithm Transparency */}
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium text-indigo-900">AI Model Transparency</span>
                  </div>
                  <div className="text-right text-sm text-indigo-700">
                    <div>Model Version: v2.3.1 | Last Updated: 2 hours ago</div>
                    <div>Training Data: 2.4M student interactions | Accuracy: 94.2%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Performance Matrix */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Real-time Student Analytics</span>
              </CardTitle>
              <CardDescription>Live view of student engagement and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedStudent === student.id ? "bg-blue-50 border-blue-200" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedStudent(student.id)}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarFallback
                        className={`${
                          student.status === "excelling"
                            ? "bg-green-500"
                            : student.status === "struggling"
                              ? "bg-red-500"
                              : "bg-blue-500"
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
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {student.status}
                        </Badge>
                        {student.mood === "happy" ? (
                          <Smile className="w-4 h-4 text-green-500" />
                        ) : student.mood === "neutral" ? (
                          <Meh className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <Frown className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{student.aiInsight}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Focus: {student.focusLevel}%</span>
                        <span>Engagement: {student.engagementLevel}%</span>
                        <span>Performance: {student.performance}%</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg font-bold text-gray-900">{student.performance}%</span>
                        {student.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 text-red-500 transform rotate-180">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <Progress value={student.performance} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Detailed Student Analysis */}
        <div className="space-y-6">
          {/* Selected Student Deep Dive */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-purple-600" />
                <span>Student Deep Dive</span>
              </CardTitle>
              <CardDescription>{currentStudent.name} - Detailed Analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-purple-500 text-white">{currentStudent.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentStudent.name}</h3>
                    <p className="text-sm text-gray-600">{currentStudent.recentActivity}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Learning Style Profile</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Visual</span>
                      <span className="text-sm font-bold">{currentStudent.cognitiveProfile.visual}%</span>
                    </div>
                    <Progress value={currentStudent.cognitiveProfile.visual} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Auditory</span>
                      <span className="text-sm font-bold">{currentStudent.cognitiveProfile.auditory}%</span>
                    </div>
                    <Progress value={currentStudent.cognitiveProfile.auditory} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Kinesthetic</span>
                      <span className="text-sm font-bold">{currentStudent.cognitiveProfile.kinesthetic}%</span>
                    </div>
                    <Progress value={currentStudent.cognitiveProfile.kinesthetic} className="h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Current State</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{currentStudent.focusLevel}%</div>
                      <div className="text-xs text-blue-800">Focus</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{currentStudent.engagementLevel}%</div>
                      <div className="text-xs text-green-800">Engagement</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Intervention Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                <span>AI Interventions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentStudent.status === "struggling" ? (
                <>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-900">Immediate Support Needed</span>
                    </div>
                    <p className="text-xs text-red-800">Switch to visual learning materials immediately</p>
                    <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                      Apply Now
                    </Button>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-900">Peer Support</span>
                    </div>
                    <p className="text-xs text-orange-800">Pair with Alex Kim for collaborative learning</p>
                  </div>
                </>
              ) : currentStudent.status === "excelling" ? (
                <>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">Advanced Challenge</span>
                    </div>
                    <p className="text-xs text-green-800">Ready for calculus-level problems</p>
                    <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                      Unlock Content
                    </Button>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Mentorship Role</span>
                    </div>
                    <p className="text-xs text-blue-800">Could mentor struggling students</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Maintain Momentum</span>
                    </div>
                    <p className="text-xs text-blue-800">Continue current learning path</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Gamepad2 className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">Gamification</span>
                    </div>
                    <p className="text-xs text-purple-800">Add interactive elements to boost engagement</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Class-wide Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gauge className="w-5 h-5 text-indigo-600" />
                <span>Class Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Attention</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-green-600">94%</span>
                  </div>
                </div>
                <Progress value={94} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Comprehension Rate</span>
                  <span className="text-sm font-bold text-blue-600">87%</span>
                </div>
                <Progress value={87} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Engagement Level</span>
                  <span className="text-sm font-bold text-purple-600">91%</span>
                </div>
                <Progress value={91} className="h-2" />

                <div className="pt-2 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">247</div>
                    <div className="text-xs text-gray-500">AI adaptations this hour</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
