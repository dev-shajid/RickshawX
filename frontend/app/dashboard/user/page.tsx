"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Clock, X, User, Star, IndianRupee, Loader2 } from "lucide-react"
import { useLocations, useRoutePrice } from "@/services/location.service"
import { useAvailableRiders } from "@/services/rider.service"
import { useCreateBooking, useUserBookings, useCancelBooking } from "@/services/booking.service"

export default function UserDashboard() {
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isWaitingForRider, setIsWaitingForRider] = useState(false)

  // React Query hooks
  const { data: locations, isLoading: locationsLoading } = useLocations()
  const { data: availableRiders, isLoading: ridersLoading } = useAvailableRiders()
  const { data: routePrice, isLoading: priceLoading } = useRoutePrice(source, destination)
  const { data: userBookings } = useUserBookings("current_user_id")
  const createBookingMutation = useCreateBooking()
  const cancelBookingMutation = useCancelBooking()

  const currentBooking = userBookings?.data?.[0] || null

  const handleConfirmRide = () => {
    if (source && destination && routePrice) {
      setShowConfirmDialog(true)
    }
  }

  const handleBookRide = async () => {
    if (source && destination) {
      try {
        await createBookingMutation.mutateAsync({
          fromLocationId: source,
          toLocationId: destination,
          userId: "current_user_id",
        })
        setShowConfirmDialog(false)
        setSource("")
        setDestination("")
        setIsWaitingForRider(true)

        // Simulate rider acceptance after 3 seconds
        setTimeout(() => {
          setIsWaitingForRider(false)
        }, 3000)
      } catch (error) {
        console.error("Booking failed:", error)
      }
    }
  }

  const handleCancelBooking = async () => {
    if (currentBooking) {
      try {
        await cancelBookingMutation.mutateAsync(currentBooking._id)
        setIsWaitingForRider(false)
      } catch (error) {
        console.error("Cancel booking failed:", error)
      }
    }
  }

  const getLocationName = (locationId: string) => {
    return locations?.find((loc) => loc._id === locationId)?.name || "Unknown Location"
  }

  return (
    <div className="min-h-screen bg-muted/50 p-4">
      <div className="container mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <Badge variant="secondary">Welcome back!</Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Book a Ride
              </CardTitle>
              <CardDescription>Select your pickup and destination locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="source">Pickup Location</Label>
                    <Select value={source} onValueChange={setSource} disabled={locationsLoading || !!currentBooking}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={locationsLoading ? "Loading locations..." : "Select pickup location"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {locations
                          ?.filter((location) => location._id !== destination) // Filter out destination
                          ?.map((location) => (
                            <SelectItem key={location._id} value={location._id}>
                              <div>
                                <div className="font-medium">{location.name}</div>
                                <div className="text-xs text-muted-foreground">{location.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Select
                      value={destination}
                      onValueChange={setDestination}
                      disabled={locationsLoading || !!currentBooking}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={locationsLoading ? "Loading locations..." : "Select destination"} />
                      </SelectTrigger>
                      <SelectContent>
                        {locations
                          ?.filter((location) => location._id !== source) // Filter out source
                          ?.map((location) => (
                            <SelectItem key={location._id} value={location._id}>
                              <div>
                                <div className="font-medium">{location.name}</div>
                                <div className="text-xs text-muted-foreground">{location.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Estimated Fare Display */}
                {routePrice && !priceLoading && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2 text-lg font-semibold text-primary">
                          <IndianRupee className="h-5 w-5" />
                          <span>Estimated Fare: ₹{routePrice.price}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Distance: {routePrice.distance} km</span>
                          <span>Time: ~{routePrice.estimatedTime} mins</span>
                        </div>
                        <p className="text-center text-xs text-muted-foreground">
                          Final fare may vary based on traffic and route
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {priceLoading && source && destination && (
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Calculating fare...</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {source && destination && (
                  <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                    Debug: From {source} to {destination} - Route found: {routePrice ? "Yes" : "No"}
                  </div>
                )}

                <Button
                  onClick={handleConfirmRide}
                  className="w-full h-12 text-lg font-semibold"
                  disabled={
                    !!currentBooking ||
                    !source ||
                    !destination ||
                    source === destination ||
                    !routePrice ||
                    priceLoading ||
                    isWaitingForRider
                  }
                >
                  {isWaitingForRider ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Waiting for Rider...
                    </>
                  ) : currentBooking ? (
                    "Booking in Progress..."
                  ) : (
                    "Confirm Ride"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Riders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Available Riders
                {ridersLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              </CardTitle>
              <CardDescription>Riders near your location</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px] px-6">
                <div className="space-y-3 py-4">
                  {ridersLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="ml-2">Loading riders...</span>
                    </div>
                  ) : (
                    availableRiders?.data.map((rider) => (
                      <Card key={rider.id} className="transition-all hover:shadow-md border-l-4 border-l-green-400">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={rider.avatar || "/placeholder.svg"} alt={rider.name} />
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {rider.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-base">{rider.name}</h4>
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-green-50 text-green-700 border-green-200"
                                >
                                  {rider.status}
                                </Badge>
                              </div>

                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{rider.distance} away</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{rider.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Current Booking */}
        {(currentBooking || isWaitingForRider) && (
          <Card className="border-primary shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {isWaitingForRider ? "Finding Rider..." : "Current Booking"}
                </span>
                <Badge variant="default" className="bg-orange-400">
                  {isWaitingForRider ? "searching" : currentBooking?.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isWaitingForRider ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-lg font-medium">Looking for available riders...</p>
                  <p className="text-sm text-muted-foreground">This usually takes 1-2 minutes</p>
                </div>
              ) : (
                currentBooking && (
                  <>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Pickup</Label>
                        <p className="text-sm text-muted-foreground">{currentBooking.fromLocation.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Destination</Label>
                        <p className="text-sm text-muted-foreground">{currentBooking.toLocation.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Fare</Label>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" />₹{currentBooking.price}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" alt="Rider" />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">R</AvatarFallback>
                        </Avatar>
                        <div>
                          <Label className="text-sm font-medium">Assigned Rider</Label>
                          <p className="text-sm text-muted-foreground">Searching...</p>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleCancelBooking}
                        className="flex items-center gap-2"
                        disabled={cancelBookingMutation.isPending}
                      >
                        {cancelBookingMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        Cancel Booking
                      </Button>
                    </div>
                  </>
                )
              )}
            </CardContent>
          </Card>
        )}

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Your Ride</DialogTitle>
              <DialogDescription>Please review your booking details before confirming.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {routePrice && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">From:</span>
                      <span>{getLocationName(source)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">To:</span>
                      <span>{getLocationName(destination)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Distance:</span>
                      <span>{routePrice.distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Estimated Time:</span>
                      <span>{routePrice.estimatedTime} minutes</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Fare:</span>
                      <span className="flex items-center gap-1">
                        <IndianRupee className="h-4 w-4" />₹{routePrice.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleBookRide} disabled={createBookingMutation.isPending} className="flex-1">
                      {createBookingMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Booking...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
