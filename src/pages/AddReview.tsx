import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/StarRating";
import { RatingSlider } from "@/components/RatingSlider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

const AddReview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    reviewerName: "",
    hostelName: "",
    hostelType: "" as "Boys" | "Girls" | "Co-Ed" | "",
    city: "",
    mealType: "" as "Breakfast" | "Lunch" | "Dinner" | "Snacks" | "",
    dishName: "",
    overallRating: 0,
    tasteRating: 3,
    hygieneRating: 3,
    quantityRating: 3,
    reviewText: "",
    isRecommended: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.reviewerName.trim()) {
      toast({ title: "Error", description: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!formData.hostelName.trim()) {
      toast({ title: "Error", description: "Please enter hostel name", variant: "destructive" });
      return;
    }
    if (!formData.hostelType) {
      toast({ title: "Error", description: "Please select hostel type", variant: "destructive" });
      return;
    }
    if (!formData.mealType) {
      toast({ title: "Error", description: "Please select meal type", variant: "destructive" });
      return;
    }
    if (formData.overallRating === 0) {
      toast({ title: "Error", description: "Please give an overall rating", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reviews").insert({
        reviewer_name: formData.reviewerName.trim(),
        hostel_name: formData.hostelName.trim(),
        hostel_type: formData.hostelType,
        city: formData.city.trim() || null,
        meal_type: formData.mealType,
        dish_name: formData.dishName.trim() || null,
        overall_rating: formData.overallRating,
        taste_rating: formData.tasteRating,
        hygiene_rating: formData.hygieneRating,
        quantity_rating: formData.quantityRating,
        review_text: formData.reviewText.trim() || null,
        is_recommended: formData.isRecommended,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your review has been submitted successfully.",
      });

      navigate("/reviews");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Add Your Review</h1>
          <p className="text-muted-foreground mt-2">
            Share your experience about hostel food
          </p>
        </div>

        <Card className="card-shadow animate-fade-in">
          <CardHeader>
            <CardTitle>Review Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reviewerName">Your Name *</Label>
                  <Input
                    id="reviewerName"
                    placeholder="Enter your name"
                    value={formData.reviewerName}
                    onChange={(e) =>
                      setFormData({ ...formData, reviewerName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Hostel Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hostelName">Hostel Name *</Label>
                  <Input
                    id="hostelName"
                    placeholder="Enter hostel name"
                    value={formData.hostelName}
                    onChange={(e) =>
                      setFormData({ ...formData, hostelName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hostel Type *</Label>
                  <Select
                    value={formData.hostelType}
                    onValueChange={(value: "Boys" | "Girls" | "Co-Ed") =>
                      setFormData({ ...formData, hostelType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Boys">Boys</SelectItem>
                      <SelectItem value="Girls">Girls</SelectItem>
                      <SelectItem value="Co-Ed">Co-Ed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Food Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Meal Type *</Label>
                  <Select
                    value={formData.mealType}
                    onValueChange={(value: "Breakfast" | "Lunch" | "Dinner" | "Snacks") =>
                      setFormData({ ...formData, mealType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Snacks">Snacks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dishName">Dish Name</Label>
                  <Input
                    id="dishName"
                    placeholder="E.g., Dal Rice, Paratha"
                    value={formData.dishName}
                    onChange={(e) =>
                      setFormData({ ...formData, dishName: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Overall Rating */}
              <div className="space-y-3 py-4 px-4 bg-secondary/30 rounded-lg">
                <Label>Overall Rating *</Label>
                <StarRating
                  rating={formData.overallRating}
                  onChange={(rating) =>
                    setFormData({ ...formData, overallRating: rating })
                  }
                  size="lg"
                />
              </div>

              {/* Detailed Ratings */}
              <div className="space-y-6">
                <RatingSlider
                  label="Taste"
                  value={formData.tasteRating}
                  onChange={(value) =>
                    setFormData({ ...formData, tasteRating: value })
                  }
                />
                <RatingSlider
                  label="Hygiene"
                  value={formData.hygieneRating}
                  onChange={(value) =>
                    setFormData({ ...formData, hygieneRating: value })
                  }
                />
                <RatingSlider
                  label="Quantity"
                  value={formData.quantityRating}
                  onChange={(value) =>
                    setFormData({ ...formData, quantityRating: value })
                  }
                />
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <Label htmlFor="reviewText">
                  Your Review{" "}
                  <span className="text-muted-foreground font-normal">
                    ({formData.reviewText.length}/500 characters)
                  </span>
                </Label>
                <Textarea
                  id="reviewText"
                  placeholder="Write your detailed review here..."
                  value={formData.reviewText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reviewText: e.target.value.slice(0, 500),
                    })
                  }
                  rows={4}
                />
              </div>

              {/* Recommend Checkbox */}
              <div className="flex items-center space-x-3 py-2">
                <Checkbox
                  id="isRecommended"
                  checked={formData.isRecommended}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isRecommended: checked as boolean })
                  }
                />
                <Label htmlFor="isRecommended" className="cursor-pointer">
                  I recommend this hostel's food to others
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Review
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddReview;