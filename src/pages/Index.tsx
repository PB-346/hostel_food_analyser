import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, Eye, Utensils } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-2xl mx-auto space-y-8 animate-fade-in">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Utensils className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Hostel Food Quality Analyzer
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
            Share and explore hostel food reviews from students across the country
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="gap-2 text-base px-8">
            <Link to="/add-review">
              <PlusCircle className="w-5 h-5" />
              Add Review
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 text-base px-8">
            <Link to="/reviews">
              <Eye className="w-5 h-5" />
              View Reviews
            </Link>
          </Button>
        </div>

        {/* Footer text */}
        <p className="text-sm text-muted-foreground pt-8">
          Help fellow students make informed choices about their hostel food!
        </p>
      </div>
    </div>
  );
};

export default Index;