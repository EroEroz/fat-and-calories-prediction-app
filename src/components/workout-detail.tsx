'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Play, Pause, RotateCcw, Clock, Flame, Activity } from 'lucide-react'

interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  duration?: number
  rest: number
  completed: boolean
}

interface WorkoutDetailProps {
  workout: {
    id: string
    name: string
    duration: number
    calories: number
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    type: string
    description: string
    exercises: Exercise[]
  }
  onClose: () => void
}

export function WorkoutDetail({ workout, onClose }: WorkoutDetailProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<string[]>([])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleWorkout = () => {
    setIsActive(!isActive)
  }

  const resetWorkout = () => {
    setIsActive(false)
    setCurrentTime(0)
    setCurrentExerciseIndex(0)
    setCompletedExercises([])
  }

  const completeExercise = (exerciseId: string) => {
    setCompletedExercises([...completedExercises, exerciseId])
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    }
  }

  const progress = (completedExercises.length / workout.exercises.length) * 100

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{workout.name}</h2>
              <p className="text-sm text-gray-400">{workout.description}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400">
              Close
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-3 text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                <div className="text-lg font-bold text-white">{workout.duration} min</div>
                <div className="text-xs text-gray-400">Duration</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-3 text-center">
                <Flame className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                <div className="text-lg font-bold text-white">{workout.calories}</div>
                <div className="text-xs text-gray-400">Calories</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-3 text-center">
                <Activity className="w-5 h-5 mx-auto mb-1 text-green-400" />
                <div className="text-lg font-bold text-white capitalize">{workout.difficulty}</div>
                <div className="text-xs text-gray-400">Level</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress */}
        <div className="px-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm text-gray-300">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Timer */}
        <div className="px-4 mb-4">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
            <CardContent className="p-4 text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {formatTime(currentTime)}
              </div>
              <div className="flex justify-center gap-3">
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30"
                  onClick={toggleWorkout}
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30"
                  onClick={resetWorkout}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exercises */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-3 pb-20">
            {workout.exercises.map((exercise, index) => (
              <Card 
                key={exercise.id} 
                className={`bg-gray-900 border-gray-800 ${
                  completedExercises.includes(exercise.id) ? 'opacity-60' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{exercise.name}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-400">
                          {exercise.sets} sets × {exercise.reps} reps
                        </span>
                        {exercise.duration && (
                          <span className="text-sm text-gray-400">
                            {exercise.duration}s each
                          </span>
                        )}
                        <span className="text-sm text-gray-400">
                          Rest: {exercise.rest}s
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={completedExercises.includes(exercise.id) ? "secondary" : "default"}
                      onClick={() => completeExercise(exercise.id)}
                      disabled={completedExercises.includes(exercise.id)}
                    >
                      {completedExercises.includes(exercise.id) ? 'Done' : 'Start'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
