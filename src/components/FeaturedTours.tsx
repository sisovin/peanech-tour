import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
  featured: boolean;
  discount?: number;
}

interface FeaturedToursProps {
  tours?: Tour[];
}

const FeaturedTours: React.FC<FeaturedToursProps> = ({
  tours = defaultTours,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const toursToShow = 3; // Number of tours to show at once

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= tours.length ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? tours.length - 1 : prevIndex - 1,
    );
  };

  // Get the tours to display based on current index
  const visibleTours = () => {
    const result = [];
    for (let i = 0; i < toursToShow; i++) {
      const index = (currentIndex + i) % tours.length;
      result.push(tours[index]);
    }
    return result;
  };

  return (
    <div className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Tours</h2>
            <p className="text-muted-foreground mt-2">
              Discover our most popular and exclusive travel experiences
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTours().map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  {tour.discount && (
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      {tour.discount}% OFF
                    </Badge>
                  )}
                </div>
                <CardContent className="flex-grow pt-6">
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < tour.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {tour.rating.toFixed(1)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {tour.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">{tour.duration}</span>
                    </div>
                    <div>
                      <span className="text-lg font-bold">${tour.price}</span>
                      <span className="text-sm text-muted-foreground">
                        {" "}
                        / person
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button asChild className="w-full" variant="default">
                    <Link to={`/tours/${tour.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline">View All Tours</Button>
        </div>
      </div>
    </div>
  );
};

// Default tours data for when no props are provided
const defaultTours: Tour[] = [
  {
    id: "1",
    title: "Majestic Alps Adventure",
    description:
      "Experience the breathtaking beauty of the Swiss Alps with guided hiking tours, cable car rides, and authentic mountain cuisine.",
    price: 1299,
    duration: "7 Days",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800&q=80",
    featured: true,
    discount: 15,
  },
  {
    id: "2",
    title: "Tropical Paradise Getaway",
    description:
      "Relax on pristine beaches, snorkel in crystal-clear waters, and enjoy luxury accommodations in the heart of the Maldives.",
    price: 1899,
    duration: "10 Days",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80",
    featured: true,
  },
  {
    id: "3",
    title: "Historic Rome Explorer",
    description:
      "Walk through ancient history with guided tours of the Colosseum, Roman Forum, Vatican City, and other iconic landmarks.",
    price: 1499,
    duration: "8 Days",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    featured: true,
    discount: 10,
  },
  {
    id: "4",
    title: "Japanese Culture Immersion",
    description:
      "Discover the perfect blend of ancient traditions and modern wonders in Tokyo, Kyoto, and Osaka with local expert guides.",
    price: 2199,
    duration: "12 Days",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    featured: true,
  },
  {
    id: "5",
    title: "African Safari Adventure",
    description:
      "Witness the majestic wildlife of the Serengeti on guided safari tours, with luxury camping and unforgettable sunrise views.",
    price: 2499,
    duration: "9 Days",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    featured: true,
    discount: 5,
  },
];

export default FeaturedTours;
