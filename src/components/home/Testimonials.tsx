import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'EcoShop Direct',
    text: 'The quality of their custom boxes exceeded our expectations. Our products now arrive safely and look amazing!',
    image: 'https://placehold.co/100x100/1a202c/e2e8f0?text=SJ' // Placeholder image
  },
  {
    id: 2,
    name: 'Michael Chen',
    company: 'Tech Innovations',
    text: 'Their sustainable packaging solutions helped us reduce our carbon footprint while maintaining premium quality.',
    image: 'https://placehold.co/100x100/1a202c/e2e8f0?text=MC' // Placeholder image
  },
  {
    id: 3,
    name: 'Emma Davis',
    company: 'Artisan Foods',
    text: 'The food-grade packaging is perfect for our gourmet products. Customer service has been exceptional!',
    image: 'https://placehold.co/100x100/1a202c/e2e8f0?text=ED' // Placeholder image
  },
   {
    id: 4,
    name: 'David Lee',
    company: 'Creative Goods',
    text: 'Boxify made the design process so easy. The final product perfectly captures our brand.',
    image: 'https://placehold.co/100x100/1a202c/e2e8f0?text=DL' // Placeholder image
  },
   {
    id: 5,
    name: 'Olivia Wilson',
    company: 'Pet Supply Co.',
    text: 'Reliable delivery and sturdy boxes. Our pet products arrive in perfect condition every time.',
    image: 'https://placehold.co/100x100/1a202c/e2e8f0?text=OW' // Placeholder image
  }
];

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the element is visible
    triggerOnce: true // Only trigger the animation once
  });

  // Variants for the section header animation
  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Variants for individual testimonial card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="py-20 bg-gray-950 text-gray-100"> {/* Updated background and text color */}
      <div className="container mx-auto px-6"> {/* Adjusted padding */}
        <motion.div
          ref={ref} // Attach ref to the header for inView animation
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"} // Animate based on inView status
          className="text-center max-w-4xl mx-auto mb-16" // Increased max-width
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-teal-400"> {/* Updated color and font weight */}
            What Our Clients Say
          </h2>
          <p className="text-gray-300 text-lg"> {/* Updated text color */}
            Don't just take our word for it. Here's what our valued customers have to say about our packaging solutions.
          </p>
        </motion.div>

        {/* Swiper Carousel */}
        <div className="relative"> {/* Added relative positioning for pagination */}
           <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 4000, // Slightly reduced delay
              disableOnInteraction: false,
              pauseOnMouseEnter: true, // Pause autoplay on hover
            }}
            pagination={{
              clickable: true,
              // Custom class for pagination bullets to style them with Tailwind
              bulletClass: 'swiper-pagination-bullet !bg-gray-700 !w-3 !h-3 !mx-1 transition-colors duration-300',
              bulletActiveClass: '!bg-teal-500', // Active bullet color
            }}
            className="pb-12" // Added padding bottom for pagination dots
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                {/* Testimonial Card */}
                <motion.div
                  variants={cardVariants} // Apply animation variants to the card
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"} // Animate based on inView status
                  whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }} // Enhanced hover effect
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 backdrop-blur-sm p-8 rounded-2xl h-[300px] flex flex-col justify-between border border-gray-700" // <-- Changed h-full to a fixed height h-[380px]
                >
                  <Quote className="w-12 h-12 text-teal-500 mb-6 flex-shrink-0" /> {/* Updated color and size */}
                  <p className="text-gray-300 mb-6 flex-grow overflow-hidden text-ellipsis">{testimonial.text}</p> {/* Added overflow handling */}
                  <div className="flex items-center mt-auto"> {/* Use mt-auto to push to bottom */}
                    {/* Testimonial Author Image */}
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-teal-500 flex-shrink-0" // Updated size and added border
                    />
                    {/* Author Name and Company */}
                    <div>
                      <h4 className="font-semibold text-gray-100">{testimonial.name}</h4> {/* Updated color */}
                      <p className="text-teal-400 text-sm">{testimonial.company}</p> {/* Updated color */}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
