"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LearningCompanion } from "./learning-companion"
import { Play, FileText, Video, Headphones, Brain, Sparkles, Target, BookOpen, Users, TrendingUp } from "lucide-react"

interface MediaContent {
  id: string
  title: string
  type: "video" | "audio" | "pdf"
  duration: string
  topic: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  interactionPoints: number
}

interface MediaLearningInterfaceProps {
  studentProfile: {
    name: string
    learningStyle: { visual: number; auditory: number; kinesthetic: number }
    comprehensionLevel: number
  }
}

export function MediaLearningInterface({ studentProfile }: MediaLearningInterfaceProps) {
  const [selectedContent, setSelectedContent] = useState<MediaContent | null>(null)
  const [showCompanion, setShowCompanion] = useState(false)

  const mediaContent: MediaContent[] = [
    {
      id: "1",
      title: "Jobs to be Done Framework Explained",
      type: "video",
      duration: "12:30",
      topic: "Business Strategy",
      description:
        "Learn how successful companies use the Jobs to be Done framework to understand customer needs and drive innovation.",
      difficulty: "Intermediate",
      interactionPoints: 3,
    },
    {
      id: "2",
      title: "Customer Journey Mapping Masterclass",
      type: "audio",
      duration: "18:45",
      topic: "User Experience",
      description:
        "Deep dive into creating effective customer journey maps with real-world examples from leading companies.",
      difficulty: "Advanced",
      interactionPoints: 4,
    },
    {
      id: "3",
      title: "Design Thinking Principles Guide",
      type: "pdf",
      duration: "25 min read",
      topic: "Innovation",
      description: "Comprehensive guide to applying design thinking methodology in business problem-solving.",
      difficulty: "Beginner",
      interactionPoints: 5,
    },
    {
      id: "4",
      title: "Lean Startup Methodology",
      type: "video",
      duration: "15:20",
      topic: "Entrepreneurship",
      description: "Understanding the build-measure-learn cycle and how to validate business ideas efficiently.",
      difficulty: "Intermediate",
      interactionPoints: 3,
    },
    {
      id: "5",
      title: "Behavioral Economics in Marketing",
      type: "audio",
      duration: "22:10",
      topic: "Marketing Psychology",
      description: "Explore how cognitive biases and psychological principles influence consumer decision-making.",
      difficulty: "Advanced",
      interactionPoints: 4,
    },
  ]

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5" />
      case "audio":
        return <Headphones className="w-5 h-5" />
      case "pdf":
        return <FileText className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "Advanced":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleStartLearning = (content: MediaContent) => {
    setSelectedContent(content)
    setShowCompanion(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Interactive Learning Content</h2>
        <p className="text-gray-600 mb-4">
          Learn with your AI companion that pauses content to help you connect concepts with real-world scenarios
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Brain className="w-4 h-4 text-purple-600" />
            <span>AI-Powered Interactions</span>
          </div>
          <div className="flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Real-World Examples</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="w-4 h-4 text-green-600" />
            <span>Concept Mapping</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaContent.map((content) => (
          <Card key={content.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      content.type === "video"
                        ? "bg-red-100"
                        : content.type === "audio"
                          ? "bg-green-100"
                          : "bg-blue-100"
                    }`}
                  >
                    {getContentIcon(content.type)}
                  </div>
                  <div>
                    <Badge className={getDifficultyColor(content.difficulty)}>{content.difficulty}</Badge>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>{content.duration}</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{content.interactionPoints} interactions</span>
                  </div>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{content.title}</CardTitle>
              <div className="text-sm text-purple-600 font-medium">{content.topic}</div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{content.description}</p>

              {/* Learning Features */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Brain className="w-3 h-3 text-purple-500" />
                  <span>AI pauses for concept mapping</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Users className="w-3 h-3 text-blue-500" />
                  <span>Real-world scenario questions</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span>Voice & text responses</span>
                </div>
              </div>

              <Button
                onClick={() => handleStartLearning(content)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 group-hover:scale-105 transition-transform"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Companion Modal */}
      {showCompanion && selectedContent && (
        <LearningCompanion
          contentType={selectedContent.type}
          contentTitle={selectedContent.title}
          currentTopic={selectedContent.topic}
          studentProfile={studentProfile}
          onClose={() => {
            setShowCompanion(false)
            setSelectedContent(null)
          }}
        />
      )}

      {/* Feature Explanation */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How Your Learning Companion Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div>
                  <div className="font-medium text-purple-900 mb-1">🎯 Smart Pausing</div>
                  <p>AI automatically pauses content at key concept moments for deeper understanding</p>
                </div>
                <div>
                  <div className="font-medium text-purple-900 mb-1">🌍 Real-World Mapping</div>
                  <p>Connects abstract concepts to practical examples like Uber, Netflix, Amazon</p>
                </div>
                <div>
                  <div className="font-medium text-purple-900 mb-1">🎤 Voice & Text Input</div>
                  <p>Respond naturally through speaking or typing your thoughts and analysis</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
