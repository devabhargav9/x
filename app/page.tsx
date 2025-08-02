"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Brain,
  Target,
  TrendingUp,
  Users,
  Lightbulb,
  Zap,
  AlertCircle,
  Award,
  BarChart3,
  Activity,
  Network,
  Sparkles,
  Radar,
  Gauge,
  BrainCircuit,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react"

export default function NextGenAdaptiveLearning() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [demoProgress, setDemoProgress] = useState(0)

  // Auto-cycle through features
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 5)
      setDemoProgress(0)
    }, 8000)

    return () => clearInterval(interval)
  }, [isPlaying])

  // Progress animation for active feature
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setDemoProgress((prev) => (prev >= 100 ? 0 : prev + 1.25))
    }, 100)

    return () => clearInterval(interval)
  }, [activeFeature, isPlaying])

  const features = [
    {
      id: 0,
      title: "Potential Recognition",
      subtitle: "Identify Unique Cognitive Strengths",
      description: "AI analyzes each student's natural abilities and cognitive patterns to unlock their true potential",
      icon: Radar,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-900/20 to-pink-900/20",
      borderColor: "border-purple-500/30",
    },
    {
      id: 1,
      title: "Neural Learning Adaptation",
      subtitle: "Brain-Optimized Content Delivery",
      description: "Personalize how information is presented based on individual neural processing preferences",
      icon: Network,
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-900/20 to-blue-900/20",
      borderColor: "border-cyan-500/30",
    },
    {
      id: 2,
      title: "Nurturing Intervention Engine",
      subtitle: "Intelligent Support & Challenges",
      description: "Provide personalized interventions and support exactly when students need it most",
      icon: Sparkles,
      color: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-900/20 to-green-900/20",
      borderColor: "border-emerald-500/30",
    },
    {
      id: 3,
      title: "Comprehensive Evaluation Dashboard",
      subtitle: "Real-time Insights for Educators",
      description: "Advanced analytics and AI insights to help educators make data-driven decisions",
      icon: Gauge,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-900/20 to-red-900/20",
      borderColor: "border-orange-500/30",
    },
    {
      id: 4,
      title: "Real-time Learning Optimization",
      subtitle: "Continuous Adaptation & Improvement",
      description: "Constantly optimize learning experiences based on real-time performance and engagement",
      icon: Activity,
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-900/20 to-purple-900/20",
      borderColor: "border-indigo-500/30",
    },
  ]

  const currentFeature = features[activeFeature]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                <BrainCircuit className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">AdaptiveLearn AI</h1>
                <p className="text-cyan-300">Next-Generation Adaptive Learning</p>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Revolutionary AI-powered platform that recognizes potential, adapts to neural patterns, and optimizes
              learning in real-time
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Feature Navigation */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Our Approach</h2>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white border-white/20 hover:bg-white/10"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pause Demo" : "Play Demo"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveFeature(0)
                  setDemoProgress(0)
                }}
                className="text-white border-white/20 hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              const isActive = activeFeature === index
              return (
                <Card
                  key={feature.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-br ${feature.bgColor} border ${feature.borderColor} scale-105 shadow-lg`
                      : "bg-black/20 border-white/10 hover:bg-white/5"
                  }`}
                  onClick={() => {
                    setActiveFeature(index)
                    setDemoProgress(0)
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                        isActive ? `bg-gradient-to-r ${feature.color}` : "bg-white/10"
                      }`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`font-semibold text-sm ${isActive ? "text-white" : "text-gray-300"}`}>
                      {feature.title}
                    </h3>
                    {isActive && (
                      <div className="mt-3">
                        <Progress value={demoProgress} className="h-1" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Active Feature Demo */}
        <div className="mb-12">
          <Card
            className={`bg-gradient-to-br ${currentFeature.bgColor} border ${currentFeature.borderColor} backdrop-blur`}
          >
            <CardHeader className="text-center pb-6">
              <div
                className={`w-20 h-20 bg-gradient-to-r ${currentFeature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
              >
                <currentFeature.icon className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-white mb-2">{currentFeature.title}</CardTitle>
              <CardDescription className="text-xl text-gray-300">{currentFeature.subtitle}</CardDescription>
              <p className="text-gray-400 max-w-2xl mx-auto mt-4">{currentFeature.description}</p>
            </CardHeader>
            <CardContent>
              {/* Feature-specific demo content */}
              {activeFeature === 0 && <PotentialRecognitionDemo />}
              {activeFeature === 1 && <NeuralAdaptationDemo />}
              {activeFeature === 2 && <NurturingEngineDemo />}
              {activeFeature === 3 && <EvaluationDashboardDemo />}
              {activeFeature === 4 && <OptimizationDemo />}
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-cyan-500/30 backdrop-blur">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Learning?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Experience the future of education with AI that truly understands and adapts to each learner's unique
                potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10 px-8 py-3 bg-transparent"
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

// Feature Demo Components
function PotentialRecognitionDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-white mb-4">Cognitive Strength Analysis</h4>
        {[
          { trait: "Analytical Thinking", strength: 94, trend: "↗️ Exceptional" },
          { trait: "Creative Problem Solving", strength: 87, trend: "↗️ Strong" },
          { trait: "Pattern Recognition", strength: 96, trend: "↗️ Exceptional" },
          { trait: "Abstract Reasoning", strength: 78, trend: "↗️ Developing" },
        ].map((trait, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-purple-200">{trait.trait}</span>
              <Badge className="bg-purple-600 text-white">{trait.trend}</Badge>
            </div>
            <Progress value={trait.strength} className="h-3" />
            <div className="text-right text-sm text-purple-300">{trait.strength}%</div>
          </div>
        ))}
      </div>
      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-white mb-4">Predicted Career Paths</h4>
        <div className="space-y-4">
          {[
            { path: "Data Scientist", match: 96, icon: BarChart3 },
            { path: "AI Research Engineer", match: 94, icon: Brain },
            { path: "Systems Architect", match: 89, icon: Network },
          ].map((career, index) => {
            const IconComponent = career.icon
            return (
              <div key={index} className="flex items-center space-x-4 p-4 bg-purple-900/30 rounded-lg">
                <IconComponent className="w-8 h-8 text-purple-400" />
                <div className="flex-1">
                  <div className="font-semibold text-white">{career.path}</div>
                  <div className="text-sm text-purple-300">{career.match}% compatibility match</div>
                </div>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">{career.match}%</Badge>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function NeuralAdaptationDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="text-center">
        <h4 className="text-xl font-semibold text-white mb-6">Learning Modality Optimization</h4>
        <div className="w-48 h-48 mx-auto relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full"></div>
          <div className="absolute inset-4 bg-gradient-to-r from-cyan-400/40 to-blue-400/40 rounded-full"></div>
          <div className="absolute inset-8 bg-gradient-to-r from-cyan-300/60 to-blue-300/60 rounded-full"></div>
          <div className="absolute inset-12 bg-white rounded-full flex items-center justify-center">
            <Brain className="w-12 h-12 text-cyan-600" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-cyan-200">Visual Processing</span>
            <span className="text-white font-bold">65%</span>
          </div>
          <Progress value={65} className="h-2" />
          <div className="flex justify-between items-center">
            <span className="text-cyan-200">Auditory Processing</span>
            <span className="text-white font-bold">25%</span>
          </div>
          <Progress value={25} className="h-2" />
          <div className="flex justify-between items-center">
            <span className="text-cyan-200">Kinesthetic Processing</span>
            <span className="text-white font-bold">10%</span>
          </div>
          <Progress value={10} className="h-2" />
        </div>
      </div>
      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-white mb-4">Real-time Adaptations</h4>
        <div className="space-y-4">
          <div className="p-4 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-500">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-cyan-300">Content Adjustment</span>
            </div>
            <p className="text-sm text-cyan-200">Increasing visual elements by 20% based on processing preference</p>
          </div>
          <div className="p-4 bg-blue-900/30 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-blue-300">Cognitive Load</span>
            </div>
            <p className="text-sm text-blue-200">Reducing information density by 15% to optimize comprehension</p>
          </div>
          <div className="p-4 bg-indigo-900/30 rounded-lg border-l-4 border-indigo-500">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-indigo-300">Timing Optimization</span>
            </div>
            <p className="text-sm text-indigo-200">Adjusting break intervals to 25 minutes for optimal attention</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function NurturingEngineDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="bg-red-900/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span>Needs Support</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-red-500 text-white">EM</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-white">Emma M.</div>
              <div className="text-sm text-red-300">Struggling with algebra</div>
            </div>
          </div>
          <div className="text-sm text-red-200">
            AI detected difficulty with abstract concepts. Recommending visual learning approach.
          </div>
          <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
            <Lightbulb className="w-4 h-4 mr-2" />
            Provide Support
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-green-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span>Excelling</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-green-500 text-white">AK</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-white">Alex K.</div>
              <div className="text-sm text-green-300">Advanced mathematics</div>
            </div>
          </div>
          <div className="text-sm text-green-200">
            Ready for calculus-level challenges. AI suggests acceleration path.
          </div>
          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
            <Target className="w-4 h-4 mr-2" />
            Accelerate Learning
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-blue-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span>AI Monitoring</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-blue-200">Active Students</span>
              <Badge className="bg-blue-600 text-white">247</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Interventions Today</span>
              <Badge className="bg-green-600 text-white">34</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Success Rate</span>
              <Badge className="bg-purple-600 text-white">94%</Badge>
            </div>
          </div>
          <div className="text-sm text-blue-200">
            AI continuously monitors learning patterns and provides interventions when needed.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function EvaluationDashboardDemo() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-900/30 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">247</div>
            <div className="text-sm text-blue-300">Active Learners</div>
            <div className="text-xs text-green-400">+12% this week</div>
          </CardContent>
        </Card>
        <Card className="bg-green-900/30 border-green-500/30">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">94%</div>
            <div className="text-sm text-green-300">Success Rate</div>
            <div className="text-xs text-green-400">+8% improvement</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-900/30 border-purple-500/30">
          <CardContent className="p-6 text-center">
            <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">1.2M</div>
            <div className="text-sm text-purple-300">AI Adaptations</div>
            <div className="text-xs text-purple-400">This month</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-900/30 border-orange-500/30">
          <CardContent className="p-6 text-center">
            <Award className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">89%</div>
            <div className="text-sm text-orange-300">Goal Achievement</div>
            <div className="text-xs text-orange-400">Above target</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-slate-900/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Learning Velocity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: "Mathematics", velocity: 87, trend: "+15%" },
                { subject: "Science", velocity: 92, trend: "+22%" },
                { subject: "Language Arts", velocity: 78, trend: "+8%" },
                { subject: "Critical Thinking", velocity: 95, trend: "+28%" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{item.subject}</span>
                    <Badge className="bg-green-600 text-white">{item.trend}</Badge>
                  </div>
                  <Progress value={item.velocity} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Real-time AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-900/30 border-l-4 border-green-500 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-300">Breakthrough Detected</span>
                </div>
                <p className="text-xs text-green-200">15 students showing accelerated pattern recognition</p>
              </div>
              <div className="p-3 bg-blue-900/30 border-l-4 border-blue-500 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-blue-300">Optimization Applied</span>
                </div>
                <p className="text-xs text-blue-200">Content difficulty adjusted for 23 students</p>
              </div>
              <div className="p-3 bg-purple-900/30 border-l-4 border-purple-500 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-purple-300">Potential Identified</span>
                </div>
                <p className="text-xs text-purple-200">New creative strengths discovered in 8 students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function OptimizationDemo() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="text-6xl font-bold text-indigo-400 mb-2">1,247</div>
        <div className="text-xl text-indigo-300 mb-4">Optimizations Per Minute</div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-300">Real-time AI Processing Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Radar className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Data Collection</h4>
          <p className="text-xs text-gray-400">Gathering learning signals</p>
          <Badge className="bg-red-600 text-white text-xs mt-2">Active</Badge>
        </div>

        <div className="text-center p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">AI Processing</h4>
          <p className="text-xs text-gray-400">Analyzing patterns</p>
          <Badge className="bg-blue-600 text-white text-xs mt-2">Processing</Badge>
        </div>

        <div className="text-center p-6 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Decision Making</h4>
          <p className="text-xs text-gray-400">Optimizing pathways</p>
          <Badge className="bg-green-600 text-white text-xs mt-2">Optimizing</Badge>
        </div>

        <div className="text-center p-6 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Implementation</h4>
          <p className="text-xs text-gray-400">Applying changes</p>
          <Badge className="bg-purple-600 text-white text-xs mt-2">Deploying</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-900/20 border-green-500/30 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">+34%</div>
            <div className="text-sm text-green-300 mb-1">Learning Efficiency</div>
            <div className="text-xs text-green-200">vs traditional methods</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-900/20 border-blue-500/30 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">-67%</div>
            <div className="text-sm text-blue-300 mb-1">Time to Mastery</div>
            <div className="text-xs text-blue-200">Average reduction</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-900/20 border-purple-500/30 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">+89%</div>
            <div className="text-sm text-purple-300 mb-1">Student Engagement</div>
            <div className="text-xs text-purple-200">Sustained attention</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
