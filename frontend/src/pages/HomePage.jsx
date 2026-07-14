import React from 'react';
import HeroSection from '../sections/HeroSection';
import BrandStorySection from '../sections/BrandStorySection';
import IngredientOrbitSection from '../sections/IngredientOrbitSection';
import FragranceJourneySection from '../sections/FragranceJourneySection';
import ProductCollectionSection from '../sections/ProductCollectionSection';
import FeaturedStorySection from '../sections/FeaturedStorySection';
import PhilosophySection from '../sections/PhilosophySection';
import ScentFinderSection from '../sections/ScentFinderSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import NewsletterSection from '../sections/NewsletterSection';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <BrandStorySection />
      <IngredientOrbitSection />
      <FragranceJourneySection />
      <ProductCollectionSection />
      <FeaturedStorySection />
      <PhilosophySection />
      <ScentFinderSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
