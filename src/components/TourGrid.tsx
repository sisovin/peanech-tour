import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Star, Users } from "lucide-react";

interface TourCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  rating: number;
  category: string;
  maxGroupSize: number;
  featured?: boolean;
  onViewDetails: (id: string) => void;
}

interface TourGridProps {
  tours?: TourCardProps[];
  title?: string;
  description?: string;
  layout?: "grid" | "list";
  categories?: string[];
  onFilterChange?: (category: string) => void;
}

const TourCard = ({
  id,
  title,
  image,
  price,
  duration,
  location,
  rating,
  category,
  maxGroupSize,
  featured = false,
  onViewDetails,
}: TourCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col bg-white">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {featured && (
          <Badge className="absolute top-2 right-2 bg-primary text-white">
            Featured
          </Badge>
        )}
        <Badge className="absolute bottom-2 left-2 bg-white/90 text-primary">
          {category}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Max {maxGroupSize} people
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 border-t">
        <div className="font-bold">
          ${price}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            / person
          </span>
        </div>
        <Button size="sm" onClick={() => onViewDetails(id)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

const TourGrid = ({
  tours = defaultTours,
  title = "Explore Our Tours",
  description = "Discover our most popular and exciting tour packages",
  layout = "grid",
  categories = ["All", "Adventure", "Cultural", "Beach", "City", "Wildlife"],
  onFilterChange = () => {},
}: TourGridProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  const filteredTours =
    activeCategory === "All"
      ? tours
      : tours.filter((tour) => tour.category === activeCategory);

  return (
    <div className="w-full bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <Tabs defaultValue="All" className="mb-8">
          <div className="flex justify-center">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>

        <div
          className={`grid gap-6 ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
        >
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              {...tour}
              onViewDetails={(id) => console.log(`View details for tour ${id}`)}
            />
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No tours found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Default mock data
const defaultTours: TourCardProps[] = [
  {
    id: "1",
    title: "Majestic Alps Hiking Adventure",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    price: 1299,
    duration: "7 days",
    location: "Swiss Alps",
    rating: 4.8,
    category: "Adventure",
    maxGroupSize: 12,
    featured: true,
    onViewDetails: () => {},
  },
  {
    id: "2",
    title: "Ancient Rome Cultural Experience",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    price: 899,
    duration: "5 days",
    location: "Rome, Italy",
    rating: 4.6,
    category: "Cultural",
    maxGroupSize: 15,
    onViewDetails: () => {},
  },
  {
    id: "3",
    title: "Tropical Paradise Beach Retreat",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80",
    price: 1599,
    duration: "10 days",
    location: "Bali, Indonesia",
    rating: 4.9,
    category: "Beach",
    maxGroupSize: 10,
    featured: true,
    onViewDetails: () => {},
  },
  {
    id: "4",
    title: "Urban Explorer: New York City",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    price: 1199,
    duration: "4 days",
    location: "New York, USA",
    rating: 4.5,
    category: "City",
    maxGroupSize: 20,
    onViewDetails: () => {},
  },
  {
    id: "5",
    title: "African Safari Wildlife Expedition",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    price: 2499,
    duration: "12 days",
    location: "Kenya & Tanzania",
    rating: 4.9,
    category: "Wildlife",
    maxGroupSize: 8,
    featured: true,
    onViewDetails: () => {},
  },
  {
    id: "6",
    title: "Mountain Biking Extreme",
    image:
      "https://images.unsplash.com/photo-1594750852563-5ed8e0fe2b15?w=800&q=80",
    price: 899,
    duration: "3 days",
    location: "Moab, Utah",
    rating: 4.7,
    category: "Adventure",
    maxGroupSize: 6,
    onViewDetails: () => {},
  },
  {
    id: "7",
    title: "Historic Athens Discovery",
    image:
      "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
    price: 799,
    duration: "6 days",
    location: "Athens, Greece",
    rating: 4.6,
    category: "Cultural",
    maxGroupSize: 15,
    onViewDetails: () => {},
  },
  {
    id: "8",
    title: "Caribbean Island Hopping",
    image:
      "https://images.unsplash.com/photo-1580237541049-2d715a09486e?w=800&q=80",
    price: 2199,
    duration: "14 days",
    location: "Caribbean Islands",
    rating: 4.8,
    category: "Beach",
    maxGroupSize: 12,
    onViewDetails: () => {},
  },
];

export default TourGrid;
