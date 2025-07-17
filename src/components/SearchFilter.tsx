import React, { useState } from "react";
import { Search, Calendar, Clock, MapPin, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { format } from "date-fns";

interface SearchFilterProps {
  onSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  dateRange: { from: Date | undefined; to: Date | undefined };
  duration: number[];
  priceRange: number[];
  destination: string;
  keyword: string;
}

const SearchFilter = ({ onSearch = () => {} }: SearchFilterProps) => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [duration, setDuration] = useState<number[]>([3]);
  const [priceRange, setPriceRange] = useState<number[]>([500]);
  const [destination, setDestination] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = () => {
    onSearch({
      dateRange,
      duration,
      priceRange,
      destination,
      keyword,
    });
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <div className="flex flex-col space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Find Your Perfect Tour
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Keyword Search */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="keyword" className="font-medium">
              Search
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="keyword"
                placeholder="Keywords or Tour Name"
                className="pl-9"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="flex flex-col space-y-2">
            <Label className="font-medium">Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                        {format(dateRange.to, "MMM dd, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM dd, yyyy")
                    )
                  ) : (
                    <span className="text-gray-500">Select dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="range"
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range) => {
                    setDateRange({
                      from: range?.from,
                      to: range?.to,
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Duration */}
          <div className="flex flex-col space-y-2">
            <Label className="font-medium">Duration (days)</Label>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <Slider
                value={duration}
                min={1}
                max={30}
                step={1}
                onValueChange={(value) => setDuration(value)}
                className="flex-1"
              />
              <span className="w-8 text-center">{duration}</span>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex flex-col space-y-2">
            <Label className="font-medium">Budget (up to $)</Label>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <Slider
                value={priceRange}
                min={100}
                max={10000}
                step={100}
                onValueChange={(value) => setPriceRange(value)}
                className="flex-1"
              />
              <span className="w-16 text-center">${priceRange}</span>
            </div>
          </div>

          {/* Destination */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="destination" className="font-medium">
              Destination
            </Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger id="destination" className="w-full">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Select destination" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="africa">Africa</SelectItem>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="south-america">South America</SelectItem>
                <SelectItem value="australia">Australia & Oceania</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          className="w-full md:w-auto md:self-end bg-primary hover:bg-primary/90 text-white"
          onClick={handleSearch}
        >
          <Search className="mr-2 h-4 w-4" /> Search Tours
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;
