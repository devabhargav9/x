-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher', 'parent', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    grade_level INTEGER,
    school_id UUID,
    avatar_url TEXT,
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Learning Analytics and Profiles
CREATE TABLE learning_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    learning_style_data JSONB NOT NULL DEFAULT '{}',
    cognitive_abilities JSONB NOT NULL DEFAULT '{}',
    learning_preferences JSONB NOT NULL DEFAULT '{}',
    optimal_learning_times JSONB NOT NULL DEFAULT '{}',
    attention_patterns JSONB NOT NULL DEFAULT '{}',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE potential_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    cognitive_strengths JSONB NOT NULL DEFAULT '{}',
    career_predictions JSONB NOT NULL DEFAULT '{}',
    skill_development_areas JSONB NOT NULL DEFAULT '{}',
    recommended_paths JSONB NOT NULL DEFAULT '{}',
    confidence_score DECIMAL(3,2),
    analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content Management
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    grade_levels INTEGER[] NOT NULL,
    prerequisites UUID[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 10),
    estimated_duration INTEGER, -- in minutes
    prerequisites UUID[],
    learning_objectives TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('video', 'text', 'interactive', 'quiz', 'simulation')),
    content_url TEXT,
    content_data JSONB,
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 10),
    estimated_duration INTEGER,
    learning_modalities VARCHAR(50)[] NOT NULL, -- visual, auditory, kinesthetic
    cognitive_load_level INTEGER CHECK (cognitive_load_level BETWEEN 1 AND 5),
    tags VARCHAR(100)[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adaptive Learning Engine
CREATE TABLE learning_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    session_duration INTEGER, -- in seconds
    content_items_viewed UUID[],
    engagement_score DECIMAL(3,2),
    comprehension_score DECIMAL(3,2),
    cognitive_load_detected INTEGER,
    adaptations_made JSONB DEFAULT '{}',
    session_metadata JSONB DEFAULT '{}'
);

CREATE TABLE learning_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES learning_sessions(id) ON DELETE CASCADE,
    content_item_id UUID REFERENCES content_items(id),
    interaction_type VARCHAR(50) NOT NULL,
    interaction_data JSONB NOT NULL DEFAULT '{}',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    response_time INTEGER, -- in milliseconds
    accuracy DECIMAL(3,2),
    confidence_level INTEGER CHECK (confidence_level BETWEEN 1 AND 5),
    emotional_state VARCHAR(50),
    cognitive_load INTEGER CHECK (cognitive_load BETWEEN 1 AND 5)
);

-- Assessment System
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID REFERENCES topics(id),
    title VARCHAR(300) NOT NULL,
    assessment_type VARCHAR(50) NOT NULL CHECK (assessment_type IN ('adaptive', 'fixed', 'diagnostic', 'formative', 'summative')),
    questions JSONB NOT NULL,
    difficulty_range INTEGER[] NOT NULL,
    time_limit INTEGER, -- in minutes
    passing_score DECIMAL(3,2),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assessment_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    score DECIMAL(5,2),
    max_score DECIMAL(5,2),
    questions_answered JSONB NOT NULL DEFAULT '{}',
    ability_estimate DECIMAL(4,2),
    confidence_interval JSONB,
    adaptive_path JSONB DEFAULT '{}',
    time_taken INTEGER -- in seconds
);

-- Recommendation Engine
CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recommendation_type VARCHAR(50) NOT NULL,
    content_item_id UUID REFERENCES content_items(id),
    topic_id UUID REFERENCES topics(id),
    recommendation_score DECIMAL(3,2) NOT NULL,
    reasoning TEXT,
    algorithm_version VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'viewed', 'accepted', 'dismissed'))
);

-- Progress Tracking
CREATE TABLE skill_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    skill_category VARCHAR(50) NOT NULL,
    current_level DECIMAL(5,2) NOT NULL,
    target_level DECIMAL(5,2),
    progress_history JSONB NOT NULL DEFAULT '[]',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, skill_name)
);

CREATE TABLE learning_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    goal_type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    target_date DATE,
    current_progress DECIMAL(5,2) DEFAULT 0,
    target_metrics JSONB NOT NULL DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Model Management
CREATE TABLE ml_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(100) NOT NULL,
    model_type VARCHAR(50) NOT NULL,
    version VARCHAR(20) NOT NULL,
    model_path TEXT NOT NULL,
    training_data_info JSONB,
    performance_metrics JSONB,
    deployment_status VARCHAR(20) DEFAULT 'inactive',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(model_name, version)
);

CREATE TABLE model_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID REFERENCES ml_models(id),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    prediction_type VARCHAR(50) NOT NULL,
    input_data JSONB NOT NULL,
    prediction_result JSONB NOT NULL,
    confidence_score DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics and Reporting
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB NOT NULL DEFAULT '{}',
    session_id UUID,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_learning_sessions_user_id ON learning_sessions(user_id);
CREATE INDEX idx_learning_sessions_started_at ON learning_sessions(started_at);
CREATE INDEX idx_learning_interactions_session_id ON learning_interactions(session_id);
CREATE INDEX idx_learning_interactions_timestamp ON learning_interactions(timestamp);
CREATE INDEX idx_assessment_attempts_user_id ON assessment_attempts(user_id);
CREATE INDEX idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX idx_recommendations_created_at ON recommendations(created_at);
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX idx_skill_progress_user_id ON skill_progress(user_id);

-- Functions for common operations
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_items_updated_at BEFORE UPDATE ON content_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
