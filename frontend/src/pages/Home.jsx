import Hero from '../components/home/Hero';
import CategoryCarousel from '../components/home/CategoryCarousel';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';
import InstagramGallery from '../components/home/InstagramGallery';

function Home() {
  return (
    <>
      <Hero />
      <CategoryCarousel />
      <FeaturedProducts />
      <WhyChooseUs />
      <InstagramGallery />
    </>
  );
}

export default Home;
