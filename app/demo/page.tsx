"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BrainCircuit, Users, GraduationCap, UserCheck } from "lucide-react"

export default function DemoSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BrainCircuit className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">AdaptiveLearn AI Platform</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience our next-generation adaptive learning platform from different perspectives
          </p>
        </div>

        {/* Demo Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Student Experience */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 backdrop-blur rounded-2xl p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Student Experience</h2>
            <p className="text-gray-300 mb-6 text-center">
              See how AI personalizes learning in real-time, adapts to your style, and optimizes your educational
              journey.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Real-time AI content adaptation</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Personalized learning recommendations</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Cognitive state monitoring</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Interactive learning sessions</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Progress tracking & achievements</span>
              </div>
            </div>

            <Link href="/?role=student">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                Experience as Student
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Teacher Experience */}
          <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/30 backdrop-blur rounded-2xl p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Teacher Experience</h2>
            <p className="text-gray-300 mb-6 text-center">
              Discover how AI assists educators with real-time insights, student analytics, and intelligent
              interventions.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>AI teaching assistant insights</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span>Real-time student analytics</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Automated intervention suggestions</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span>Class performance monitoring</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Personalized teaching recommendations</span>
              </div>
            </div>

            <Link href="/?role=teacher">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white">
                Experience as Teacher
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="bg-gradient-to-r from-gray-900/50 to-slate-900/50 border border-gray-700/50 backdrop-blur rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Core AI Features Demonstrated</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Potential Recognition</h4>
              <p className="text-gray-400 text-sm">AI identifies unique cognitive strengths and learning patterns</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Neural Adaptation</h4>
              <p className="text-gray-400 text-sm">Content delivery optimized for individual brain processing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Real-time Optimization</h4>
              <p className="text-gray-400 text-sm">Continuous learning experience improvement and adaptation</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Both experiences showcase the same underlying AI technology with role-specific interfaces
          </p>
        </div>
      </div>
    </div>
  )
}
