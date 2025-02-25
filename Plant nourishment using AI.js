import { useState } from 'react'
import { Button, Input, Label, RadioGroup, RadioGroupItem, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "/components/ui"
import { Heart, Home, Search } from "lucide-react"

const PlantDataForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [soilType, setSoilType] = useState('')
  const [lightConditions, setLightConditions] = useState('')
  const [plantType, setPlantType] = useState('')
  const [location, setLocation] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!soilType) newErrors.soilType = 'Soil type is required'
    if (!lightConditions) newErrors.lightConditions = 'Light conditions are required'
    if (!plantType) newErrors.plantType = 'Plant type is required'
    if (!location) newErrors.location = 'Location is required'
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length === 0) {
      onSubmit({ soilType, lightConditions, plantType, location })
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="plant-type">Plant Type</Label>
        <Select onValueChange={(value) => setPlantType(value)} value={plantType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select plant type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="creeper">Creeper</SelectItem>
            <SelectItem value="shrub">Shrub</SelectItem>
            <SelectItem value="tree">Tree</SelectItem>
            <SelectItem value="perennial">Perennial</SelectItem>
            <SelectItem value="annual">Annual</SelectItem>
            <SelectItem value="vine">Vine</SelectItem>
            <SelectItem value="herb">Herb</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.plantType && <p className="text-red-500 text-sm">{errors.plantType}</p>}
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Select onValueChange={(value) => setLocation(value)} value={location}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="indoor">Indoor</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
          </SelectContent>
        </Select>
        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
      </div>
      <div>
        <Label htmlFor="soil-type">Soil Type</Label>
        <Select onValueChange={(value) => setSoilType(value)} value={soilType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select soil type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clay">Clay</SelectItem>
            <SelectItem value="loam">Loam</SelectItem>
            <SelectItem value="sand">Sand</SelectItem>
            <SelectItem value="silt">Silt</SelectItem>
            <SelectItem value="peat-moss">Peat Moss</SelectItem>
            <SelectItem value="chalky">Chalky</SelectItem>
            <SelectItem value="sandy-loam">Sandy Loam</SelectItem>
            <SelectItem value="clay-loam">Clay Loam</SelectItem>
          </SelectContent>
        </Select>
        {errors.soilType && <p className="text-red-500 text-sm">{errors.soilType}</p>}
      </div>
      <div>
        <Label htmlFor="light-conditions">Light Conditions</Label>
        <RadioGroup defaultValue={lightConditions} onValueChange={setLightConditions}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low">Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="high" />
            <Label htmlFor="high">High</Label>
          </div>
        </RadioGroup>
        {errors.lightConditions && <p className="text-red-500 text-sm">{errors.lightConditions}</p>}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}

const RecommendationsDisplay = ({ recommendations }: { recommendations: any }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recommendations</h3>
      <p><strong>Fertilizer:</strong> {recommendations.fertilizer}</p>
      <p><strong>Watering Schedule:</strong> {recommendations.wateringSchedule}</p>
      <p><strong>Care Tips:</strong> {recommendations.careTips}</p>
    </div>
  )
}

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Home className="h-6 w-6" />
        <h1 className="text-xl font-bold">Plant Nourishment AI</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Search className="h-6 w-6" />
        <input type="text" placeholder="Search..." className="border p-2 rounded" />
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className="bg-white shadow-md p-4 text-center">
      <p>&copy; 2023 Plant Nourishment AI. All rights reserved.</p>
      <p>Contact us: <a href="mailto:support@plantnourishmentai.com" className="text-blue-500">support@plantnourishmentai.com</a></p>
    </footer>
  )
}

const PlantNourishmentApp = () => {
  const [recommendations, setRecommendations] = useState<any>(null)

  const generateRecommendations = (data: any) => {
    // Simple AI logic for demonstration purposes
    let fertilizer = 'General Purpose Fertilizer'
    let wateringSchedule = 'Once a week'
    let careTips = 'Ensure proper drainage and avoid overwatering.'

    if (data.location === 'indoor') {
      careTips += ' Ensure good air circulation and avoid direct sunlight.'
    } else if (data.location === 'outdoor') {
      careTips += ' Protect from extreme weather conditions.'
    }

    if (data.plantType === 'creeper') {
      careTips += ' Use trellises or supports for climbing.'
    } else if (data.plantType === 'shrub') {
      careTips += ' Prune regularly to maintain shape.'
    } else if (data.plantType === 'tree') {
      careTips += ' Ensure deep watering and regular pruning.'
    } else if (data.plantType === 'perennial') {
      careTips += ' Water regularly and provide well-draining soil.'
    } else if (data.plantType === 'annual') {
      careTips += ' Plant in the spring and enjoy a full growing season.'
    } else if (data.plantType === 'vine') {
      careTips += ' Use trellises or supports for climbing.'
    } else if (data.plantType === 'herb') {
      careTips += ' Harvest regularly to encourage new growth.'
    }

    if (data.soilType === 'clay') {
      careTips += ' Improve drainage by adding organic matter.'
    } else if (data.soilType === 'loam') {
      careTips += ' Ideal soil type for most plants.'
    } else if (data.soilType === 'sand') {
      careTips += ' Improve water retention by adding organic matter.'
    } else if (data.soilType === 'silt') {
      careTips += ' Improve drainage by adding organic matter.'
    } else if (data.soilType === 'peat-moss') {
      careTips += ' Use for acid-loving plants and improve drainage.'
    } else if (data.soilType === 'chalky') {
      careTips += ' Use lime-loving plants and improve drainage.'
    } else if (data.soilType === 'sandy-loam') {
      careTips += ' Ideal balance of sand and loam.'
    } else if (data.soilType === 'clay-loam') {
      careTips += ' Good water retention and drainage.'
    }

    setRecommendations({ fertilizer, wateringSchedule, careTips })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          <PlantDataForm onSubmit={generateRecommendations} />
          {recommendations && <RecommendationsDisplay recommendations={recommendations} />}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PlantNourishmentApp