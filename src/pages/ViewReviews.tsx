import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReviewCard } from "@/components/ReviewCard";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Search, PlusCircle, Loader2 } from "lucide-react";

interface Review {
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
}

const ViewReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter((review) =>
    review.hostel_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">All Reviews</h1>
              <p className="text-muted-foreground mt-1">
                {reviews.length} reviews from students
              </p>
            </div>
            <Button asChild className="gap-2">
              <Link to="/add-review">
                <PlusCircle className="w-4 h-4" />
                Add Review
              </Link>
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by hostel name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              {searchQuery
                ? "No reviews found matching your search."
                : "No reviews yet. Be the first to add one!"}
            </p>
            {!searchQuery && (
              <Button asChild className="mt-4 gap-2">
                <Link to="/add-review">
                  <PlusCircle className="w-4 h-4" />
                  Add First Review
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReviews;