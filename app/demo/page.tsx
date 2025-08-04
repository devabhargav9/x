"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Target,
  Users,
  Lightbulb,
  AlertCircle,
  BarChart3,
  Activity,
  Network,
  Sparkles,
  Gauge,
  BrainCircuit,
  ArrowRight,
  GraduationCap,
  UserCheck,
  MessageCircle,
  Radar,
  Video,
  Play,
} from "lucide-react"

export default function DemoPage() {
  const [selectedDemo, setSelectedDemo] = useState<"student" | "teacher" | null>(null)

  if (selectedDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <Button onClick={() => setSelectedDemo(null)} variant="outline" className="mb-4">
              ← Back to Demo Selection
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedDemo === "student" ? "Student Experience Demo" : "Teacher Experience Demo"}
            </h1>
            <p className="text-gray-600 mb-8">
              {selectedDemo === "student"
                ? "Experience personalized AI-powered learning with real-time adaptations and interactive media"
                : "Manage your classroom with AI insights and intelligent interventions"}
            </p>
            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              Launch {selectedDemo === "student" ? "Student" : "Teacher"} Experience
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {selectedDemo === "student" ? <StudentDemoFeatures /> : <TeacherDemoFeatures />}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BrainCircuit className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">X'Presso ALS</h1>
                <p className="text-blue-600">Neuro-Adaptive Learning Platform</p>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your experience to see how AI transforms education for both learners and educators
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Demo Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Student Experience */}
          <Card className="relative overflow-hidden border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Student Experience</CardTitle>
              <CardDescription className="text-gray-600">
                Experience personalized AI-powered learning that adapts to your unique style and pace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">Real-time AI content adaptation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">AI chatbot tutor for instant help</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Video className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-700">Interactive media with learning companion</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Activity className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm text-gray-700">Cognitive state monitoring</span>
                </div>
              </div>
              <Button
                onClick={() => setSelectedDemo("student")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 group-hover:scale-105 transition-transform"
              >
                Try Student Experience
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Teacher Experience */}
          <Card className="relative overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-colors cursor-pointer group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-4">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Teacher Experience</CardTitle>
              <CardDescription className="text-gray-600">
                Manage your classroom with AI insights, intelligent interventions, and real-time analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-700">Real-time class analytics dashboard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">AI teaching assistant with insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">Intelligent intervention suggestions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm text-gray-700">Individual student deep-dive analysis</span>
                </div>
              </div>
              <Button
                onClick={() => setSelectedDemo("teacher")}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 group-hover:scale-105 transition-transform"
              >
                Try Teacher Experience
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature Highlights */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Revolutionary AI Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the six core pillars of next-generation adaptive learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Radar,
              title: "Potential Recognition",
              description: "AI identifies unique cognitive strengths and predicts optimal career paths",
              color: "from-purple-500 to-pink-500",
              bgColor: "bg-purple-50",
            },
            {
              icon: Network,
              title: "Neural Learning Adaptation",
              description: "Content delivery optimized for individual brain processing patterns",
              color: "from-cyan-500 to-blue-500",
              bgColor: "bg-cyan-50",
            },
            {
              icon: Sparkles,
              title: "Nurturing Intervention Engine",
              description: "Intelligent support and challenges delivered at the perfect moment",
              color: "from-emerald-500 to-green-500",
              bgColor: "bg-emerald-50",
            },
            {
              icon: Gauge,
              title: "Comprehensive Evaluation",
              description: "Real-time insights and analytics for data-driven educational decisions",
              color: "from-orange-500 to-red-500",
              bgColor: "bg-orange-50",
            },
            {
              icon: Activity,
              title: "Real-time Optimization",
              description: "Continuous learning experience improvement based on live performance",
              color: "from-indigo-500 to-purple-500",
              bgColor: "bg-indigo-50",
            },
            {
              icon: Play,
              title: "Learning Companion",
              description: "AI pauses media content to map concepts with real-world scenarios",
              color: "from-blue-500 to-indigo-500",
              bgColor: "bg-blue-50",
            },
          ].map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className={`${feature.bgColor} border-0 hover:shadow-lg transition-shadow`}>
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Education?</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Experience the future of learning with AI that truly understands and adapts to each learner's unique
                potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
                >
                  Launch Full Platform
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg bg-transparent"
                >
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function StudentDemoFeatures() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <span>AI Content Adaptation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Real-time difficulty adjustment</li>
              <li>• Learning style optimization</li>
              <li>• Cognitive load management</li>
              <li>• Personalized content delivery</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-green-600" />
              <span>AI Tutor Chatbot</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Instant help and explanations</li>
              <li>• Personalized practice problems</li>
              <li>• Learning strategy suggestions</li>
              <li>• 24/7 availability</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-purple-600" />
              <span>Learning Companion</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Smart media pausing</li>
              <li>• Real-world concept mapping</li>
              <li>• Voice & text responses</li>
              <li>• Interactive questioning</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-600" />
              <span>Progress Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Real-time progress updates</li>
              <li>• Achievement milestones</li>
              <li>• Learning streak tracking</li>
              <li>• Goal completion metrics</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TeacherDemoFeatures() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span>Class Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Real-time student monitoring</li>
              <li>• Performance trend analysis</li>
              <li>• Engagement level tracking</li>
              <li>• Completion rate metrics</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <span>AI Teaching Assistant</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Intelligent intervention suggestions</li>
              <li>• Breakthrough detection alerts</li>
              <li>• Optimal teaching moments</li>
              <li>• Content creation recommendations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Student Deep Dive</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Individual learning profiles</li>
              <li>• Cognitive pattern analysis</li>
              <li>• Learning style breakdowns</li>
              <li>• Performance predictions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span>Smart Interventions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Automated support identification</li>
              <li>• Personalized intervention plans</li>
              <li>• Peer learning suggestions</li>
              <li>• Advanced challenge unlocking</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
