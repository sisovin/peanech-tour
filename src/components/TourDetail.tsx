import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  CalendarIcon,
  Clock,
  MapPin,
  Users,
  Check,
  X,
  Star,
} from "lucide-react";
import { format } from "date-fns";
interface TourDetailProps {
  tour?: {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    location: string;
    rating: number;
    reviewCount: number;
    images: string[];
    included: string[];
    excluded: string[];
    itinerary: {
      day: number;
      title: string;
      description: string;
      activities: string[];
    }[];
  };
}

function TourDetail(props: TourDetailProps) {

  const allTours = [
    {
      id: "1",
      title: "Majestic Alps Adventure Tour",
      description:
        "Experience the breathtaking beauty of the Swiss Alps with our premium guided tour. Trek through stunning mountain landscapes, visit charming alpine villages, and enjoy authentic local cuisine. This all-inclusive package offers the perfect balance of adventure and relaxation in one of Europe's most picturesque regions.",
      price: 1299,
      duration: 7,
      rating: 4.8,
      reviewCount: 124,
      location: "Swiss Alps, Switzerland",
      images: [
        "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80",
        "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800&q=80",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
      ],
      included: [
        "Professional English-speaking guide",
        "6 nights accommodation in mountain lodges",
        "All breakfasts and dinners",
        "Transportation between locations",
        "Hiking equipment rental",
        "Entry fees to national parks",
      ],
      excluded: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Lunches and snacks",
        "Optional activities",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Zurich",
          description:
            "Welcome to Switzerland! Transfer from Zurich Airport to your hotel in the city center. Evening welcome dinner with your tour group and guide briefing.",
          activities: ["Airport transfer", "Welcome dinner", "Tour briefing"],
        },
        {
          day: 2,
          title: "Journey to Lucerne",
          description:
            "Morning departure to the beautiful city of Lucerne. Explore the historic old town and take a boat cruise on Lake Lucerne. Overnight in Lucerne.",
          activities: [
            "Guided city tour",
            "Lake cruise",
            "Free time for shopping",
          ],
        },
        {
          day: 3,
          title: "Interlaken & Lauterbrunnen Valley",
          description:
            "Travel to Interlaken, situated between two alpine lakes. Continue to the spectacular Lauterbrunnen Valley, known for its 72 waterfalls.",
          activities: [
            "Scenic train journey",
            "Waterfall hike",
            "Cable car ride",
          ],
        },
        {
          day: 4,
          title: "Grindelwald & First Mountain",
          description:
            "Full day exploring the Grindelwald area and First Mountain. Optional activities include the cliff walk, mountain cart, and zip-lining.",
          activities: [
            "First Cliff Walk",
            "Mountain adventure activities",
            "Alpine flora exploration",
          ],
        },
        {
          day: 5,
          title: "Zermatt & Matterhorn Views",
          description:
            "Transfer to Zermatt, a car-free village at the foot of the iconic Matterhorn. Take the Gornergrat railway for spectacular mountain views.",
          activities: [
            "Gornergrat railway journey",
            "Matterhorn viewing",
            "Village exploration",
          ],
        },
        {
          day: 6,
          title: "Alpine Hiking Day",
          description:
            "Choose from several guided hiking options based on your preference and fitness level. Enjoy a traditional Swiss fondue dinner in the evening.",
          activities: [
            "Guided hiking options",
            "Alpine wildlife spotting",
            "Swiss fondue experience",
          ],
        },
        {
          day: 7,
          title: "Return to Zurich & Departure",
          description:
            "Morning at leisure before transferring back to Zurich. Tour concludes with airport drop-off or optional extension stay in Zurich.",
          activities: [
            "Souvenir shopping",
            "Transfer to Zurich",
            "Departure assistance",
          ],
        },
      ],
    },
    // Add more tours here if needed
  ];

  const { id: paramId } = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [travelers, setTravelers] = useState(1);

  // Find the tour by id from URL, or use prop, or fallback to first tour
  let displayTour = props.tour;
  if (!displayTour && paramId) {
    displayTour = allTours.find((t) => t.id === paramId);
  }
  if (!displayTour) {
    displayTour = allTours[0];
  }

  const handleBookNow = () => {
    // Booking logic would go here
    console.log("Booking for", displayTour.title);
    console.log("Date:", date);
    console.log("Travelers:", travelers);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Tour details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{displayTour.title}</h1>

          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {displayTour.location}
            </span>
            <div className="flex items-center ml-4">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{displayTour.rating}</span>
              <span className="text-muted-foreground ml-1">
                ({displayTour.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Image Gallery */}
          <Carousel className="w-full mb-8">
            <CarouselContent>
              {displayTour.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`${displayTour.title} - image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>

          {/* Tour Info Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="included">What's Included</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tour Overview</CardTitle>
                  <CardDescription>
                    Everything you need to know about this tour
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm text-muted-foreground">
                          {displayTour.duration} days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Group Size</p>
                        <p className="text-sm text-muted-foreground">
                          Max 12 people
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">
                          {displayTour.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground mb-6">
                    {displayTour.description}
                  </p>

                  <h3 className="text-lg font-medium mb-2">Highlights</h3>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    <li>Breathtaking views of the Swiss Alps</li>
                    <li>Guided hiking experiences for all skill levels</li>
                    <li>Traditional Swiss cuisine and cultural experiences</li>
                    <li>Comfortable accommodations in scenic locations</li>
                    <li>Expert local guides with extensive knowledge</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="itinerary" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tour Itinerary</CardTitle>
                  <CardDescription>
                    Day-by-day schedule of activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {displayTour.itinerary.map((day) => (
                      <div
                        key={day.day}
                        className="relative pl-8 border-l border-border"
                      >
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                        <h3 className="text-lg font-medium mb-1">
                          Day {day.day}: {day.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {day.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {day.activities.map((activity, index) => (
                            <Badge key={index} variant="outline">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="included" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                  <CardDescription>
                    Details about what is and isn't included in the tour price
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        Included in the price
                      </h3>
                      <ul className="space-y-2">
                        {displayTour.included.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                            <span className="text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <X className="h-5 w-5 text-red-500 mr-2" />
                        Not included in the price
                      </h3>
                      <ul className="space-y-2">
                        {displayTour.excluded.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <X className="h-4 w-4 text-red-500 mr-2 mt-1 shrink-0" />
                            <span className="text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium">
                        {displayTour.rating}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        ({displayTour.reviewCount} reviews)
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Sample reviews - would be populated from API in real implementation */}
                    <div className="border-b border-border pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < displayTour.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <div className="container mx-auto px-4 py-8 bg-background">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left column - Tour details */}
                            <div className="lg:col-span-2">
                              <h1 className="text-3xl font-bold mb-2">{displayTour.title}</h1>
                                {/* ... remaining code ... */}
                              </div>
                              {/* Right column - Booking widget */}
                              <div>
                                {/* ... booking widget code ... */}
                              </div>
                            </div>
                          </div>
                        );
                        <p className="text-sm font-medium">
                          export default TourDetail;
                          Sarah T. - Traveled June 2023
                        </p>
                      </div>

                      <div className="border-b border-border pb-4">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 font-medium">
                            Great tour, minor issues
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          "Overall a fantastic experience with beautiful hiking
                          trails and comfortable accommodations. The only downside
                          was that some of the activities felt a bit rushed. Would
                          still recommend though!"
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Michael R. - Traveled August 2023
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 font-medium">
                            Unforgettable journey
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          "This was the highlight of our European vacation. The
                          Swiss Alps are stunning, and this tour provided the
                          perfect way to experience them. The fondue dinner was a
                          particular highlight, and our guide Marco was
                          exceptional."
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Jennifer & David L. - Traveled September 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Reviews
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column - Booking widget */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Book This Tour</CardTitle>
              <CardDescription>
                Starting from ${displayTour.price} per person
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      id="date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelers">Number of Travelers</Label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    disabled={travelers <= 1}
                  >
                    -
                  </Button>
                  <Input
                    id="travelers"
                    type="number"
                    value={travelers}
                    onChange={(e) =>
                      setTravelers(parseInt(e.target.value) || 1)
                    }
                    min="1"
                    max="10"
                    className="mx-2 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTravelers(Math.min(10, travelers + 1))}
                    disabled={travelers >= 10}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base price</span>
                  <span>
                    ${displayTour.price} x {travelers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & fees</span>
                  <span>
                    ${Math.round(displayTour.price * travelers * 0.1)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    $
                    {displayTour.price * travelers +
                      Math.round(displayTour.price * travelers * 0.1)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleBookNow}>
                Book Now
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Have questions about this tour? Our travel experts are ready to
                assist you.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Call us</p>
                    <p className="text-sm text-muted-foreground">
                      +1 (800) 123-4567
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email us</p>
                    <p className="text-sm text-muted-foreground">
                      support@tourcompany.com
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
