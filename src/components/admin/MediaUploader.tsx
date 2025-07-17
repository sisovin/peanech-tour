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
import { Progress } from "@/components/ui/progress";
import { tourAPI, TourImage } from "@/lib/api";
import {
    Upload,
    Image as ImageIcon,
    Trash2,
    Star,
    X,
    Plus,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MediaUploaderProps {
    images: TourImage[];
    onImagesChange: (images: TourImage[]) => void;
    tourId?: string;
}

export const MediaUploader = ({
    images = [],
    onImagesChange,
    tourId,
}: MediaUploaderProps) => {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileSelect = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setUploading(true);
        setUploadProgress(0);

        try {
            const uploadPromises = Array.from(files).map(async (file, index) => {
                // Validate file type
                if (!file.type.startsWith("image/")) {
                    throw new Error(`${file.name} is not a valid image file`);
                }

                // Validate file size (max 10MB)
                if (file.size > 10 * 1024 * 1024) {
                    throw new Error(`${file.name} is too large (max 10MB)`);
                }

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
            const newImages = [...images, ...uploadedImages];

            // If this is the first image, make it primary
            if (images.length === 0 && uploadedImages.length > 0) {
                newImages[0] = { ...newImages[0], isPrimary: true };
            }

            onImagesChange(newImages);
            setUploadProgress(100);

            toast({
                title: "Success",
                description: `${uploadedImages.length} image(s) uploaded successfully`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to upload images",
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

    const handleDeleteImage = (imageId: string) => {
        const updatedImages = images.filter((img) => img.id !== imageId);

        // If we deleted the primary image, make the first remaining image primary
        if (updatedImages.length > 0 && !updatedImages.some(img => img.isPrimary)) {
            updatedImages[0] = { ...updatedImages[0], isPrimary: true };
        }

        onImagesChange(updatedImages);
        toast({
            title: "Success",
            description: "Image removed successfully",
        });
    };

    const handleSetPrimary = (imageId: string) => {
        const updatedImages = images.map((img) => ({
            ...img,
            isPrimary: img.id === imageId,
        }));
        onImagesChange(updatedImages);
        toast({
            title: "Success",
            description: "Primary image updated",
        });
    };

    const handleUpdateAlt = (imageId: string, alt: string) => {
        const updatedImages = images.map((img) =>
            img.id === imageId ? { ...img, alt } : img,
        );
        onImagesChange(updatedImages);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-6 bg-background">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" />
                        Media Upload
                    </CardTitle>
                    <CardDescription>
                        Upload images for your tour package. The first image will be used as the primary image.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                        title="Upload images"
                        placeholder="Select images to upload"
                    />

                    {/* Upload Area */}
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                                ? "border-primary bg-primary/5"
                                : "border-muted-foreground/25 hover:border-muted-foreground/50"
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            {dragActive ? "Drop images here" : "Upload tour images"}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Drag and drop images here, or click to select files
                        </p>
                        <Button onClick={triggerFileInput} disabled={uploading}>
                            <Upload className="h-4 w-4 mr-2" />
                            {uploading ? "Uploading..." : "Choose Images"}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                            Supported formats: JPG, PNG, WebP (max 10MB each)
                        </p>
                    </div>

                    {/* Upload Progress */}
                    {uploading && (
                        <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Uploading images...</span>
                                <span className="text-sm text-muted-foreground">
                                    {Math.round(uploadProgress)}%
                                </span>
                            </div>
                            <Progress value={uploadProgress} className="w-full" />
                        </div>
                    )}

                    {/* Image Grid */}
                    {images.length > 0 && (
                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Uploaded Images</h3>
                                <Badge variant="secondary">
                                    {images.length} image{images.length !== 1 ? "s" : ""}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {images.map((image, index) => (
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
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="absolute top-2 right-2 h-8 w-8 p-0"
                                                onClick={() => handleDeleteImage(image.id)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <CardContent className="p-3">
                                            <div className="space-y-2">
                                                <Input
                                                    placeholder="Alt text (optional)"
                                                    value={image.alt}
                                                    onChange={(e) =>
                                                        handleUpdateAlt(image.id, e.target.value)
                                                    }
                                                    className="text-xs"
                                                />
                                                {!image.isPrimary && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="w-full text-xs"
                                                        onClick={() => handleSetPrimary(image.id)}
                                                    >
                                                        <Star className="h-3 w-3 mr-1" />
                                                        Set as Primary
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                {/* Add More Button */}
                                <Card className="border-dashed">
                                    <CardContent className="p-0">
                                        <Button
                                            variant="ghost"
                                            className="w-full h-full aspect-video flex flex-col gap-2"
                                            onClick={triggerFileInput}
                                            disabled={uploading}
                                        >
                                            <Plus className="h-8 w-8 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">
                                                Add More Images
                                            </span>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
