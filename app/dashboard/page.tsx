"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  Lightbulb,
  CheckCircle,
  BarChart3,
  Eye,
  Activity,
  Network,
  Sparkles,
  BrainCircuit,
  MessageCircle,
  Video,
  FileText,
  Headphones,
} from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "content">("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200">
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
            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Back to Platform
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "overview" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "analytics" ? "bg-purple-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "content" ? "bg-green-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Content
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "content" && <ContentTab />}
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
                <p className="text-sm font-medium text-gray-600">Active Learners</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Adaptations</p>
                <p className="text-2xl font-bold text-gray-900">45,231</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-purple-600">Real-time active</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                <p className="text-2xl font-bold text-gray-900">89%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-green-600">+7% improvement</span>
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
            <div className="mt-2">
              <span className="text-xs text-orange-600">Above target</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span>AI Chatbot Interactions</span>
            </CardTitle>
            <CardDescription>Student engagement with AI tutoring assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Daily Conversations</span>
                <span className="text-sm font-bold">1,247</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-800">Top Questions</div>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Concept explanations (34%)</li>
                    <li>• Practice problems (28%)</li>
                    <li>• Study strategies (22%)</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Satisfaction</div>
                  <div className="text-2xl font-bold text-green-600">4.8/5</div>
                  <div className="text-xs text-gray-500">Based on 892 ratings</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="w-5 h-5 text-purple-600" />
              <span>Learning Companion Usage</span>
            </CardTitle>
            <CardDescription>Interactive media learning sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Sessions</span>
                <span className="text-sm font-bold">342</span>
              </div>
              <Progress value={72} className="h-2" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-800">Content Types</div>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Video lessons (45%)</li>
                    <li>• Audio content (32%)</li>
                    <li>• PDF materials (23%)</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Avg Interactions</div>
                  <div className="text-2xl font-bold text-purple-600">5.2</div>
                  <div className="text-xs text-gray-500">Per session</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AnalyticsTab() {
  return (
    <div className="space-y-8">
      {/* Learning Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Learning Performance Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Interactive performance analytics would be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-green-600" />
              <span>Learning Styles</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Visual</span>
                  <span className="text-sm font-bold">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Auditory</span>
                  <span className="text-sm font-bold">32%</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Kinesthetic</span>
                  <span className="text-sm font-bold">23%</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-600" />
            <span>AI-Generated Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900">Cognitive Patterns</span>
              </div>
              <p className="text-sm text-blue-800">
                Students show 23% better retention when concepts are introduced with real-world examples
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-900">Optimal Timing</span>
              </div>
              <p className="text-sm text-green-800">
                Peak learning occurs between 10 AM - 12 PM and 2 PM - 4 PM across all age groups
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Network className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-purple-900">Adaptation Success</span>
              </div>
              <p className="text-sm text-purple-800">
                AI adaptations result in 34% faster concept mastery compared to static content
              </p>
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
      {/* Content Library */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-green-600" />
            <span>Interactive Content Library</span>
          </CardTitle>
          <CardDescription>AI-enhanced learning materials with companion features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2 mb-3">
                <Video className="w-5 h-5 text-red-500" />
                <span className="font-medium">Video Content</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total Videos:</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span>With AI Companion:</span>
                  <span className="font-medium">892</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Interactions:</span>
                  <span className="font-medium">4.2/video</span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2 mb-3">
                <Headphones className="w-5 h-5 text-green-500" />
                <span className="font-medium">Audio Content</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total Audio:</span>
                  <span className="font-medium">634</span>
                </div>
                <div className="flex justify-between">
                  <span>With AI Companion:</span>
                  <span className="font-medium">445</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Interactions:</span>
                  <span className="font-medium">3.8/session</span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="w-5 h-5 text-blue-500" />
                <span className="font-medium">PDF Materials</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total PDFs:</span>
                  <span className="font-medium">2,156</span>
                </div>
                <div className="flex justify-between">
                  <span>With AI Companion:</span>
                  <span className="font-medium">1,523</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Interactions:</span>
                  <span className="font-medium">5.1/document</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <span>Content Engagement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Session Duration</span>
                <span className="text-sm font-bold">18.5 min</span>
              </div>
              <Progress value={75} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completion Rate</span>
                <span className="text-sm font-bold">87%</span>
              </div>
              <Progress value={87} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Interaction Quality</span>
                <span className="text-sm font-bold">4.6/5</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <span>Top Performing Content</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-green-900">Jobs to be Done Framework</div>
                  <div className="text-sm text-green-700">Business Strategy</div>
                </div>
                <Badge className="bg-green-100 text-green-700">96% completion</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-blue-900">Design Thinking Principles</div>
                  <div className="text-sm text-blue-700">Innovation</div>
                </div>
                <Badge className="bg-blue-100 text-blue-700">94% completion</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <div className="font-medium text-purple-900">Customer Journey Mapping</div>
                  <div className="text-sm text-purple-700">User Experience</div>
                </div>
                <Badge className="bg-purple-100 text-purple-700">91% completion</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Creation Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>AI Content Enhancement Tools</span>
          </CardTitle>
          <CardDescription>Tools for creating and enhancing interactive learning content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <Video className="w-6 h-6" />
              <span className="text-sm">Add Video Companion</span>
            </Button>

            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <Headphones className="w-6 h-6" />
              <span className="text-sm">Enhance Audio</span>
            </Button>

            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
              <FileText className="w-6 h-6" />
              <span className="text-sm">Interactive PDF</span>
            </Button>

            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              <Brain className="w-6 h-6" />
              <span className="text-sm">AI Question Gen</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
