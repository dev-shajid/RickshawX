import { useQuery } from "@tanstack/react-query"
import type { RoutePriceResponse, Location } from "./types"

// Update the mock data to include more route combinations and fix the useRoutePrice hook

// Add more comprehensive route data
const mockRoutePriceData: RoutePriceResponse = {
  success: true,
  message: "Route prices fetched successfully",
  data: [
    // From Main Gate
    {
      _id: "6884b9619c65f954f1459f57",
      fromLocation: {
        coordinates: { latitude: 22.4609, longitude: 91.9656 },
        _id: "6884b9619c65f954f1459f4e",
        name: "Main Gate",
        description: "Main entrance of CUET campus",
      },
      toLocation: {
        coordinates: { latitude: 22.4615, longitude: 91.9662 },
        _id: "6884b9619c65f954f1459f4f",
        name: "Academic Building 1",
        description: "Central academic building with lecture halls",
      },
      price: 15,
      distance: 0.3,
      estimatedTime: 3,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.635Z",
      updatedAt: "2025-07-26T11:17:53.635Z",
    },
    {
      _id: "6884b9619c65f954f1459f58",
      fromLocation: {
        coordinates: { latitude: 22.4609, longitude: 91.9656 },
        _id: "6884b9619c65f954f1459f4e",
        name: "Main Gate",
        description: "Main entrance of CUET campus",
      },
      toLocation: {
        coordinates: { latitude: 22.462, longitude: 91.967 },
        _id: "6884b9619c65f954f1459f50",
        name: "Library",
        description: "Central library and study area",
      },
      price: 25,
      distance: 0.5,
      estimatedTime: 5,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.636Z",
      updatedAt: "2025-07-26T11:17:53.636Z",
    },
    {
      _id: "6884b9619c65f954f1459f59",
      fromLocation: {
        coordinates: { latitude: 22.4609, longitude: 91.9656 },
        _id: "6884b9619c65f954f1459f4e",
        name: "Main Gate",
        description: "Main entrance of CUET campus",
      },
      toLocation: {
        coordinates: { latitude: 22.4612, longitude: 91.9658 },
        _id: "6884b9619c65f954f1459f51",
        name: "Cafeteria",
        description: "Main dining hall and food court",
      },
      price: 20,
      distance: 0.4,
      estimatedTime: 4,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.636Z",
      updatedAt: "2025-07-26T11:17:53.636Z",
    },
    {
      _id: "6884b9619c65f954f1459f5a",
      fromLocation: {
        coordinates: { latitude: 22.4609, longitude: 91.9656 },
        _id: "6884b9619c65f954f1459f4e",
        name: "Main Gate",
        description: "Main entrance of CUET campus",
      },
      toLocation: {
        coordinates: { latitude: 22.4625, longitude: 91.9675 },
        _id: "6884b9619c65f954f1459f52",
        name: "Dormitory A",
        description: "Student residential hall A",
      },
      price: 35,
      distance: 0.8,
      estimatedTime: 7,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.636Z",
      updatedAt: "2025-07-26T11:17:53.636Z",
    },
    {
      _id: "6884b9619c65f954f1459f5b",
      fromLocation: {
        coordinates: { latitude: 22.4609, longitude: 91.9656 },
        _id: "6884b9619c65f954f1459f4e",
        name: "Main Gate",
        description: "Main entrance of CUET campus",
      },
      toLocation: {
        coordinates: { latitude: 22.463, longitude: 91.968 },
        _id: "6884b9619c65f954f1459f53",
        name: "Dormitory B",
        description: "Student residential hall B",
      },
      price: 40,
      distance: 1,
      estimatedTime: 8,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.636Z",
      updatedAt: "2025-07-26T11:17:53.636Z",
    },
    {
      _id: "6884b9619c65f954f1459f5c",
      fromLocation: {
        coordinates: { latitude: 22.4609, longitude: 91.9656 },
        _id: "6884b9619c65f954f1459f4e",
        name: "Main Gate",
        description: "Main entrance of CUET campus",
      },
      toLocation: {
        coordinates: { latitude: 22.4605, longitude: 91.965 },
        _id: "6884b9619c65f954f1459f54",
        name: "Medical Center",
        description: "Campus health center",
      },
      price: 10,
      distance: 0.2,
      estimatedTime: 2,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.636Z",
      updatedAt: "2025-07-26T11:17:53.636Z",
    },
    {
      _id: "6884b9619c65f954f1459f5d",
      fromLocation: {
        coordinates: { latitude: 22.4609, longitude: 91.9656 },
        _id: "6884b9619c65f954f1459f4e",
        name: "Main Gate",
        description: "Main entrance of CUET campus",
      },
      toLocation: {
        coordinates: { latitude: 22.4618, longitude: 91.9665 },
        _id: "6884b9619c65f954f1459f55",
        name: "Sports Complex",
        description: "Gymnasium and sports facilities",
      },
      price: 25,
      distance: 0.5,
      estimatedTime: 5,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.636Z",
      updatedAt: "2025-07-26T11:17:53.636Z",
    },
    // Reverse routes - From Academic Building 1
    {
      _id: "6884b9619c65f954f1459f73",
      fromLocation: {
        coordinates: { latitude: 22.4615, longitude: 91.9662 },
        _id: "6884b9619c65f954f1459f4f",
        name: "Academic Building 1",
        description: "Central academic building with lecture halls",
      },
      toLocation: {
        coordinates: { latitude: 22.4609, longitude: 91.9656 },
        _id: "6884b9619c65f954f1459f4e",
        name: "Main Gate",
        description: "Main entrance of CUET campus",
      },
      price: 15,
      distance: 0.3,
      estimatedTime: 3,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.636Z",
      updatedAt: "2025-07-26T11:17:53.636Z",
    },
    {
      _id: "6884b9619c65f954f1459f5e",
      fromLocation: {
        coordinates: { latitude: 22.4615, longitude: 91.9662 },
        _id: "6884b9619c65f954f1459f4f",
        name: "Academic Building 1",
        description: "Central academic building with lecture halls",
      },
      toLocation: {
        coordinates: { latitude: 22.462, longitude: 91.967 },
        _id: "6884b9619c65f954f1459f50",
        name: "Library",
        description: "Central library and study area",
      },
      price: 15,
      distance: 0.3,
      estimatedTime: 3,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.636Z",
      updatedAt: "2025-07-26T11:17:53.636Z",
    },
    {
      _id: "6884b9619c65f954f1459f5f",
      fromLocation: {
        coordinates: { latitude: 22.4615, longitude: 91.9662 },
        _id: "6884b9619c65f954f1459f4f",
        name: "Academic Building 1",
        description: "Central academic building with lecture halls",
      },
      toLocation: {
        coordinates: { latitude: 22.4612, longitude: 91.9658 },
        _id: "6884b9619c65f954f1459f51",
        name: "Cafeteria",
        description: "Main dining hall and food court",
      },
      price: 20,
      distance: 0.4,
      estimatedTime: 4,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.636Z",
      updatedAt: "2025-07-26T11:17:53.636Z",
    },
    // From Library
    {
      _id: "6884b9619c65f954f1459f74",
      fromLocation: {
        coordinates: { latitude: 22.462, longitude: 91.967 },
        _id: "6884b9619c65f954f1459f50",
        name: "Library",
        description: "Central library and study area",
      },
      toLocation: {
        coordinates: { latitude: 22.4609, longitude: 91.9656 },
        _id: "6884b9619c65f954f1459f4e",
        name: "Main Gate",
        description: "Main entrance of CUET campus",
      },
      price: 25,
      distance: 0.5,
      estimatedTime: 5,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.636Z",
      updatedAt: "2025-07-26T11:17:53.636Z",
    },
    {
      _id: "6884b9619c65f954f1459f7a",
      fromLocation: {
        coordinates: { latitude: 22.462, longitude: 91.967 },
        _id: "6884b9619c65f954f1459f50",
        name: "Library",
        description: "Central library and study area",
      },
      toLocation: {
        coordinates: { latitude: 22.4615, longitude: 91.9662 },
        _id: "6884b9619c65f954f1459f4f",
        name: "Academic Building 1",
        description: "Central academic building with lecture halls",
      },
      price: 15,
      distance: 0.3,
      estimatedTime: 3,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.637Z",
      updatedAt: "2025-07-26T11:17:53.637Z",
    },
    {
      _id: "6884b9619c65f954f1459f64",
      fromLocation: {
        coordinates: { latitude: 22.462, longitude: 91.967 },
        _id: "6884b9619c65f954f1459f50",
        name: "Library",
        description: "Central library and study area",
      },
      toLocation: {
        coordinates: { latitude: 22.4612, longitude: 91.9658 },
        _id: "6884b9619c65f954f1459f51",
        name: "Cafeteria",
        description: "Main dining hall and food court",
      },
      price: 25,
      distance: 0.5,
      estimatedTime: 5,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.636Z",
      updatedAt: "2025-07-26T11:17:53.636Z",
    },
    // From Cafeteria
    {
      _id: "6884b9619c65f954f1459f75",
      fromLocation: {
        coordinates: { latitude: 22.4612, longitude: 91.9658 },
        _id: "6884b9619c65f954f1459f51",
        name: "Cafeteria",
        description: "Main dining hall and food court",
      },
      toLocation: {
        coordinates: { latitude: 22.4609, longitude: 91.9656 },
        _id: "6884b9619c65f954f1459f4e",
        name: "Main Gate",
        description: "Main entrance of CUET campus",
      },
      price: 20,
      distance: 0.4,
      estimatedTime: 4,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.637Z",
      updatedAt: "2025-07-26T11:17:53.637Z",
    },
    {
      _id: "6884b9619c65f954f1459f7b",
      fromLocation: {
        coordinates: { latitude: 22.4612, longitude: 91.9658 },
        _id: "6884b9619c65f954f1459f51",
        name: "Cafeteria",
        description: "Main dining hall and food court",
      },
      toLocation: {
        coordinates: { latitude: 22.4615, longitude: 91.9662 },
        _id: "6884b9619c65f954f1459f4f",
        name: "Academic Building 1",
        description: "Central academic building with lecture halls",
      },
      price: 20,
      distance: 0.4,
      estimatedTime: 4,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.637Z",
      updatedAt: "2025-07-26T11:17:53.637Z",
    },
    {
      _id: "6884b9619c65f954f1459f80",
      fromLocation: {
        coordinates: { latitude: 22.4612, longitude: 91.9658 },
        _id: "6884b9619c65f954f1459f51",
        name: "Cafeteria",
        description: "Main dining hall and food court",
      },
      toLocation: {
        coordinates: { latitude: 22.462, longitude: 91.967 },
        _id: "6884b9619c65f954f1459f50",
        name: "Library",
        description: "Central library and study area",
      },
      price: 25,
      distance: 0.5,
      estimatedTime: 5,
      isActive: true,
      __v: 0,
      createdAt: "2025-07-26T11:17:53.637Z",
      updatedAt: "2025-07-26T11:17:53.637Z",
    },
  ],
}

// Simulate API call with delay
const fetchRoutePrices = async (): Promise<RoutePriceResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
  return mockRoutePriceData
}

// Get unique locations from route data
const getUniqueLocations = (routeData: RoutePriceResponse): Location[] => {
  const locationMap = new Map<string, Location>()

  routeData.data.forEach((route) => {
    locationMap.set(route.fromLocation._id, route.fromLocation)
    locationMap.set(route.toLocation._id, route.toLocation)
  })

  return Array.from(locationMap.values())
}

// React Query hooks
export const useRoutePrices = () => {
  return useQuery({
    queryKey: ["routePrices"],
    queryFn: fetchRoutePrices,
  })
}

export const useLocations = () => {
  const { data: routePrices, ...rest } = useRoutePrices()

  return {
    data: routePrices ? getUniqueLocations(routePrices) : [],
    ...rest,
  }
}

// Fix the useRoutePrice hook to properly find routes
export const useRoutePrice = (fromLocationId: string, toLocationId: string) => {
  const { data: routePrices, isLoading } = useRoutePrices()

  const routePrice = routePrices?.data.find(
    (route) => route.fromLocation._id === fromLocationId && route.toLocation._id === toLocationId,
  )

  return {
    data: routePrice || null,
    isLoading,
  }
}
