import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { tourAPI, Tour, AvailabilitySlot } from "@/lib/api";
import {
    Calendar as CalendarIcon,
    Plus,
    Edit,
    Ban,
    CheckCircle,
    AlertCircle,
    Users,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { format, addDays, startOfMonth, endOfMonth } from "date-fns";

interface AvailabilityCalendarProps {
    tourId?: string;
}

export const AvailabilityCalendar = ({
    tourId,
}: AvailabilityCalendarProps) => {
    const [tours, setTours] = useState<Tour[]>([]);
    const [selectedTour, setSelectedTour] = useState<string>("");
    const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(
        null,
    );
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
    const [blockReason, setBlockReason] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        loadTours();
    }, []);

    useEffect(() => {
        if (selectedTour) {
            loadAvailability();
        }
    }, [selectedTour]);

    const loadTours = async () => {
        try {
            const response = await tourAPI.getTours();
            setTours(response.tours);
            if (tourId) {
                setSelectedTour(tourId);
            } else if (response.tours.length > 0) {
                setSelectedTour(response.tours[0].id);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load tours",
                variant: "destructive",
            });
        }
    };

    const loadAvailability = async () => {
        if (!selectedTour) return;

        try {
            setLoading(true);
            // Mock availability data - replace with actual API call
            const mockAvailability: AvailabilitySlot[] = [
                {
                    id: "1",
                    date: format(new Date(), "yyyy-MM-dd"),
                    availableSpots: 8,
                    bookedSpots: 4,
                    price: 1299,
                    status: "available",
                },
                {
                    id: "2",
                    date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
                    availableSpots: 12,
                    bookedSpots: 12,
                    price: 1299,
                    status: "full",
                },
                {
                    id: "3",
                    date: format(addDays(new Date(), 2), "yyyy-MM-dd"),
                    availableSpots: 10,
                    bookedSpots: 8,
                    price: 1299,
                    status: "limited",
                },
            ];
            setAvailability(mockAvailability);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load availability",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const getSlotForDate = (date: Date): AvailabilitySlot | undefined => {
        const dateStr = format(date, "yyyy-MM-dd");
        return availability.find((slot) => slot.date === dateStr);
    };

    const getStatusColor = (status: AvailabilitySlot["status"]) => {
        switch (status) {
            case "available":
                return "bg-green-100 text-green-800";
            case "limited":
                return "bg-yellow-100 text-yellow-800";
            case "full":
                return "bg-red-100 text-red-800";
            case "blocked":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: AvailabilitySlot["status"]) => {
        switch (status) {
            case "available":
                return <CheckCircle className="h-4 w-4" />;
            case "limited":
                return <AlertCircle className="h-4 w-4" />;
            case "full":
                return <Users className="h-4 w-4" />;
            case "blocked":
                return <Ban className="h-4 w-4" />;
            default:
                return null;
        }
    };

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) {
            const slot = getSlotForDate(date);
            setSelectedSlot(slot || null);
        }
    };

    const handleCreateSlot = () => {
        if (!selectedDate) return;

        const newSlot: AvailabilitySlot = {
            id: Date.now().toString(),
            date: format(selectedDate, "yyyy-MM-dd"),
            availableSpots: 12,
            bookedSpots: 0,
            price: 1299,
            status: "available",
        };

        setAvailability((prev) => [...prev, newSlot]);
        setSelectedSlot(newSlot);
        setIsEditDialogOpen(true);
    };

    const handleUpdateSlot = (updates: Partial<AvailabilitySlot>) => {
        if (!selectedSlot) return;

        const updatedSlot = { ...selectedSlot, ...updates };
        setAvailability((prev) =>
            prev.map((slot) => (slot.id === selectedSlot.id ? updatedSlot : slot)),
        );
        setSelectedSlot(updatedSlot);
    };

    const handleBlockDates = async () => {
        if (!selectedDate || !selectedTour) return;

        try {
            await tourAPI.blockDates(selectedTour, [format(selectedDate, "yyyy-MM-dd")], blockReason);

            const blockedSlot: AvailabilitySlot = {
                id: Date.now().toString(),
                date: format(selectedDate, "yyyy-MM-dd"),
                availableSpots: 0,
                bookedSpots: 0,
                price: 0,
                status: "blocked",
            };

            setAvailability((prev) => {
                const existing = prev.find((slot) => slot.date === blockedSlot.date);
                if (existing) {
                    return prev.map((slot) =>
                        slot.date === blockedSlot.date
                            ? { ...slot, status: "blocked" }
                            : slot,
                    );
                }
                return [...prev, blockedSlot];
            });

            setIsBlockDialogOpen(false);
            setBlockReason("");
            toast({
                title: "Success",
                description: "Date blocked successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to block date",
                variant: "destructive",
            });
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    return (
        <div className="space-y-6 bg-background">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Availability Calendar
                    </CardTitle>
                    <CardDescription>
                        Manage tour availability, pricing, and blocked dates
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {/* Tour Selection */}
                        <div className="space-y-2">
                            <Label>Select Tour</Label>
                            <Select value={selectedTour} onValueChange={setSelectedTour}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a tour" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tours.map((tour) => (
                                        <SelectItem key={tour.id} value={tour.id}>
                                            {tour.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Calendar */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Calendar</CardTitle>
                                    <CardDescription>
                                        Click on a date to view or edit availability
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={handleDateSelect}
                                        className="rounded-md border"
                                        modifiers={{
                                            available: (date) => {
                                                const slot = getSlotForDate(date);
                                                return slot?.status === "available";
                                            },
                                            limited: (date) => {
                                                const slot = getSlotForDate(date);
                                                return slot?.status === "limited";
                                            },
                                            full: (date) => {
                                                const slot = getSlotForDate(date);
                                                return slot?.status === "full";
                                            },
                                            blocked: (date) => {
                                                const slot = getSlotForDate(date);
                                                return slot?.status === "blocked";
                                            },
                                        }}
                                        modifiersStyles={{
                                            available: { backgroundColor: "#dcfce7", color: "#166534" },
                                            limited: { backgroundColor: "#fef3c7", color: "#92400e" },
                                            full: { backgroundColor: "#fecaca", color: "#991b1b" },
                                            blocked: { backgroundColor: "#f3f4f6", color: "#374151" },
                                        }}
                                    />
                                </CardContent>
                            </Card>

                            {/* Date Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        {selectedDate
                                            ? format(selectedDate, "MMMM d, yyyy")
                                            : "Select a date"}
                                    </CardTitle>
                                    <CardDescription>
                                        {selectedSlot
                                            ? "Availability details for this date"
                                            : "No availability set for this date"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {selectedDate ? (
                                        <div className="space-y-4">
                                            {selectedSlot ? (
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">Status</span>
                                                        <Badge
                                                            className={getStatusColor(selectedSlot.status)}
                                                        >
                                                            {getStatusIcon(selectedSlot.status)}
                                                            <span className="ml-1 capitalize">
                                                                {selectedSlot.status}
                                                            </span>
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">Price</span>
                                                        <span className="text-sm">
                                                            {formatCurrency(selectedSlot.price)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">
                                                            Available Spots
                                                        </span>
                                                        <span className="text-sm">
                                                            {selectedSlot.availableSpots}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">
                                                            Booked Spots
                                                        </span>
                                                        <span className="text-sm">
                                                            {selectedSlot.bookedSpots}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2 pt-2">
                                                        <Dialog
                                                            open={isEditDialogOpen}
                                                            onOpenChange={setIsEditDialogOpen}
                                                        >
                                                            <DialogTrigger asChild>
                                                                <Button size="sm" className="flex-1">
                                                                    <Edit className="h-4 w-4 mr-1" />
                                                                    Edit
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Edit Availability</DialogTitle>
                                                                    <DialogDescription>
                                                                        Update availability details for{" "}
                                                                        {format(selectedDate, "MMMM d, yyyy")}
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="space-y-4">
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div className="space-y-2">
                                                                            <Label>Available Spots</Label>
                                                                            <Input
                                                                                type="number"
                                                                                min="0"
                                                                                value={selectedSlot.availableSpots}
                                                                                onChange={(e) =>
                                                                                    handleUpdateSlot({
                                                                                        availableSpots: parseInt(
                                                                                            e.target.value,
                                                                                        ),
                                                                                    })
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label>Price</Label>
                                                                            <Input
                                                                                type="number"
                                                                                min="0"
                                                                                step="0.01"
                                                                                value={selectedSlot.price}
                                                                                onChange={(e) =>
                                                                                    handleUpdateSlot({
                                                                                        price: parseFloat(e.target.value),
                                                                                    })
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label>Status</Label>
                                                                        <Select
                                                                            value={selectedSlot.status}
                                                                            onValueChange={(value) =>
                                                                                handleUpdateSlot({
                                                                                    status: value as AvailabilitySlot["status"],
                                                                                })
                                                                            }
                                                                        >
                                                                            <SelectTrigger>
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="available">
                                                                                    Available
                                                                                </SelectItem>
                                                                                <SelectItem value="limited">
                                                                                    Limited
                                                                                </SelectItem>
                                                                                <SelectItem value="full">Full</SelectItem>
                                                                                <SelectItem value="blocked">
                                                                                    Blocked
                                                                                </SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                    <div className="flex justify-end gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            onClick={() => setIsEditDialogOpen(false)}
                                                                        >
                                                                            Cancel
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() => {
                                                                                setIsEditDialogOpen(false);
                                                                                toast({
                                                                                    title: "Success",
                                                                                    description:
                                                                                        "Availability updated successfully",
                                                                                });
                                                                            }}
                                                                        >
                                                                            Save Changes
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <Dialog
                                                            open={isBlockDialogOpen}
                                                            onOpenChange={setIsBlockDialogOpen}
                                                        >
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="flex-1"
                                                                >
                                                                    <Ban className="h-4 w-4 mr-1" />
                                                                    Block
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Block Date</DialogTitle>
                                                                    <DialogDescription>
                                                                        Block {format(selectedDate, "MMMM d, yyyy")}{" "}
                                                                        from bookings
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="space-y-4">
                                                                    <div className="space-y-2">
                                                                        <Label>Reason (Optional)</Label>
                                                                        <Textarea
                                                                            placeholder="e.g., Maintenance, Weather, etc."
                                                                            value={blockReason}
                                                                            onChange={(e) =>
                                                                                setBlockReason(e.target.value)
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="flex justify-end gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            onClick={() => setIsBlockDialogOpen(false)}
                                                                        >
                                                                            Cancel
                                                                        </Button>
                                                                        <Button
                                                                            variant="destructive"
                                                                            onClick={handleBlockDates}
                                                                        >
                                                                            Block Date
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center py-6">
                                                    <p className="text-muted-foreground mb-4">
                                                        No availability set for this date
                                                    </p>
                                                    <Button onClick={handleCreateSlot}>
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Create Availability
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-muted-foreground">
                                            <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p>Select a date to view availability</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Legend */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Legend</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
                                        <span className="text-sm">Available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-200"></div>
                                        <span className="text-sm">Limited</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-red-100 border border-red-200"></div>
                                        <span className="text-sm">Full</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200"></div>
                                        <span className="text-sm">Blocked</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
