"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Brain,
  Lightbulb,
  Target,
  BookOpen,
  TrendingUp,
  X,
  Minimize2,
  Sparkles,
  Award,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: string[]
  actionType?: "explanation" | "practice" | "hint" | "encouragement" | "challenge"
}

interface ChatbotProps {
  studentData: {
    name: string
    currentTopic: string
    performance: number
    learningStyle: { visual: number; auditory: number; kinesthetic: number }
    cognitiveState: { focus: number; engagement: number; comprehension: number }
    strugglingAreas?: string[]
    strengths?: string[]
  }
  onClose?: () => void
  isMinimized?: boolean
  onToggleMinimize?: () => void
}

export function AIChatbot({ studentData, onClose, isMinimized, onToggleMinimize }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `Hi ${studentData.name}! 👋 I'm your AI learning assistant. I've noticed you're working on ${studentData.currentTopic}. How can I help you learn better today?`,
      timestamp: new Date(),
      suggestions: [
        "Explain this concept",
        "Give me practice problems",
        "I'm struggling with this",
        "Show me examples",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    // Analyze user message and provide contextual response
    if (lowerMessage.includes("explain") || lowerMessage.includes("what is") || lowerMessage.includes("how")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: `Great question! Let me break down ${studentData.currentTopic} in a way that matches your learning style. Since you're ${studentData.learningStyle.visual > 50 ? "a visual learner" : studentData.learningStyle.auditory > 50 ? "an auditory learner" : "a kinesthetic learner"}, I'll ${studentData.learningStyle.visual > 50 ? "use diagrams and visual examples" : studentData.learningStyle.auditory > 50 ? "explain it step by step with clear verbal descriptions" : "provide hands-on examples you can work through"}.`,
        timestamp: new Date(),
        actionType: "explanation",
        suggestions: [
          "Show me a visual example",
          "Give me more details",
          "I understand, what's next?",
          "This is confusing",
        ],
      }
    }

    if (lowerMessage.includes("struggling") || lowerMessage.includes("difficult") || lowerMessage.includes("hard")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: `I understand this can be challenging! Your focus level is at ${studentData.cognitiveState.focus}%, which is actually quite good. Let me adjust the difficulty and provide some targeted support. Would you like me to break this down into smaller steps?`,
        timestamp: new Date(),
        actionType: "encouragement",
        suggestions: ["Yes, break it down", "Give me easier examples", "I need a different approach", "Take a break"],
      }
    }

    if (lowerMessage.includes("practice") || lowerMessage.includes("problems") || lowerMessage.includes("exercise")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: `Perfect! Based on your ${studentData.performance}% performance level, I'll create practice problems that are just right for you. I'll start with medium difficulty and adjust based on how you do.`,
        timestamp: new Date(),
        actionType: "practice",
        suggestions: [
          "Start with easy problems",
          "Give me challenging ones",
          "Mix of different types",
          "Show solutions step-by-step",
        ],
      }
    }

    if (lowerMessage.includes("hint") || lowerMessage.includes("help") || lowerMessage.includes("stuck")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: `Here's a hint that should help! Remember, the key to ${studentData.currentTopic} is to identify the pattern first. Try looking at the relationship between the variables. You're doing great - your comprehension is at ${studentData.cognitiveState.comprehension}%!`,
        timestamp: new Date(),
        actionType: "hint",
        suggestions: ["Give me another hint", "Show me the solution", "I got it!", "Still confused"],
      }
    }

    if (lowerMessage.includes("good") || lowerMessage.includes("understand") || lowerMessage.includes("got it")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: `Excellent work! 🎉 I can see your understanding is improving. Your engagement level is at ${studentData.cognitiveState.engagement}%. Ready for the next challenge? I think you're prepared for something slightly more advanced.`,
        timestamp: new Date(),
        actionType: "challenge",
        suggestions: [
          "Yes, challenge me!",
          "Give me more practice first",
          "Explain the next concept",
          "I want to review",
        ],
      }
    }

    if (lowerMessage.includes("break") || lowerMessage.includes("tired") || lowerMessage.includes("rest")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: `That's a smart decision! Your focus has been at ${studentData.cognitiveState.focus}% for a while. I recommend a 10-minute break. When you come back, we can continue with a fresh perspective. Remember, effective learning includes rest! 😊`,
        timestamp: new Date(),
        actionType: "encouragement",
        suggestions: [
          "Set a 10-minute timer",
          "I'll take a longer break",
          "Actually, let's continue",
          "What should I do during break?",
        ],
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "ai",
      content: `I'm here to help you learn ${studentData.currentTopic} more effectively! Based on your learning profile, I can provide personalized explanations, practice problems, or study strategies. What would be most helpful right now?`,
      timestamp: new Date(),
      suggestions: ["Explain a concept", "Give me practice", "Study tips", "Check my progress"],
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse = generateAIResponse(inputValue)
        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleMinimize}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">!</span>
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[600px] flex flex-col">
      <Card className="flex-1 flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Learning Assistant</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-blue-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Personalizing for you</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={onToggleMinimize} className="text-white hover:bg-white/20 p-1">
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 p-1">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className={message.type === "user" ? "bg-blue-500" : "bg-purple-500"}>
                    {message.type === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.actionType && (
                    <div className="mt-2">
                      <Badge
                        className={`text-xs ${
                          message.actionType === "explanation"
                            ? "bg-blue-100 text-blue-700"
                            : message.actionType === "practice"
                              ? "bg-green-100 text-green-700"
                              : message.actionType === "hint"
                                ? "bg-yellow-100 text-yellow-700"
                                : message.actionType === "encouragement"
                                  ? "bg-pink-100 text-pink-700"
                                  : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {message.actionType === "explanation" && <BookOpen className="w-3 h-3 mr-1" />}
                        {message.actionType === "practice" && <Target className="w-3 h-3 mr-1" />}
                        {message.actionType === "hint" && <Lightbulb className="w-3 h-3 mr-1" />}
                        {message.actionType === "encouragement" && <Award className="w-3 h-3 mr-1" />}
                        {message.actionType === "challenge" && <TrendingUp className="w-3 h-3 mr-1" />}
                        {message.actionType}
                      </Badge>
                    </div>
                  )}
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-purple-500">
                    <Bot className="w-4 h-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick suggestions */}
          {messages.length > 0 && messages[messages.length - 1].suggestions && !isTyping && (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-medium">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs h-7 bg-white hover:bg-gray-50"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input */}
        <div className="p-4 border-t bg-gray-50 rounded-b-lg">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your learning..."
              className="flex-1 bg-white"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Learning context indicators */}
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Brain className="w-3 h-3" />
                <span>Focus: {studentData.cognitiveState.focus}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Learning: {studentData.currentTopic}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>AI Active</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
