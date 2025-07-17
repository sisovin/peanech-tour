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
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    PricingConfig,
    SeasonalRate,
    Discount,
    GroupDiscount,
} from "../../lib/api";
import { Plus, Trash2, DollarSign, Calendar, Users } from "lucide-react";

interface PricingConfigurationProps {
    pricing: PricingConfig;
    onPricingChange: (pricing: PricingConfig) => void;
}

export const PricingConfiguration = ({
    pricing = {
        basePrice: 0,
        seasonalRates: [],
        discounts: [],
        groupDiscounts: [],
    },
    onPricingChange,
}: PricingConfigurationProps) => {
    const [newSeasonalRate, setNewSeasonalRate] = useState<
        Partial<SeasonalRate>
    >({});
    const [newDiscount, setNewDiscount] = useState<Partial<Discount>>({});
    const [newGroupDiscount, setNewGroupDiscount] = useState<
        Partial<GroupDiscount>
    >({});

    const updateBasePrice = (price: number) => {
        onPricingChange({ ...pricing, basePrice: price });
    };

    const addSeasonalRate = () => {
        if (
            newSeasonalRate.name &&
            newSeasonalRate.startDate &&
            newSeasonalRate.endDate &&
            newSeasonalRate.multiplier
        ) {
            const rate: SeasonalRate = {
                id: Date.now().toString(),
                name: newSeasonalRate.name,
                startDate: newSeasonalRate.startDate,
                endDate: newSeasonalRate.endDate,
                multiplier: newSeasonalRate.multiplier,
            };
            onPricingChange({
                ...pricing,
                seasonalRates: [...pricing.seasonalRates, rate],
            });
            setNewSeasonalRate({});
        }
    };

    const removeSeasonalRate = (rateId: string) => {
        onPricingChange({
            ...pricing,
            seasonalRates: pricing.seasonalRates.filter((rate) => rate.id !== rateId),
        });
    };

    const addDiscount = () => {
        if (
            newDiscount.name &&
            newDiscount.type &&
            newDiscount.value &&
            newDiscount.validFrom &&
            newDiscount.validTo
        ) {
            const discount: Discount = {
                id: Date.now().toString(),
                name: newDiscount.name,
                type: newDiscount.type as "percentage" | "fixed",
                value: newDiscount.value,
                validFrom: newDiscount.validFrom,
                validTo: newDiscount.validTo,
                minBookings: newDiscount.minBookings,
            };
            onPricingChange({
                ...pricing,
                discounts: [...pricing.discounts, discount],
            });
            setNewDiscount({});
        }
    };

    const removeDiscount = (discountId: string) => {
        onPricingChange({
            ...pricing,
            discounts: pricing.discounts.filter(
                (discount) => discount.id !== discountId,
            ),
        });
    };

    const addGroupDiscount = () => {
        if (
            newGroupDiscount.minSize &&
            newGroupDiscount.maxSize &&
            newGroupDiscount.discountPercentage
        ) {
            const groupDiscount: GroupDiscount = {
                id: Date.now().toString(),
                minSize: newGroupDiscount.minSize,
                maxSize: newGroupDiscount.maxSize,
                discountPercentage: newGroupDiscount.discountPercentage,
            };
            onPricingChange({
                ...pricing,
                groupDiscounts: [...pricing.groupDiscounts, groupDiscount],
            });
            setNewGroupDiscount({});
        }
    };

    const removeGroupDiscount = (discountId: string) => {
        onPricingChange({
            ...pricing,
            groupDiscounts: pricing.groupDiscounts.filter(
                (discount) => discount.id !== discountId,
            ),
        });
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
                        <DollarSign className="h-5 w-5" />
                        Pricing Configuration
                    </CardTitle>
                    <CardDescription>
                        Set up base pricing and configure seasonal rates, discounts, and group pricing
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {/* Base Price */}
                        <div className="space-y-2">
                            <Label htmlFor="basePrice">Base Price (USD) *</Label>
                            <Input
                                id="basePrice"
                                type="number"
                                min="0"
                                step="0.01"
                                value={pricing.basePrice}
                                onChange={(e) => updateBasePrice(parseFloat(e.target.value) || 0)}
                                placeholder="Enter base price"
                            />
                            <p className="text-sm text-muted-foreground">
                                This is the standard price per person for your tour
                            </p>
                        </div>

                        <Separator />

                        <Tabs defaultValue="seasonal" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="seasonal">Seasonal Rates</TabsTrigger>
                                <TabsTrigger value="discounts">Discounts</TabsTrigger>
                                <TabsTrigger value="group">Group Pricing</TabsTrigger>
                            </TabsList>

                            <TabsContent value="seasonal" className="space-y-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar className="h-4 w-4" />
                                    <h3 className="text-lg font-semibold">Seasonal Rates</h3>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Add Seasonal Rate</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Season Name</Label>
                                                <Input
                                                    placeholder="e.g., Peak Season"
                                                    value={newSeasonalRate.name || ""}
                                                    onChange={(e) =>
                                                        setNewSeasonalRate({
                                                            ...newSeasonalRate,
                                                            name: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Price Multiplier</Label>
                                                <Input
                                                    type="number"
                                                    min="0.1"
                                                    step="0.1"
                                                    placeholder="1.5 (150% of base price)"
                                                    value={newSeasonalRate.multiplier || ""}
                                                    onChange={(e) =>
                                                        setNewSeasonalRate({
                                                            ...newSeasonalRate,
                                                            multiplier: parseFloat(e.target.value),
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Start Date</Label>
                                                <Input
                                                    type="date"
                                                    value={newSeasonalRate.startDate || ""}
                                                    onChange={(e) =>
                                                        setNewSeasonalRate({
                                                            ...newSeasonalRate,
                                                            startDate: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>End Date</Label>
                                                <Input
                                                    type="date"
                                                    value={newSeasonalRate.endDate || ""}
                                                    onChange={(e) =>
                                                        setNewSeasonalRate({
                                                            ...newSeasonalRate,
                                                            endDate: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={addSeasonalRate}>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Seasonal Rate
                                        </Button>
                                    </CardContent>
                                </Card>

                                <div className="space-y-2">
                                    {pricing.seasonalRates.map((rate) => (
                                        <div
                                            key={rate.id}
                                            className="flex items-center justify-between p-3 border rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium">{rate.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {rate.startDate} to {rate.endDate} •{" "}
                                                    {formatCurrency(pricing.basePrice * rate.multiplier)} per person
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeSeasonalRate(rate.id)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="discounts" className="space-y-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Badge className="h-4 w-4" />
                                    <h3 className="text-lg font-semibold">Discounts</h3>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Add Discount</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Discount Name</Label>
                                                <Input
                                                    placeholder="e.g., Early Bird"
                                                    value={newDiscount.name || ""}
                                                    onChange={(e) =>
                                                        setNewDiscount({
                                                            ...newDiscount,
                                                            name: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Discount Type</Label>
                                                <Select
                                                    value={newDiscount.type || ""}
                                                    onValueChange={(value) =>
                                                        setNewDiscount({
                                                            ...newDiscount,
                                                            type: value as "percentage" | "fixed",
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="percentage">Percentage</SelectItem>
                                                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Discount Value</Label>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    placeholder={newDiscount.type === "percentage" ? "10 (for 10%)" : "50 (for $50)"}
                                                    value={newDiscount.value || ""}
                                                    onChange={(e) =>
                                                        setNewDiscount({
                                                            ...newDiscount,
                                                            value: parseFloat(e.target.value),
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Min Bookings (Optional)</Label>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    placeholder="Minimum bookings required"
                                                    value={newDiscount.minBookings || ""}
                                                    onChange={(e) =>
                                                        setNewDiscount({
                                                            ...newDiscount,
                                                            minBookings: parseInt(e.target.value),
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Valid From</Label>
                                                <Input
                                                    type="date"
                                                    value={newDiscount.validFrom || ""}
                                                    onChange={(e) =>
                                                        setNewDiscount({
                                                            ...newDiscount,
                                                            validFrom: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Valid To</Label>
                                                <Input
                                                    type="date"
                                                    value={newDiscount.validTo || ""}
                                                    onChange={(e) =>
                                                        setNewDiscount({
                                                            ...newDiscount,
                                                            validTo: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={addDiscount}>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Discount
                                        </Button>
                                    </CardContent>
                                </Card>

                                <div className="space-y-2">
                                    {pricing.discounts.map((discount) => (
                                        <div
                                            key={discount.id}
                                            className="flex items-center justify-between p-3 border rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium">{discount.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {discount.type === "percentage"
                                                        ? `${discount.value}% off`
                                                        : formatCurrency(discount.value)} •{" "}
                                                    Valid: {discount.validFrom} to {discount.validTo}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeDiscount(discount.id)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="group" className="space-y-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Users className="h-4 w-4" />
                                    <h3 className="text-lg font-semibold">Group Discounts</h3>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Add Group Discount</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label>Min Group Size</Label>
                                                <Input
                                                    type="number"
                                                    min="2"
                                                    placeholder="e.g., 5"
                                                    value={newGroupDiscount.minSize || ""}
                                                    onChange={(e) =>
                                                        setNewGroupDiscount({
                                                            ...newGroupDiscount,
                                                            minSize: parseInt(e.target.value),
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Max Group Size</Label>
                                                <Input
                                                    type="number"
                                                    min="2"
                                                    placeholder="e.g., 10"
                                                    value={newGroupDiscount.maxSize || ""}
                                                    onChange={(e) =>
                                                        setNewGroupDiscount({
                                                            ...newGroupDiscount,
                                                            maxSize: parseInt(e.target.value),
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Discount Percentage</Label>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    placeholder="e.g., 15"
                                                    value={newGroupDiscount.discountPercentage || ""}
                                                    onChange={(e) =>
                                                        setNewGroupDiscount({
                                                            ...newGroupDiscount,
                                                            discountPercentage: parseFloat(e.target.value),
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={addGroupDiscount}>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Group Discount
                                        </Button>
                                    </CardContent>
                                </Card>

                                <div className="space-y-2">
                                    {pricing.groupDiscounts.map((discount) => (
                                        <div
                                            key={discount.id}
                                            className="flex items-center justify-between p-3 border rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {discount.minSize}-{discount.maxSize} people
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {discount.discountPercentage}% discount
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeGroupDiscount(discount.id)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
