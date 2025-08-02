import { PrismaClient } from "@prisma/client"
import axios from "axios"

const prisma = new PrismaClient()

interface LearningStyle {
  modalityPreferences: {
    visual: number
    auditory: number
    kinesthetic: number
  }
  cognitivePatterns: {
    processingSpeed: number
    attentionSpan: number
    workingMemory: number
    cognitiveLoadTolerance: number
  }
  optimalConditions: {
    preferredContentMix: {
      visual: number
      auditory: number
      kinesthetic: number
    }
    optimalDifficultyProgression: {
      startingDifficulty: number
      progressionRate: number
      maxDifficulty: number
    }
  }
}

interface ContentItem {
  id: string
  title: string
  contentType: string
  difficultyLevel: number
  learningModalities: string[]
  cognitiveLoadLevel: number
  estimatedDuration: number
  contentUrl?: string
  contentData?: any
}

class AdaptiveContentEngine {
  async getPersonalizedContent(userId: string, topicId: string, sessionContext: any): Promise<ContentItem[]> {
    // Get user's learning style
    const learningStyle = await this.getLearningStyle(userId)

    // Get available content for topic
    const availableContent = await this.getTopicContent(topicId)

    // Get user's current progress and performance
    const userProgress = await this.getUserProgress(userId, topicId)

    // Apply adaptive algorithms
    const adaptedContent = await this.adaptContent(availableContent, learningStyle, userProgress, sessionContext)

    return adaptedContent
  }

  private async getLearningStyle(userId: string): Promise<LearningStyle> {
    try {
      const response = await axios.get(`http://ai-engine:8001/learning-style/${userId}`)
      return response.data.learning_style
    } catch (error) {
      // Return default learning style if not available
      return this.getDefaultLearningStyle()
    }
  }

  private async getTopicContent(topicId: string): Promise<ContentItem[]> {
    const content = await prisma.contentItem.findMany({
      where: { topicId },
      orderBy: { difficultyLevel: "asc" },
    })

    return content.map((item) => ({
      id: item.id,
      title: item.title,
      contentType: item.contentType,
      difficultyLevel: item.difficultyLevel,
      learningModalities: item.learningModalities,
      cognitiveLoadLevel: item.cognitiveLoadLevel,
      estimatedDuration: item.estimatedDuration,
      contentUrl: item.contentUrl,
      contentData: item.contentData,
    }))
  }

  private async getUserProgress(userId: string, topicId: string) {
    const recentSessions = await prisma.learningSession.findMany({
      where: {
        userId,
        topicId,
      },
      orderBy: { startedAt: "desc" },
      take: 10,
      include: {
        interactions: true,
      },
    })

    return {
      averageAccuracy: this.calculateAverageAccuracy(recentSessions),
      currentDifficultyLevel: this.getCurrentDifficultyLevel(recentSessions),
      engagementTrend: this.calculateEngagementTrend(recentSessions),
      cognitiveLoadHistory: this.getCognitiveLoadHistory(recentSessions),
      preferredContentTypes: this.getPreferredContentTypes(recentSessions),
    }
  }

  private async adaptContent(
    availableContent: ContentItem[],
    learningStyle: LearningStyle,
    userProgress: any,
    sessionContext: any,
  ): Promise<ContentItem[]> {
    let adaptedContent = [...availableContent]

    // 1. Filter by appropriate difficulty level
    adaptedContent = this.filterByDifficulty(adaptedContent, learningStyle, userProgress)

    // 2. Prioritize by learning modality preferences
    adaptedContent = this.prioritizeByModality(adaptedContent, learningStyle)

    // 3. Adjust for cognitive load
    adaptedContent = this.adjustForCognitiveLoad(adaptedContent, learningStyle, sessionContext)

    // 4. Sequence for optimal learning progression
    adaptedContent = this.sequenceContent(adaptedContent, learningStyle, userProgress)

    // 5. Apply real-time adaptations based on current session
    adaptedContent = await this.applyRealTimeAdaptations(adaptedContent, userId, sessionContext)

    return adaptedContent.slice(0, 10) // Return top 10 items
  }

  private filterByDifficulty(content: ContentItem[], learningStyle: LearningStyle, userProgress: any): ContentItem[] {
    const optimalDifficulty = this.calculateOptimalDifficulty(learningStyle, userProgress)
    const difficultyRange = 2 // Allow ±2 difficulty levels

    return content.filter((item) => Math.abs(item.difficultyLevel - optimalDifficulty) <= difficultyRange)
  }

  private prioritizeByModality(content: ContentItem[], learningStyle: LearningStyle): ContentItem[] {
    return content.sort((a, b) => {
      const scoreA = this.calculateModalityScore(a, learningStyle)
      const scoreB = this.calculateModalityScore(b, learningStyle)
      return scoreB - scoreA
    })
  }

  private calculateModalityScore(content: ContentItem, learningStyle: LearningStyle): number {
    let score = 0
    const preferences = learningStyle.modalityPreferences

    content.learningModalities.forEach((modality) => {
      switch (modality) {
        case "visual":
          score += preferences.visual
          break
        case "auditory":
          score += preferences.auditory
          break
        case "kinesthetic":
          score += preferences.kinesthetic
          break
      }
    })

    return score / content.learningModalities.length
  }

  private adjustForCognitiveLoad(
    content: ContentItem[],
    learningStyle: LearningStyle,
    sessionContext: any,
  ): ContentItem[] {
    const maxCognitiveLoad = learningStyle.cognitivePatterns.cognitiveLoadTolerance * 5
    const currentSessionLoad = sessionContext.currentCognitiveLoad || 0

    return content.filter((item) => item.cognitiveLoadLevel + currentSessionLoad <= maxCognitiveLoad)
  }

