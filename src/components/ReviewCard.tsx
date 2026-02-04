import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { MapPin, Utensils, ThumbsUp, Clock } from "lucide-react";
import { format } from "date-fns";

interface ReviewCardProps {
  review: {
    id: string;
    reviewer_name: string;
    hostel_name: string;
    hostel_type: string;
    city: string | null;
    meal_type: string;
    dish_name: string | null;
    overall_rating: number;
    taste_rating: number;
    hygiene_rating: number;
    quantity_rating: number;
    review_text: string | null;
    is_recommended: boolean;
    created_at: string;
  };
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card className="card-shadow hover:card-shadow-hover transition-shadow duration-300 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-foreground">
              {review.hostel_name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {review.city && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {review.city}
                </span>
              )}
              <Badge variant="secondary" className="text-xs">
                {review.hostel_type}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <StarRating rating={review.overall_rating} readonly size="sm" />
            {review.is_recommended && (
              <Badge className="bg-success text-success-foreground text-xs">
                <ThumbsUp className="w-3 h-3 mr-1" />
                Recommended
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {review.dish_name && (
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-primary" />
            <span className="font-medium">{review.dish_name}</span>
            <Badge variant="outline" className="text-xs">
              {review.meal_type}
            </Badge>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 py-2">
          <div className="text-center p-2 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground">Taste</p>
            <p className="font-semibold text-foreground">{review.taste_rating}/5</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground">Hygiene</p>
            <p className="font-semibold text-foreground">{review.hygiene_rating}/5</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground">Quantity</p>
            <p className="font-semibold text-foreground">{review.quantity_rating}/5</p>
          </div>
        </div>

        {review.review_text && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            "{review.review_text}"
          </p>
        )}

        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-sm font-medium text-foreground">
            — {review.reviewer_name}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {format(new Date(review.created_at), "MMM d, yyyy")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};