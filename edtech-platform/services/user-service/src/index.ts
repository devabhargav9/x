import express from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { z } from "zod"

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

// User Registration Schema
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(["student", "teacher", "parent", "admin"]),
  gradeLevel: z.number().optional(),
})

// User Service Class
class UserService {
  async createUser(userData: z.infer<typeof registerSchema>) {
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        passwordHash: hashedPassword,
        role: userData.role,
        profile: {
          create: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            gradeLevel: userData.gradeLevel,
          },
        },
      },
      include: {
        profile: true,
      },
    })

    // Initialize learning profile for students
    if (userData.role === "student") {
      await this.initializeLearningProfile(user.id)
    }

    return user
  }

  async authenticateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    })

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new Error("Invalid credentials")
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "24h" })

    return { user, token }
  }

  async initializeLearningProfile(userId: string) {
    return await prisma.learningProfile.create({
      data: {
        userId,
        learningStyleData: {
          visual: 0.33,
          auditory: 0.33,
          kinesthetic: 0.33,
          initialized: false,
        },
        cognitiveAbilities: {
          processingSpeed: 0.5,
          workingMemory: 0.5,
          attention: 0.5,
          reasoning: 0.5,
        },
        learningPreferences: {
          optimalSessionLength: 30,
          preferredDifficulty: 0.5,
          feedbackFrequency: "immediate",
        },
      },
    })
  }

  async updateLearningProfile(userId: string, profileData: any) {
    return await prisma.learningProfile.update({
      where: { userId },
      data: {
        ...profileData,
        lastUpdated: new Date(),
      },
    })
  }
}

const userService = new UserService()

// Routes
app.post("/register", async (req, res) => {
  try {
    const userData = registerSchema.parse(req.body)
    const user = await userService.createUser(userData)
    res.status(201).json({ success: true, user })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await userService.authenticateUser(email, password)
    res.json({ success: true, ...result })
  } catch (error) {
    res.status(401).json({ success: false, error: error.message })
  }
})

app.put("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    const profile = await userService.updateLearningProfile(userId, req.body)
    res.json({ success: true, profile })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`)
})