  private sequenceContent(content: ContentItem[], learningStyle: LearningStyle, userProgress: any): ContentItem[] {
    // Implement intelligent sequencing based on:
    // - Prerequisite relationships
    // - Optimal difficulty progression
    // - Spaced repetition principles
    // - User's attention span patterns

    const attentionSpan = learningStyle.cognitivePatterns.attentionSpan
    const sessionDuration = attentionSpan * 3600 // Convert to seconds

    const sequencedContent: ContentItem[] = []
    let currentDuration = 0

    // Start with foundational content
    const foundational = content.filter((item) => item.difficultyLevel <= 3)
    const intermediate = content.filter((item) => item.difficultyLevel > 3 && item.difficultyLevel <= 7)
    const advanced = content.filter((item) => item.difficultyLevel > 7)

    // Sequence based on user's current level and session capacity
    for (const item of [...foundational, ...intermediate, ...advanced]) {
      if (currentDuration + item.estimatedDuration <= sessionDuration) {
        sequencedContent.push(item)
        currentDuration += item.estimatedDuration
      }
    }

    return sequencedContent
  }

  private async applyRealTimeAdaptations(
    content: ContentItem[],
    userId: string,
    sessionContext: any,
  ): Promise<ContentItem[]> {
    // Check recent performance in current session
    const recentInteractions = await this.getRecentInteractions(userId, 5)

    if (recentInteractions.length > 0) {
      const avgAccuracy =
        recentInteractions.reduce((sum, interaction) => sum + (interaction.accuracy || 0), 0) /
        recentInteractions.length

      const avgEngagement =
        recentInteractions.reduce((sum, interaction) => sum + (interaction.engagementScore || 0), 0) /
        recentInteractions.length

      // If struggling, provide easier content or different modality
      if (avgAccuracy < 0.6) {
        content = content.filter((item) => item.difficultyLevel <= 5)
      }

      // If disengaged, switch content type
      if (avgEngagement < 0.5) {
        const currentType = recentInteractions[0]?.contentType
        content = content.filter((item) => item.contentType !== currentType)
      }

      // If performing well, can increase difficulty
      if (avgAccuracy > 0.8 && avgEngagement > 0.7) {
        content = content.filter((item) => item.difficultyLevel >= 4)
      }
    }

    return content
  }

  // Helper methods
  private calculateOptimalDifficulty(learningStyle: LearningStyle, userProgress: any): number {
    const baseDifficulty = learningStyle.optimalConditions.optimalDifficultyProgression.startingDifficulty * 10
    const progressionAdjustment = userProgress.currentDifficultyLevel || 0
    return Math.min(10, Math.max(1, baseDifficulty + progressionAdjustment))
  }

  private calculateAverageAccuracy(sessions: any[]): number {
    if (sessions.length === 0) return 0.5

    const totalAccuracy = sessions.reduce((sum, session) => {
      const sessionAccuracy =
        session.interactions.reduce((acc: number, interaction: any) => acc + (interaction.accuracy || 0), 0) /
        (session.interactions.length || 1)
      return sum + sessionAccuracy
    }, 0)

    return totalAccuracy / sessions.length
  }

  private getCurrentDifficultyLevel(sessions: any[]): number {
    if (sessions.length === 0) return 3

    const recentSession = sessions[0]
    const difficulties = recentSession.interactions.map((i: any) => i.difficultyLevel || 3)
    return difficulties.reduce((sum: number, diff: number) => sum + diff, 0) / difficulties.length
  }

  private calculateEngagementTrend(sessions: any[]): number {
    if (sessions.length < 2) return 0

    const recent = sessions.slice(0, 3).reduce((sum, s) => sum + (s.engagementScore || 0), 0) / 3
    const older = sessions.slice(3, 6).reduce((sum, s) => sum + (s.engagementScore || 0), 0) / 3

    return recent - older
  }

  private getCognitiveLoadHistory(sessions: any[]): number[] {
    return sessions.map((session) => session.cognitiveLoadDetected || 3)
  }

  private getPreferredContentTypes(sessions: any[]): string[] {
    const typeFrequency: { [key: string]: number } = {}

    sessions.forEach((session) => {
      session.contentItemsViewed?.forEach((contentId: string) => {
        // This would need to be enhanced to get actual content types
        // For now, using a simplified approach
      })
    })

    return Object.keys(typeFrequency).sort((a, b) => typeFrequency[b] - typeFrequency[a])
  }

  private async getRecentInteractions(userId: string, limit: number) {
    return await prisma.learningInteraction.findMany({
      where: {
        session: {
          userId,
        },
      },
      orderBy: { timestamp: "desc" },
      take: limit,
    })
  }

  private getDefaultLearningStyle(): LearningStyle {
    return {
      modalityPreferences: {
        visual: 0.4,
        auditory: 0.3,
        kinesthetic: 0.3,
      },
      cognitivePatterns: {
        processingSpeed: 0.5,
        attentionSpan: 0.5,
        workingMemory: 0.5,
        cognitiveLoadTolerance: 0.5,
      },
      optimalConditions: {
        preferredContentMix: {
          visual: 0.4,
          auditory: 0.3,
          kinesthetic: 0.3,
        },
        optimalDifficultyProgression: {
          startingDifficulty: 0.3,
          progressionRate: 0.1,
          maxDifficulty: 0.8,
        },
      },
    }
  }
}

export default AdaptiveContentEngine
