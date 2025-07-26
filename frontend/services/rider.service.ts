import { useQuery } from "@tanstack/react-query"
import type { RidersResponse } from "./types"

// Mock riders data
const mockRidersData: RidersResponse = {
  success: true,
  message: "Available riders fetched successfully",
  data: [
    {
      id: "rider_1",
      name: "Rajesh Kumar",
      distance: "0.5 km",
      rating: 4.8,
      status: "available",
      avatar: "/placeholder.svg?height=40&width=40&text=RK",
      phone: "+880123456789",
    },
    {
      id: "rider_2",
      name: "Amit Singh",
      distance: "0.8 km",
      rating: 4.9,
      status: "available",
      avatar: "/placeholder.svg?height=40&width=40&text=AS",
      phone: "+880123456790",
    },
    {
      id: "rider_3",
      name: "Suresh Patel",
      distance: "1.2 km",
      rating: 4.7,
      status: "available",
      avatar: "/placeholder.svg?height=40&width=40&text=SP",
      phone: "+880123456791",
    },
    {
      id: "rider_4",
      name: "Vikram Sharma",
      distance: "1.5 km",
      rating: 4.6,
      status: "available",
      avatar: "/placeholder.svg?height=40&width=40&text=VS",
      phone: "+880123456792",
    },
    {
      id: "rider_5",
      name: "Deepak Gupta",
      distance: "2.0 km",
      rating: 4.8,
      status: "available",
      avatar: "/placeholder.svg?height=40&width=40&text=DG",
      phone: "+880123456793",
    },
    {
      id: "rider_6",
      name: "Manoj Yadav",
      distance: "2.3 km",
      rating: 4.5,
      status: "available",
      avatar: "/placeholder.svg?height=40&width=40&text=MY",
      phone: "+880123456794",
    },
  ],
}

const fetchAvailableRiders = async (): Promise<RidersResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockRidersData
}

export const useAvailableRiders = () => {
  return useQuery({
    queryKey: ["availableRiders"],
    queryFn: fetchAvailableRiders,
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}
