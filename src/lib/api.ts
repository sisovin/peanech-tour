// TourImage type for media manager
export interface TourImage {
    id: string;
    url: string;
    alt: string;
    isPrimary?: boolean;
}

// ItineraryDay type for itinerary builder
export interface ItineraryDay {
    id: string;
    day: number;
    title: string;
    description: string;
    activities: string[];
    meals: string[];
    accommodation?: string;
}
// Types for pricing configuration

export interface SeasonalRate {
    id: string;
    name: string;
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    multiplier: number;
}

export interface Discount {
    id: string;
    name: string;
    type: "percentage" | "fixed";
    value: number;
    validFrom: string; // ISO date string
    validTo: string;   // ISO date string
    minBookings?: number;
}

export interface GroupDiscount {
    id: string;
    minSize: number;
    maxSize: number;
    discountPercentage: number;
}

export interface PricingConfig {
    basePrice: number;
    seasonalRates: SeasonalRate[];
    discounts: Discount[];
    groupDiscounts: GroupDiscount[];
}

// Types for tours and availability
export interface Tour {
    id: string;
    title: string;
    description?: string;
    // Add more fields as needed
}

export type AvailabilityStatus = "available" | "limited" | "full" | "blocked";

export interface AvailabilitySlot {
    id: string;
    date: string; // ISO date string
    availableSpots: number;
    bookedSpots: number;
    price: number;
    status: AvailabilityStatus;
}

// Mock tourAPI for demonstration (replace with real API calls as needed)
export const tourAPI = {
    async getTours(): Promise<{ tours: Tour[] }> {
        // Mock data
        return {
            tours: [
                { id: "1", title: "Safari Adventure" },
                { id: "2", title: "Cultural Wonders" },
            ],
        };
    },
    async blockDates(tourId: string, dates: string[], reason: string): Promise<void> {
        // Mock implementation
        return;
    },
    async uploadImage(file: File, tourId?: string): Promise<TourImage> {
        // Mock upload: return a fake image object
        return {
            id: Date.now().toString(),
            url: URL.createObjectURL(file),
            alt: file.name,
            isPrimary: false,
        };
    },
    async deleteImage(imageId: string): Promise<void> {
        // Mock delete: do nothing
        return;
    },
};
