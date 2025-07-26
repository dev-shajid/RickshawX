export interface Location {
  coordinates: {
    latitude: number
    longitude: number
  }
  _id: string
  name: string
  description: string
}

export interface RoutePrice {
  _id: string
  fromLocation: Location
  toLocation: Location
  price: number
  distance: number
  estimatedTime: number
  isActive: boolean
  __v: number
  createdAt: string
  updatedAt: string
}

export interface RoutePriceResponse {
  success: boolean
  message: string
  data: RoutePrice[]
}

export interface Rider {
  id: string
  name: string
  distance: string
  rating: number
  status: "available" | "busy" | "offline"
  avatar?: string
  phone?: string
}

export interface RidersResponse {
  success: boolean
  message: string
  data: Rider[]
}

export interface BookingRequest {
  fromLocationId: string
  toLocationId: string
  userId: string
}

export interface Booking {
  _id: string
  fromLocation: Location
  toLocation: Location
  price: number
  distance: number
  estimatedTime: number
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled"
  rider?: Rider
  user: {
    _id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

export interface BookingResponse {
  success: boolean
  message: string
  data: Booking
}
