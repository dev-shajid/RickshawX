import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { BookingRequest, BookingResponse, Booking } from "./types"

// Mock booking data
let mockBookings: Booking[] = []

const createBooking = async (bookingData: BookingRequest): Promise<BookingResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

  const newBooking: Booking = {
    _id: `booking_${Date.now()}`,
    fromLocation: {
      coordinates: { latitude: 22.4609, longitude: 91.9656 },
      _id: bookingData.fromLocationId,
      name: "Selected Location",
      description: "User selected pickup location",
    },
    toLocation: {
      coordinates: { latitude: 22.4615, longitude: 91.9662 },
      _id: bookingData.toLocationId,
      name: "Selected Destination",
      description: "User selected destination",
    },
    price: 25,
    distance: 0.5,
    estimatedTime: 5,
    status: "pending",
    user: {
      _id: bookingData.userId,
      name: "Current User",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockBookings.push(newBooking)

  return {
    success: true,
    message: "Booking created successfully",
    data: newBooking,
  }
}

const fetchUserBookings = async (userId: string): Promise<{ success: boolean; data: Booking[] }> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return {
    success: true,
    data: mockBookings.filter((booking) => booking.user._id === userId),
  }
}

const cancelBooking = async (bookingId: string): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  mockBookings = mockBookings.filter((booking) => booking._id !== bookingId)
  return {
    success: true,
    message: "Booking cancelled successfully",
  }
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBookings"] })
    },
  })
}

export const useUserBookings = (userId: string) => {
  return useQuery({
    queryKey: ["userBookings", userId],
    queryFn: () => fetchUserBookings(userId),
    enabled: !!userId,
  })
}

export const useCancelBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBookings"] })
    },
  })
}
