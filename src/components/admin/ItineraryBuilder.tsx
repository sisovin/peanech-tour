import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ItineraryDay } from "@/lib/api";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface ItineraryBuilderProps {
  itinerary: ItineraryDay[];
  onItineraryChange: (itinerary: ItineraryDay[]) => void;
}

export const ItineraryBuilder = ({
  itinerary = [],
  onItineraryChange,
}: ItineraryBuilderProps) => {
  const [newActivity, setNewActivity] = useState("");
  const [newMeal, setNewMeal] = useState("");
  const [editingDay, setEditingDay] = useState<string | null>(null);

  const addDay = () => {
    const newDay: ItineraryDay = {
      id: Date.now().toString(),
      day: itinerary.length + 1,
      title: `Day ${itinerary.length + 1}`,
      description: "",
      activities: [],
      meals: [],
      accommodation: "",
    };
    onItineraryChange([...itinerary, newDay]);
  };

  const removeDay = (dayId: string) => {
    const updatedItinerary = itinerary
      .filter((day) => day.id !== dayId)
      .map((day, index) => ({ ...day, day: index + 1 }));
    onItineraryChange(updatedItinerary);
  };

  const updateDay = (dayId: string, updates: Partial<ItineraryDay>) => {
    const updatedItinerary = itinerary.map((day) =>
      day.id === dayId ? { ...day, ...updates } : day,
    );
    onItineraryChange(updatedItinerary);
  };

  const addActivity = (dayId: string, activity: string) => {
    if (activity.trim()) {
      const day = itinerary.find((d) => d.id === dayId);
      if (day) {
        updateDay(dayId, {
          activities: [...day.activities, activity.trim()],
        });
      }
    }
  };

  const removeActivity = (dayId: string, activityIndex: number) => {
    const day = itinerary.find((d) => d.id === dayId);
    if (day) {
      updateDay(dayId, {
        activities: day.activities.filter((_, index) => index !== activityIndex),
      });
    }
  };

  const addMeal = (dayId: string, meal: string) => {
    if (meal.trim()) {
      const day = itinerary.find((d) => d.id === dayId);
      if (day) {
        updateDay(dayId, {
          meals: [...day.meals, meal.trim()],
        });
      }
    }
  };

  const removeMeal = (dayId: string, mealIndex: number) => {
    const day = itinerary.find((d) => d.id === dayId);
    if (day) {
      updateDay(dayId, {
        meals: day.meals.filter((_, index) => index !== mealIndex),
      });
    }
  };

  return (
    <div className="space-y-6 bg-background">
      <Card>
        <CardHeader>
          <CardTitle>Itinerary Builder</CardTitle>
          <CardDescription>
            Create a detailed day-by-day itinerary for your tour
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={addDay} className="mb-6">
            <Plus className="h-4 w-4 mr-2" />
            Add Day
          </Button>

          <div className="space-y-6">
            {itinerary.map((day, index) => (
              <Card key={day.id} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-lg">Day {day.day}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDay(day.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${day.id}`}>Day Title</Label>
                      <Input
                        id={`title-${day.id}`}
                        value={day.title}
                        onChange={(e) =>
                          updateDay(day.id, { title: e.target.value })
                        }
                        placeholder="e.g., Arrival in Paris"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`accommodation-${day.id}`}>
                        Accommodation
                      </Label>
                      <Input
                        id={`accommodation-${day.id}`}
                        value={day.accommodation || ""}
                        onChange={(e) =>
                          updateDay(day.id, { accommodation: e.target.value })
                        }
                        placeholder="Hotel name or type"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${day.id}`}>Description</Label>
                    <Textarea
                      id={`description-${day.id}`}
                      value={day.description}
                      onChange={(e) =>
                        updateDay(day.id, { description: e.target.value })
                      }
                      placeholder="Describe what happens on this day"
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <Label>Activities</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Add activity"
                          value={editingDay === day.id ? newActivity : ""}
                          onChange={(e) => {
                            setNewActivity(e.target.value);
                            setEditingDay(day.id);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              addActivity(day.id, newActivity);
                              setNewActivity("");
                              setEditingDay(null);
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            addActivity(day.id, newActivity);
                            setNewActivity("");
                            setEditingDay(null);
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {day.activities.map((activity, activityIndex) => (
                          <Badge
                            key={activityIndex}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeActivity(day.id, activityIndex)}
                          >
                            {activity} ×
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Meals</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Add meal"
                          value={editingDay === day.id ? newMeal : ""}
                          onChange={(e) => {
                            setNewMeal(e.target.value);
                            setEditingDay(day.id);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              addMeal(day.id, newMeal);
                              setNewMeal("");
                              setEditingDay(null);
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            addMeal(day.id, newMeal);
                            setNewMeal("");
                            setEditingDay(null);
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {day.meals.map((meal, mealIndex) => (
                          <Badge
                            key={mealIndex}
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => removeMeal(day.id, mealIndex)}
                          >
                            {meal} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {itinerary.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No itinerary days added yet.</p>
              <p className="text-sm">Click "Add Day" to start building your itinerary.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
