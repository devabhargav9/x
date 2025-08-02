import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPRegressor
import joblib
import asyncio
import aioredis
from typing import Dict, List, Any
import json

class LearningStyleAnalyzer:
    def __init__(self):
        self.scaler = StandardScaler()
        self.clustering_model = KMeans(n_clusters=8, random_state=42)
        self.redis_client = None
        
    async def initialize(self):
        self.redis_client = await aioredis.from_url("redis://localhost")
        
    async def analyze_learning_style(self, user_id: str, interaction_data: List[Dict]) -> Dict[str, Any]:
        """
        Analyze user's learning style based on interaction patterns
        """
        if not interaction_data:
            return self._default_learning_style()
            
        # Convert to DataFrame for analysis
        df = pd.DataFrame(interaction_data)
        
        # Extract features for learning style analysis
        features = self._extract_learning_features(df)
        
        # Analyze modality preferences
        modality_preferences = self._analyze_modality_preferences(df)
        
        # Analyze cognitive patterns
        cognitive_patterns = self._analyze_cognitive_patterns(df)
        
        # Analyze temporal patterns
        temporal_patterns = self._analyze_temporal_patterns(df)
        
        # Generate learning style profile
        learning_style = {
            'user_id': user_id,
            'modality_preferences': modality_preferences,
            'cognitive_patterns': cognitive_patterns,
            'temporal_patterns': temporal_patterns,
            'optimal_conditions': self._determine_optimal_conditions(
                modality_preferences, cognitive_patterns, temporal_patterns
            ),
            'confidence_score': self._calculate_confidence_score(features),
            'last_updated': pd.Timestamp.now().isoformat()
        }
        
        # Cache the results
        await self.redis_client.setex(
            f"learning_style:{user_id}", 
            3600, 
            json.dumps(learning_style)
        )
        
        return learning_style
    
    def _extract_learning_features(self, df: pd.DataFrame) -> np.ndarray:
        """Extract numerical features for ML analysis"""
        features = []
        
        # Time-based features
        features.append(df['response_time'].mean())
        features.append(df['response_time'].std())
        features.append(df['session_duration'].mean())
        
        # Performance features
        features.append(df['accuracy'].mean())
        features.append(df['engagement_score'].mean())
        features.append(df['completion_rate'].mean())
        
        # Content type preferences
        content_types = ['video', 'text', 'interactive', 'audio']
        for content_type in content_types:
            type_data = df[df['content_type'] == content_type]
            if len(type_data) > 0:
                features.append(type_data['engagement_score'].mean())
            else:
                features.append(0.0)
        
        # Difficulty preferences
        features.append(df['difficulty_level'].mean())
        features.append(df['difficulty_level'].std())
        
        return np.array(features).reshape(1, -1)
    
    def _analyze_modality_preferences(self, df: pd.DataFrame) -> Dict[str, float]:
        """Analyze visual, auditory, kinesthetic preferences"""
        modality_scores = {}
        
        # Visual preference (based on visual content engagement)
        visual_content = df[df['content_type'].isin(['video', 'image', 'diagram'])]
        modality_scores['visual'] = visual_content['engagement_score'].mean() if len(visual_content) > 0 else 0.5
        
        # Auditory preference (based on audio content engagement)
        audio_content = df[df['content_type'].isin(['audio', 'podcast', 'lecture'])]
        modality_scores['auditory'] = audio_content['engagement_score'].mean() if len(audio_content) > 0 else 0.5
        
        # Kinesthetic preference (based on interactive content engagement)
        interactive_content = df[df['content_type'].isin(['interactive', 'simulation', 'game'])]
        modality_scores['kinesthetic'] = interactive_content['engagement_score'].mean() if len(interactive_content) > 0 else 0.5
        
        # Normalize scores
        total = sum(modality_scores.values())
        if total > 0:
            modality_scores = {k: v/total for k, v in modality_scores.items()}
        
        return modality_scores
    
    def _analyze_cognitive_patterns(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Analyze cognitive processing patterns"""
        return {
            'processing_speed': self._calculate_processing_speed(df),
            'attention_span': self._calculate_attention_span(df),
            'working_memory': self._estimate_working_memory(df),
            'cognitive_load_tolerance': self._estimate_cognitive_load_tolerance(df),
            'learning_persistence': self._calculate_persistence(df)
        }
    
    def _analyze_temporal_patterns(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Analyze when and how long user learns best"""
        df['hour'] = pd.to_datetime(df['timestamp']).dt.hour
        
        # Find optimal learning hours
        hourly_performance = df.groupby('hour').agg({
            'engagement_score': 'mean',
            'accuracy': 'mean',
            'completion_rate': 'mean'
        })
        
        # Calculate composite performance score
        hourly_performance['composite_score'] = (
            hourly_performance['engagement_score'] * 0.4 +
            hourly_performance['accuracy'] * 0.4 +
            hourly_performance['completion_rate'] * 0.2
        )
        
        optimal_hours = hourly_performance.nlargest(3, 'composite_score').index.tolist()
        
        return {
            'optimal_hours': optimal_hours,
            'peak_performance_hour': optimal_hours[0] if optimal_hours else 10,
            'optimal_session_length': df['session_duration'].quantile(0.75),
            'break_frequency': self._calculate_break_frequency(df)
        }
    
    def _calculate_processing_speed(self, df: pd.DataFrame) -> float:
        """Calculate relative processing speed"""
        avg_response_time = df['response_time'].mean()
        # Normalize to 0-1 scale (lower time = higher speed)
        return max(0, min(1, 1 - (avg_response_time - 1000) / 10000))
    
    def _calculate_attention_span(self, df: pd.DataFrame) -> float:
        """Estimate attention span based on engagement patterns"""
        session_lengths = df.groupby('session_id')['session_duration'].first()
        return min(session_lengths.mean() / 3600, 1.0)  # Normalize to hours, cap at 1
    
    def _estimate_working_memory(self, df: pd.DataFrame) -> float:
        """Estimate working memory capacity"""
        # Based on performance with complex, multi-step problems
        complex_problems = df[df['complexity_level'] >= 3]
        if len(complex_problems) > 0:
            return complex_problems['accuracy'].mean()
        return 0.5
    
    def _estimate_cognitive_load_tolerance(self, df: pd.DataFrame) -> float:
        """Estimate tolerance for cognitive load"""
        high_load_content = df[df['cognitive_load'] >= 4]
        if len(high_load_content) > 0:
            return high_load_content['engagement_score'].mean()
        return 0.5
    
    def _calculate_persistence(self, df: pd.DataFrame) -> float:
        """Calculate learning persistence"""
        # Based on completion rates for difficult content
        difficult_content = df[df['difficulty_level'] >= 7]
        if len(difficult_content) > 0:
            return difficult_content['completion_rate'].mean()
        return 0.5
    
    def _calculate_break_frequency(self, df: pd.DataFrame) -> int:
        """Calculate optimal break frequency in minutes"""
        # Analyze engagement drop patterns
        df_sorted = df.sort_values(['session_id', 'timestamp'])
        engagement_drops = []
        
        for session_id in df['session_id'].unique():
            session_data = df_sorted[df_sorted['session_id'] == session_id]
            if len(session_data) > 5:
                # Find where engagement drops significantly
                engagement = session_data['engagement_score'].values
                for i in range(1, len(engagement)):
                    if engagement[i] < engagement[i-1] * 0.8:  # 20% drop
                        time_to_drop = session_data.iloc[i]['timestamp'] - session_data.iloc[0]['timestamp']
                        engagement_drops.append(time_to_drop.total_seconds() / 60)
        
        return int(np.mean(engagement_drops)) if engagement_drops else 25
    
    def _determine_optimal_conditions(self, modality_prefs: Dict, cognitive_patterns: Dict, temporal_patterns: Dict) -> Dict[str, Any]:
        """Determine optimal learning conditions"""
        return {
            'preferred_content_mix': {
                'visual': modality_prefs['visual'],
                'auditory': modality_prefs['auditory'],
                'kinesthetic': modality_prefs['kinesthetic']
            },
            'optimal_difficulty_progression': self._calculate_difficulty_progression(cognitive_patterns),
            'recommended_session_structure': {
                'duration': temporal_patterns['optimal_session_length'],
                'break_frequency': temporal_patterns['break_frequency'],
                'best_times': temporal_patterns['optimal_hours']
            },
            'cognitive_load_management': {
                'max_load': cognitive_patterns['cognitive_load_tolerance'],
                'ramp_up_rate': 0.1 if cognitive_patterns['processing_speed'] < 0.5 else 0.2
            }
        }
    
    def _calculate_difficulty_progression(self, cognitive_patterns: Dict) -> Dict[str, float]:
        """Calculate optimal difficulty progression"""
        base_difficulty = 0.3
        
        # Adjust based on cognitive abilities
        if cognitive_patterns['working_memory'] > 0.7:
            base_difficulty += 0.2
        if cognitive_patterns['processing_speed'] > 0.7:
            base_difficulty += 0.1
        if cognitive_patterns['learning_persistence'] > 0.8:
            base_difficulty += 0.1
            
        return {
            'starting_difficulty': max(0.1, min(0.8, base_difficulty)),
            'progression_rate': 0.05 + (cognitive_patterns['learning_persistence'] * 0.1),
            'max_difficulty': 0.6 + (cognitive_patterns['cognitive_load_tolerance'] * 0.4)
        }
    
    def _calculate_confidence_score(self, features: np.ndarray) -> float:
        """Calculate confidence in the learning style analysis"""
        # Based on amount and quality of data
        # This is a simplified version - in practice, would be more sophisticated
        return min(1.0, len(features[0]) / 20.0)
    
    def _default_learning_style(self) -> Dict[str, Any]:
        """Return default learning style for new users"""
        return {
            'modality_preferences': {
                'visual': 0.4,
                'auditory': 0.3,
                'kinesthetic': 0.3
            },
            'cognitive_patterns': {
                'processing_speed': 0.5,
                'attention_span': 0.5,
                'working_memory': 0.5,
                'cognitive_load_tolerance': 0.5,
                'learning_persistence': 0.5
            },
            'temporal_patterns': {
                'optimal_hours': [9, 10, 14],
                'peak_performance_hour': 10,
                'optimal_session_length': 1800,  # 30 minutes
                'break_frequency': 25
            },
            'optimal_conditions': {
                'preferred_content_mix': {'visual': 0.4, 'auditory': 0.3, 'kinesthetic': 0.3},
                'optimal_difficulty_progression': {
                    'starting_difficulty': 0.3,
                    'progression_rate': 0.1,
                    'max_difficulty': 0.8
                }
            },
            'confidence_score': 0.1,
            'last_updated': pd.Timestamp.now().isoformat()
        }

# FastAPI service wrapper
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI(title="AI Learning Engine")
analyzer = LearningStyleAnalyzer()

class InteractionData(BaseModel):
    user_id: str
    session_id: str
    content_type: str
    response_time: float
    accuracy: float
    engagement_score: float
    completion_rate: float
    difficulty_level: int
    cognitive_load: int
    complexity_level: int
    session_duration: int
    timestamp: str

@app.on_event("startup")
async def startup_event():
    await analyzer.initialize()

@app.post("/analyze-learning-style")
async def analyze_learning_style(user_id: str, interactions: List[InteractionData]):
    try:
        interaction_data = [interaction.dict() for interaction in interactions]
        result = await analyzer.analyze_learning_style(user_id, interaction_data)
        return {"success": True, "learning_style": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/learning-style/{user_id}")
async def get_learning_style(user_id: str):
    try:
        cached_result = await analyzer.redis_client.get(f"learning_style:{user_id}")
        if cached_result:
            return {"success": True, "learning_style": json.loads(cached_result)}
        else:
            return {"success": False, "error": "Learning style not found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
