import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"

export default function PlantNourishment() {
  const [species, setSpecies] = useState('')
  const [soilType, setSoilType] = useState('')
  const [lightConditions, setLightConditions] = useState('')
  const [healthStatus, setHealthStatus] = useState('')
  const [recommendations, setRecommendations] = useState<string[]>([])

  const validateInput = () => {
    if (!species || !soilType || !lightConditions || !healthStatus) {
      alert('Please fill in all fields.')
      return false
    }
    return true
  }

  const generateRecommendations = () => {
    if (!validateInput()) return

    const recs: string[] = []

    if (soilType === 'clay') {
      recs.push('Consider adding sand to improve drainage.')
    } else if (soilType === 'sandy') {
      recs.push('Add organic matter to improve soil structure.')
    }

    if (lightConditions === 'low') {
      recs.push('Move the plant to a brighter location.')
    } else if (lightConditions === 'high') {
      recs.push('Ensure the plant is not exposed to direct sunlight for too long.')
    }

    if (healthStatus === 'unhealthy') {
      recs.push('Check for pests or diseases and treat accordingly.')
    } else if (healthStatus === 'healthy') {
      recs.push('Continue with your current care routine.')
    }

    setRecommendations(recs)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Plant Nourishment AI</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="species">Plant Species</Label>
            <Select value={species} onValueChange={setSpecies} className="mt-1">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select plant species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tomato">Tomato</SelectItem>
                <SelectItem value="basil">Basil</SelectItem>
                <SelectItem value="sunflower">Sunflower</SelectItem>
                <SelectItem value="orchid">Orchid</SelectItem>
                <SelectItem value="cactus">Cactus</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="soil-type">Soil Type</Label>
            <Select value={soilType} onValueChange={setSoilType} className="mt-1">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clay">Clay</SelectItem>
                <SelectItem value="sandy">Sandy</SelectItem>
                <SelectItem value="loamy">Loamy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="light-conditions">Light Conditions</Label>
            <Select value={lightConditions} onValueChange={setLightConditions} className="mt-1">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select light conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="health-status">Health Status</Label>
            <Select value={healthStatus} onValueChange={setHealthStatus} className="mt-1">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select health status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="unhealthy">Unhealthy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generateRecommendations} type="button" className="mt-4">
            Get Recommendations
          </Button>
        </form>
        {recommendations.length > 0 && (
          <div className="mt-6">
            <CardTitle className="text-xl font-bold">AI Recommendations</CardTitle>
            <ul className="mt-2 space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}