"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, CheckCircle, AlertCircle, User } from "lucide-react"

const incomingRequests = [
  {
    id: 1,
    user: "Priya Sharma",
    source: "MG Road Metro Station",
    destination: "Cyber City",
    distance: "5.2 km",
    fare: "₹120",
    time: "2 mins ago",
  },
  {
    id: 2,
    user: "Rohit Gupta",
    source: "City Mall",
    destination: "Railway Station",
    distance: "3.8 km",
    fare: "₹95",
    time: "5 mins ago",
  },
]

export default function RiderDashboard() {
  const [acceptedRides, setAcceptedRides] = useState<any[]>([])
  const [requests, setRequests] = useState(incomingRequests)

  const handleAcceptBooking = (request: any) => {
    setAcceptedRides([...acceptedRides, { ...request, status: "accepted", acceptedAt: new Date() }])
    setRequests(requests.filter((r) => r.id !== request.id))
  }

  const handleCompleteRide = (rideId: number) => {
    setAcceptedRides(acceptedRides.filter((r) => r.id !== rideId))
  }

  return (
    <div className="min-h-screen bg-muted/50 p-4">
      <div className="container mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Rider Dashboard</h1>
          <Badge variant="default">Online</Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Incoming Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Incoming Requests
              </CardTitle>
              <CardDescription>New booking requests from users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {requests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No new requests at the moment</div>
              ) : (
                requests.map((request) => (
                  <Card key={request.id} className="border-orange-200 dark:border-orange-800">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{request.user}</span>
                        </div>
                        <Badge variant="secondary">{request.time}</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Pickup</p>
                            <p className="text-sm text-muted-foreground">{request.source}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-red-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Destination</p>
                            <p className="text-sm text-muted-foreground">{request.destination}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="text-sm text-muted-foreground">
                          {request.distance} • {request.fare}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAcceptBooking(request)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Accept Booking
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>

          {/* Accepted Rides */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Accepted Rides
              </CardTitle>
              <CardDescription>Your current and ongoing rides</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {acceptedRides.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No accepted rides yet</div>
              ) : (
                acceptedRides.map((ride) => (
                  <Card key={ride.id} className="border-green-200 dark:border-green-800">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{ride.user}</span>
                        </div>
                        <Badge variant="default" className="bg-green-600">
                          {ride.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Pickup</p>
                            <p className="text-sm text-muted-foreground">{ride.source}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-red-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Destination</p>
                            <p className="text-sm text-muted-foreground">{ride.destination}</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {ride.distance} • {ride.fare}
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleCompleteRide(ride.id)}>
                          Complete Ride
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Rides Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">₹1,440</div>
              <div className="text-sm text-muted-foreground">Earnings Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
