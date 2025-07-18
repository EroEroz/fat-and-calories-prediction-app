'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft } from 'lucide-react'

interface PersonalInfo {
  height: string
  weight: string
  age: string
  gender: string
}

interface PersonalInfoScreenProps {
  onBack: () => void
  onContinue: (personalInfo: PersonalInfo) => void
}

export function PersonalInfoScreen({ onBack, onContinue }: PersonalInfoScreenProps) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    height: '',
    weight: '',
    age: '',
    gender: ''
  })

  const [errors, setErrors] = useState<Partial<PersonalInfo>>({})

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<PersonalInfo> = {}

    if (!personalInfo.height.trim()) {
      newErrors.height = 'Height is required'
    } else if (isNaN(Number(personalInfo.height)) || Number(personalInfo.height) <= 0) {
      newErrors.height = 'Please enter a valid height'
    }

    if (!personalInfo.weight.trim()) {
      newErrors.weight = 'Weight is required'
    } else if (isNaN(Number(personalInfo.weight)) || Number(personalInfo.weight) <= 0) {
      newErrors.weight = 'Please enter a valid weight'
    }

    if (!personalInfo.age.trim()) {
      newErrors.age = 'Age is required'
    } else if (isNaN(Number(personalInfo.age)) || Number(personalInfo.age) <= 0 || Number(personalInfo.age) > 120) {
      newErrors.age = 'Please enter a valid age'
    }

    if (!personalInfo.gender) {
      newErrors.gender = 'Please select your gender'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      onContinue(personalInfo)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm px-4 py-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Personal Information</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
          <p className="text-gray-600">This helps us personalize your fitness journey</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Height */}
            <div className="space-y-2">
              <Label htmlFor="height" className="text-sm font-medium text-gray-700">
                Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={personalInfo.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className={`bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.height ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.height && (
                <p className="text-sm text-red-600">{errors.height}</p>
              )}
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={personalInfo.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className={`bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.weight ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.weight && (
                <p className="text-sm text-red-600">{errors.weight}</p>
              )}
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={personalInfo.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className={`bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.age ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.age && (
                <p className="text-sm text-red-600">{errors.age}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                Gender
              </Label>
              <Select value={personalInfo.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger className={`bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.gender ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-600">{errors.gender}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="mt-8">
          <Button 
            onClick={handleContinue}
            className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl text-lg font-semibold"
          >
            Continue
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-2 bg-orange-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
