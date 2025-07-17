import React, { useState, useRef } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { tourAPI, TourImage } from "@/lib/api";
import {
    Upload,
    Image as ImageIcon,
    Trash2,
    Star,
    Eye,
    Download,
    Grid3X3,
    List,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MediaManagerProps {
    tourId?: string;
}

export const MediaManager = ({ tourId }: MediaManagerProps) => {
    const [images, setImages] = useState<TourImage[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedImage, setSelectedImage] = useState<TourImage | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        setUploadProgress(0);

        try {
            const uploadPromises = Array.from(files).map(async (file, index) => {
                // Simulate upload progress
                const progressInterval = setInterval(() => {
                    setUploadProgress((prev) => {
                        const newProgress = prev + (100 / files.length) * 0.1;
                        return Math.min(newProgress, (index + 1) * (100 / files.length));
                    });
                }, 100);

                try {
                    const uploadedImage = await tourAPI.uploadImage(file, tourId);
                    clearInterval(progressInterval);
                    return uploadedImage;
                } catch (error) {
                    clearInterval(progressInterval);
                    throw error;
                }
            });

            const uploadedImages = await Promise.all(uploadPromises);
            setImages((prev) => [...prev, ...uploadedImages]);
            setUploadProgress(100);

            toast({
                title: "Success",
                description: `${uploadedImages.length} image(s) uploaded successfully`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to upload images",
                variant: "destructive",
            });
        } finally {
            setUploading(false);
            setUploadProgress(0);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleDeleteImage = async (imageId: string) => {
        try {
            await tourAPI.deleteImage(imageId);
            setImages((prev) => prev.filter((img) => img.id !== imageId));
            toast({
                title: "Success",
                description: "Image deleted successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete image",
                variant: "destructive",
            });
        }
    };

    const handleSetPrimary = (imageId: string) => {
        setImages((prev) =>
            prev.map((img) => ({
                ...img,
                isPrimary: img.id === imageId,
            })),
        );
        toast({
            title: "Success",
            description: "Primary image updated",
        });
    };

    const handleUpdateAlt = (imageId: string, alt: string) => {
        setImages((prev) =>
            prev.map((img) => (img.id === imageId ? { ...img, alt } : img)),
        );
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-6 bg-background">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <ImageIcon className="h-5 w-5" />
                                Media Manager
                            </CardTitle>
                            <CardDescription>
                                Upload and manage images for your tours
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                            >
                                {viewMode === "grid" ? (
                                    <List className="h-4 w-4" />
                                ) : (
                                    <Grid3X3 className="h-4 w-4" />
                                )}
                            </Button>
                            <Button onClick={triggerFileInput} disabled={uploading}>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Images
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        title="Upload images"
                        placeholder="Select images to upload"
                    />

                    {uploading && (
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Uploading images...</span>
                                <span className="text-sm text-muted-foreground">
                                    {Math.round(uploadProgress)}%
                                </span>
                            </div>
                            <Progress value={uploadProgress} className="w-full" />
                        </div>
                    )}

                    {images.length === 0 ? (
                        <div className="text-center py-12">
                            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No images uploaded</h3>
                            <p className="text-muted-foreground mb-4">
                                Upload images to showcase your tour
                            </p>
                            <Button onClick={triggerFileInput}>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Your First Image
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    {images.length} image(s) uploaded
                                </p>
                                <Badge variant="secondary">
                                    {images.filter((img) => img.isPrimary).length > 0
                                        ? "Primary image set"
                                        : "No primary image"}
                                </Badge>
                            </div>

                            {viewMode === "grid" ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {images.map((image) => (
                                        <Card key={image.id} className="overflow-hidden">
                                            <div className="relative aspect-video">
                                                <img
                                                    src={image.url}
                                                    alt={image.alt}
                                                    className="w-full h-full object-cover"
                                                />
                                                {image.isPrimary && (
                                                    <Badge className="absolute top-2 left-2">
                                                        <Star className="h-3 w-3 mr-1" />
                                                        Primary
                                                    </Badge>
                                                )}
                                                <div className="absolute top-2 right-2 flex gap-1">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                variant="secondary"
                                                                className="h-8 w-8 p-0"
                                                                onClick={() => setSelectedImage(image)}
                                                            >
                                                                <Eye className="h-3 w-3" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-4xl">
                                                            <DialogHeader>
                                                                <DialogTitle>Image Preview</DialogTitle>
                                                                <DialogDescription>
                                                                    {image.alt || "Tour image"}
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="aspect-video">
                                                                <img
                                                                    src={image.url}
                                                                    alt={image.alt}
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => handleDeleteImage(image.id)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <CardContent className="p-3">
                                                <div className="space-y-2">
                                                    <Input
                                                        placeholder="Alt text"
                                                        value={image.alt}
                                                        onChange={(e) =>
                                                            handleUpdateAlt(image.id, e.target.value)
                                                        }
                                                        className="text-xs"
                                                    />
                                                    <div className="flex gap-1">
                                                        {!image.isPrimary && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="flex-1 text-xs"
                                                                onClick={() => handleSetPrimary(image.id)}
                                                            >
                                                                <Star className="h-3 w-3 mr-1" />
                                                                Set Primary
                                                            </Button>
                                                        )}
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="px-2"
                                                            onClick={() => window.open(image.url, "_blank")}
                                                        >
                                                            <Download className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {images.map((image) => (
                                        <Card key={image.id}>
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={image.url}
                                                            alt={image.alt}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <Input
                                                                placeholder="Alt text"
                                                                value={image.alt}
                                                                onChange={(e) =>
                                                                    handleUpdateAlt(image.id, e.target.value)
                                                                }
                                                                className="flex-1"
                                                            />
                                                            {image.isPrimary && (
                                                                <Badge>
                                                                    <Star className="h-3 w-3 mr-1" />
                                                                    Primary
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {!image.isPrimary && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleSetPrimary(image.id)}
                                                            >
                                                                <Star className="h-4 w-4 mr-1" />
                                                                Set Primary
                                                            </Button>
                                                        )}
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => setSelectedImage(image)}
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-4xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>Image Preview</DialogTitle>
                                                                    <DialogDescription>
                                                                        {image.alt || "Tour image"}
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="aspect-video">
                                                                    <img
                                                                        src={image.url}
                                                                        alt={image.alt}
                                                                        className="w-full h-full object-contain"
                                                                    />
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => window.open(image.url, "_blank")}
                                                        >
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDeleteImage(image.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
