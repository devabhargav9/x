"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Send,
  Lightbulb,
  Target,
  CheckCircle,
  ArrowRight,
  Brain,
  Sparkles,
  FileText,
  Video,
  Headphones,
  X,
  RotateCcw,
} from "lucide-react"

interface LearningCompanionProps {
  contentType: "video" | "audio" | "pdf"
  contentTitle: string
  currentTopic: string
  studentProfile: {
    name: string
    learningStyle: { visual: number; auditory: number; kinesthetic: number }
    comprehensionLevel: number
  }
  onClose?: () => void
}

interface InteractionPoint {
  timestamp: number
  concept: string
  question: string
  realWorldExample: string
  followUpQuestions: string[]
  expectedKeywords: string[]
  difficulty: "easy" | "medium" | "hard"
}

interface StudentResponse {
  id: string
  question: string
  answer: string
  timestamp: Date
  score: number
  feedback: string
  isCorrect: boolean
}

export function LearningCompanion({
  contentType,
  contentTitle,
  currentTopic,
  studentProfile,
  onClose,
}: LearningCompanionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(300) // 5 minutes example
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [currentInteraction, setCurrentInteraction] = useState<InteractionPoint | null>(null)
  const [studentAnswer, setStudentAnswer] = useState("")
  const [responses, setResponses] = useState<StudentResponse[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)
  const [comprehensionScore, setComprehensionScore] = useState(85)

  // Simulated interaction points based on content
  const interactionPoints: InteractionPoint[] = [
    {
      timestamp: 45,
      concept: "Jobs to be Done Framework",
      question: "How do you think Uber applies the 'Jobs to be Done' framework to understand their customers?",
      realWorldExample: "When someone 'hires' Uber, what job are they really trying to get done?",
      followUpQuestions: [
        "What alternatives did people use before Uber?",
        "What emotional and social jobs does Uber fulfill?",
        "How does this differ from traditional taxi services?",
      ],
      expectedKeywords: ["transportation", "convenience", "reliability", "status", "safety"],
      difficulty: "medium",
    },
    {
      timestamp: 120,
      concept: "Customer Job Mapping",
      question: "Can you map out the different 'jobs' a Netflix subscriber might be hiring the service for?",
      realWorldExample: "Think beyond just 'watching movies' - what deeper needs does Netflix satisfy?",
      followUpQuestions: [
        "How does Netflix compete with social media for attention?",
        "What job does Netflix do that movie theaters can't?",
        "How has Netflix's job evolved since it started?",
      ],
      expectedKeywords: ["entertainment", "relaxation", "social connection", "escape", "convenience"],
      difficulty: "medium",
    },
    {
      timestamp: 200,
      concept: "Outcome-Driven Innovation",
      question: "How might Amazon use outcome-driven innovation to improve their delivery service?",
      realWorldExample:
        "What outcomes do customers really want from package delivery, beyond just 'getting the package'?",
      followUpQuestions: [
        "What are the emotional outcomes customers seek?",
        "How do delivery expectations vary by customer segment?",
        "What innovations has Amazon introduced to improve these outcomes?",
      ],
      expectedKeywords: ["speed", "reliability", "tracking", "security", "convenience"],
      difficulty: "hard",
    },
  ]

  // Simulate content playback
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && !currentInteraction) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1

          // Check for interaction points
          const nextInteraction = interactionPoints.find(
            (point) => point.timestamp === newTime && !responses.some((r) => r.question === point.question),
          )

          if (nextInteraction) {
            setIsPlaying(false)
            setCurrentInteraction(nextInteraction)
          }

          return newTime >= duration ? duration : newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentInteraction, duration, responses])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted)
  }

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setStudentAnswer("Uber helps people get from point A to point B conveniently without owning a car")
        setIsListening(false)
      }, 3000)
    }
  }

  const analyzeResponse = (
    answer: string,
    interaction: InteractionPoint,
  ): { score: number; feedback: string; isCorrect: boolean } => {
    const lowerAnswer = answer.toLowerCase()
    const keywordMatches = interaction.expectedKeywords.filter((keyword) =>
      lowerAnswer.includes(keyword.toLowerCase()),
    ).length

    const score = Math.min(
      100,
      (keywordMatches / interaction.expectedKeywords.length) * 100 + (answer.length > 50 ? 20 : 0),
    ) // Bonus for detailed answers

    let feedback = ""
    const isCorrect = score >= 60

    if (score >= 80) {
      feedback =
        "Excellent analysis! You've identified key aspects of how this concept applies to real-world scenarios."
    } else if (score >= 60) {
      feedback =
        "Good thinking! You're on the right track. Consider also thinking about the emotional and social aspects."
    } else {
      feedback = "That's a start! Try to think more specifically about the customer's underlying needs and motivations."
    }

    return { score, feedback, isCorrect }
  }

  const handleSubmitAnswer = () => {
    if (!currentInteraction || !studentAnswer.trim()) return

    const analysis = analyzeResponse(studentAnswer, currentInteraction)

    const newResponse: StudentResponse = {
      id: Date.now().toString(),
      question: currentInteraction.question,
      answer: studentAnswer,
      timestamp: new Date(),
      score: analysis.score,
      feedback: analysis.feedback,
      isCorrect: analysis.isCorrect,
    }

    setResponses((prev) => [...prev, newResponse])
    setShowFeedback(true)
    setInteractionCount((prev) => prev + 1)

    // Update comprehension score
    setComprehensionScore((prev) => {
      const newScore = (prev + analysis.score) / 2
      return Math.round(newScore)
    })
  }

  const handleContinueLearning = () => {
    setCurrentInteraction(null)
    setStudentAnswer("")
    setShowFeedback(false)
    setIsPlaying(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getContentIcon = () => {
    switch (contentType) {
      case "video":
        return <Video className="w-5 h-5" />
      case "audio":
        return <Headphones className="w-5 h-5" />
      case "pdf":
        return <FileText className="w-5 h-5" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">Learning Companion</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-purple-100">
                  {getContentIcon()}
                  <span>{contentTitle}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right text-sm">
                <div>Interactions: {interactionCount}</div>
                <div>Comprehension: {comprehensionScore}%</div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-6">
          {!currentInteraction ? (
            /* Media Player Interface */
            <div className="space-y-6">
              {/* Content Preview */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-8 text-white text-center">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {getContentIcon()}
                </div>
                <h3 className="text-xl font-semibold mb-2">{contentTitle}</h3>
                <p className="text-gray-300">Learning: {currentTopic}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <Progress value={(currentTime / duration) * 100} className="h-2" />
              </div>

              {/* Media Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}>
                  <RotateCcw className="w-4 h-4" />
                </Button>

                <Button
                  onClick={handlePlayPause}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </Button>

                <Button variant="outline" size="sm" onClick={handleVolumeToggle}>
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>

              {/* Upcoming Interaction Preview */}
              {interactionPoints.some(
                (point) => point.timestamp > currentTime && !responses.some((r) => r.question === point.question),
              ) && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Next Interaction Coming Up</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Your learning companion will pause the content soon to help you connect concepts with real-world
                    examples.
                  </p>
                </div>
              )}

              {/* Previous Responses Summary */}
              {responses.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Your Learning Progress</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {responses.slice(-2).map((response) => (
                      <div key={response.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-600">Previous Question</span>
                          <Badge
                            className={
                              response.isCorrect ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                            }
                          >
                            {response.score}%
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-800 line-clamp-2">{response.question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Interactive Learning Session */
            <div className="space-y-6">
              {!showFeedback ? (
                <>
                  {/* Concept Introduction */}
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <Target className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-900">Concept: {currentInteraction.concept}</span>
                      <Badge className="bg-purple-100 text-purple-700">{currentInteraction.difficulty}</Badge>
                    </div>
                    <p className="text-purple-800 mb-4">{currentInteraction.realWorldExample}</p>
                  </div>

                  {/* Main Question */}
                  <div className="p-6 bg-white rounded-lg border-2 border-blue-200">
                    <div className="flex items-start space-x-3 mb-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-blue-500">
                          <Brain className="w-5 h-5 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">Think & Respond</h3>
                        <p className="text-gray-700 text-lg">{currentInteraction.question}</p>
                      </div>
                    </div>

                    {/* Answer Input */}
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Input
                          value={studentAnswer}
                          onChange={(e) => setStudentAnswer(e.target.value)}
                          placeholder="Type your answer here..."
                          className="flex-1"
                          onKeyPress={(e) => e.key === "Enter" && handleSubmitAnswer()}
                        />
                        <Button
                          onClick={handleVoiceToggle}
                          variant="outline"
                          className={`${isListening ? "bg-red-50 border-red-200" : ""}`}
                        >
                          {isListening ? <MicOff className="w-4 h-4 text-red-600" /> : <Mic className="w-4 h-4" />}
                        </Button>
                        <Button
                          onClick={handleSubmitAnswer}
                          disabled={!studentAnswer.trim()}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>

                      {isListening && (
                        <div className="flex items-center space-x-2 text-sm text-red-600">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span>Listening... Speak your answer</span>
                        </div>
                      )}

                      {/* Helpful Hints */}
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-900">Think about:</span>
                        </div>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          {currentInteraction.followUpQuestions.map((hint, index) => (
                            <li key={index}>• {hint}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Feedback Display */
                <div className="space-y-6">
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        responses[responses.length - 1]?.isCorrect ? "bg-green-100" : "bg-orange-100"
                      }`}
                    >
                      {responses[responses.length - 1]?.isCorrect ? (
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      ) : (
                        <Target className="w-8 h-8 text-orange-600" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {responses[responses.length - 1]?.isCorrect ? "Great Analysis!" : "Good Effort!"}
                    </h3>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {responses[responses.length - 1]?.score}%
                    </div>
                  </div>

                  {/* Your Answer */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Your Answer:</h4>
                    <p className="text-gray-700">{responses[responses.length - 1]?.answer}</p>
                  </div>

                  {/* Feedback */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Learning Companion Feedback:</h4>
                    <p className="text-blue-800">{responses[responses.length - 1]?.feedback}</p>
                  </div>

                  {/* Continue Button */}
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={handleContinueLearning}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8"
                    >
                      Continue Learning
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  {/* Progress Update */}
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-900">Comprehension Level Updated</span>
                      <span className="text-sm font-bold text-green-700">{comprehensionScore}%</span>
                    </div>
                    <Progress value={comprehensionScore} className="h-2" />
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
