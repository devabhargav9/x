"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function DemoSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Choose Your Demo Experience</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Experience our adaptive learning platform from two different perspectives
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Version - Feature Demo */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 backdrop-blur rounded-2xl p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ArrowRight className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Feature Showcase</h2>
            <p className="text-gray-300 mb-6">
              Interactive demo highlighting our 5 core AI features with auto-cycling presentations and detailed
              explanations.
            </p>
            <ul className="text-left text-gray-400 text-sm mb-8 space-y-2">
              <li>• Potential Recognition Demo</li>
              <li>• Neural Learning Adaptation</li>
              <li>• Nurturing Intervention Engine</li>
              <li>• Comprehensive Evaluation Dashboard</li>
              <li>• Real-time Learning Optimization</li>
            </ul>
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                View Feature Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Previous Version - Full Dashboard */}
          <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/30 backdrop-blur rounded-2xl p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ArrowLeft className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Full Dashboard Experience</h2>
            <p className="text-gray-300 mb-6">
              Complete interactive dashboard showcasing personalized learning and adaptive features in action.
            </p>
            <ul className="text-left text-gray-400 text-sm mb-8 space-y-2">
              <li>• Student & Teacher Dashboards</li>
              <li>• AI Recommendations System</li>
              <li>• Learning Journey Tracking</li>
              <li>• Study Groups & Achievements</li>
              <li>• Content Management & Analytics</li>
            </ul>
            <Link href="/dashboard">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                View Full Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Both demos showcase the same underlying AI technology with different presentation approaches
          </p>
        </div>
      </div>
    </div>
  )
}
