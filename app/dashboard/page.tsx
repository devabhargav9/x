"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Brain,
  TrendingUp,
  Users,
  BookOpen,
  Lightbulb,
  AlertCircle,
  Award,
  BarChart3,
  Eye,
  Activity,
  Gamepad2,
  BrainCircuit,
  Clock,
  MessageSquare,
  Settings,
  Bell,
  Search,
} from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AdaptiveLearn Dashboard</h1>
                <p className="text-xs text-gray-500">Comprehensive Learning Analytics</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-500 text-white">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8 w-fit">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "students", label: "Students", icon: Users },
            { id: "analytics", label: "Analytics", icon: Activity },
            { id: "content", label: "Content", icon: BookOpen },
            { id: "ai-insights", label: "AI Insights", icon: Brain },
          ].map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "students" && <StudentsTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "content" && <ContentTab />}
        {activeTab === "ai-insights" && <AIInsightsTab />}
      </main>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                <p className="text-3xl font-bold text-gray-900">87%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">+5% improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Adaptations</p>
                <p className="text-3xl font-bold text-gray-900">2.4M</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">This month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">94%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">Above target</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent AI Insights</CardTitle>
            <CardDescription>Latest intelligent observations from your platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Breakthrough Detected</p>
                <p className="text-xs text-gray-600">127 students showing accelerated learning patterns</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Support Needed</p>
                <p className="text-xs text-gray-600">23 students require intervention in calculus</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Optimization Applied</p>
                <p className="text-xs text-gray-600">Content difficulty adjusted for 89 students</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              View All Students
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Brain className="w-4 h-4 mr-2" />
              AI Insights Report
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Create New Content
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Performance Analytics
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Platform Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StudentsTab() {
  const students = [
    {
      id: 1,
      name: "Alex Kim",
      avatar: "AK",
      performance: 96,
      status: "excelling",
      lastActive: "2 min ago",
      currentTopic: "Advanced Calculus",
      aiInsights: "Ready for graduate-level content",
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      avatar: "ER",
      performance: 73,
      status: "struggling",
      lastActive: "15 min ago",
      currentTopic: "Quadratic Functions",
      aiInsights: "Needs visual learning support",
    },
    {
      id: 3,
      name: "Marcus Johnson",
      avatar: "MJ",
      performance: 88,
      status: "improving",
      lastActive: "5 min ago",
      currentTopic: "Statistics",
      aiInsights: "Responding well to peer learning",
    },
    {
      id: 4,
      name: "Sarah Chen",
      avatar: "SC",
      performance: 91,
      status: "excelling",
      lastActive: "1 min ago",
      currentTopic: "Linear Algebra",
      aiInsights: "Excellent pattern recognition skills",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Users className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {students.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
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
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.currentTopic}</p>
                    <p className="text-xs text-gray-500">Last active: {student.lastActive}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-gray-900">{student.performance}%</span>
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
                  </div>
                  <Progress value={student.performance} className="w-32 h-2" />
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <Brain className="w-4 h-4 inline mr-1 text-purple-600" />
                  AI Insight: {student.aiInsights}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AnalyticsTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Learning Analytics</h2>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Student performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: "Mathematics", trend: "+15%", value: 87 },
                { subject: "Science", trend: "+22%", value: 92 },
                { subject: "Language Arts", trend: "+8%", value: 78 },
                { subject: "Critical Thinking", trend: "+28%", value: 95 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                    <Badge className="bg-green-100 text-green-700">{item.trend}</Badge>
                  </div>
                  <Progress value={item.value} className="h-2" />
                  <div className="text-right text-xs text-gray-500">{item.value}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Modality Distribution</CardTitle>
            <CardDescription>How students prefer to learn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Visual Learners</span>
                </div>
                <span className="text-sm font-bold">45%</span>
              </div>
              <Progress value={45} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Auditory Learners</span>
                </div>
                <span className="text-sm font-bold">30%</span>
              </div>
              <Progress value={30} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gamepad2 className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Kinesthetic Learners</span>
                </div>
                <span className="text-sm font-bold">25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Metrics</CardTitle>
          <CardDescription>Real-time student engagement data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
              <div className="text-sm text-blue-800">Average Attention</div>
              <div className="text-xs text-blue-600 mt-1">+8% from last week</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
              <div className="text-sm text-green-800">Completion Rate</div>
              <div className="text-xs text-green-600 mt-1">+12% improvement</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">91%</div>
              <div className="text-sm text-purple-800">Satisfaction Score</div>
              <div className="text-xs text-purple-600 mt-1">Excellent rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ContentTab() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <BookOpen className="w-4 h-4 mr-2" />
          Create Content
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Quadratic Functions",
            type: "Interactive Lesson",
            students: 247,
            completion: 89,
            difficulty: "Intermediate",
            status: "active",
          },
          {
            title: "Linear Algebra Basics",
            type: "Video Series",
            students: 156,
            completion: 76,
            difficulty: "Beginner",
            status: "active",
          },
          {
            title: "Calculus Applications",
            type: "Practice Problems",
            students: 89,
            completion: 94,
            difficulty: "Advanced",
            status: "draft",
          },
          {
            title: "Statistics Overview",
            type: "Interactive Simulation",
            students: 203,
            completion: 82,
            difficulty: "Intermediate",
            status: "active",
          },
          {
            title: "Geometry Proofs",
            type: "Step-by-Step Guide",
            students: 134,
            completion: 67,
            difficulty: "Advanced",
            status: "review",
          },
          {
            title: "Probability Theory",
            type: "Mixed Content",
            students: 178,
            completion: 91,
            difficulty: "Intermediate",
            status: "active",
          },
        ].map((content, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{content.title}</CardTitle>
                <Badge
                  className={`${
                    content.status === "active"
                      ? "bg-green-100 text-green-700"
                      : content.status === "draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {content.status}
                </Badge>
              </div>
              <CardDescription>{content.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Students Enrolled</span>
                  <span className="font-semibold">{content.students}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-semibold">{content.completion}%</span>
                  </div>
                  <Progress value={content.completion} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Difficulty</span>
                  <Badge variant="outline">{content.difficulty}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AIInsightsTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">AI Insights & Recommendations</h2>

      {/* AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>Smart Recommendations</span>
            </CardTitle>
            <CardDescription>AI-powered suggestions for your platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900">Content Optimization</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Increase visual elements in algebra content by 25% to improve comprehension rates.
                  </p>
                  <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                    Apply Recommendation
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900">Student Grouping</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Create study groups based on complementary learning styles for better peer learning.
                  </p>
                  <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                    Create Groups
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-orange-900">Timing Optimization</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Schedule complex topics between 10-11 AM when student attention peaks.
                  </p>
                  <Button size="sm" className="mt-2 bg-orange-600 hover:bg-orange-700">
                    Update Schedule
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-red-600" />
              <span>Real-time Monitoring</span>
            </CardTitle>
            <CardDescription>Live AI analysis of your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">AI Processing Active</span>
                </div>
                <Badge className="bg-green-100 text-green-700">Optimal</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Content Adaptations/Hour</span>
                  <span className="text-sm font-bold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Learning Patterns Detected</span>
                  <span className="text-sm font-bold">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Interventions Triggered</span>
                  <span className="text-sm font-bold">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="text-sm font-bold text-green-600">94%</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-gray-900 mb-2">Recent AI Actions</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div>• Adjusted difficulty for 12 students in calculus</div>
                  <div>• Recommended break time for high-focus session</div>
                  <div>• Identified 3 students ready for advancement</div>
                  <div>• Optimized content sequence for visual learners</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>AI Performance Metrics</CardTitle>
          <CardDescription>How well our AI is helping your students learn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">+34%</div>
              <div className="text-sm text-purple-800">Learning Efficiency</div>
              <div className="text-xs text-purple-600">vs traditional methods</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">-67%</div>
              <div className="text-sm text-blue-800">Time to Mastery</div>
              <div className="text-xs text-blue-600">Average reduction</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">+89%</div>
              <div className="text-sm text-green-800">Student Engagement</div>
              <div className="text-xs text-green-600">Sustained attention</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">96%</div>
              <div className="text-sm text-orange-800">Prediction Accuracy</div>
              <div className="text-xs text-orange-600">Learning outcomes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
