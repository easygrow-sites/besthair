import Image from 'next/image';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import LocationCard from '@/components/LocationCard';
import { getAllServices } from '@/lib/services';
import { getAllLocations } from '@/lib/locations';
import { getServiceImage } from '@/lib/images';

export default function HomePage() {
  const services = getAllServices();
  const locations = getAllLocations();
  const featuredLocations = locations.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920"
            alt="Professional hairdressing salon"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Gold Coast's Premier Hairdressing Salon
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Expert cuts, stunning colour, and flawless styling for every occasion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1300BESTHAIR"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition"
            >
              Call Now: 1300 BESTHAIR
            </a>
            <Link
              href="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">45+</div>
              <div className="text-gray-600">Service Areas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">5★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From everyday styles to special occasions, we offer a full range of professional hairdressing services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <ServiceCard
                key={service.slug}
                name={service.name}
                slug={service.slug}
                description={service.description}
                image={getServiceImage(service.slug, idx)}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BestHair?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">✂️</div>
              <h3 className="text-2xl font-bold mb-4">Expert Stylists</h3>
              <p className="text-gray-600">
                Our team of highly trained stylists stay current with the latest techniques and trends
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold mb-4">Premium Products</h3>
              <p className="text-gray-600">
                We use only the finest professional products to ensure stunning, long-lasting results
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold mb-4">Customer Focused</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We listen and deliver exactly what you envision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Serving Gold Coast</h2>
            <p className="text-xl text-gray-600">
              Professional hairdressing services across all Gold Coast suburbs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLocations.map((location) => (
              <LocationCard key={location.slug} name={location.name} slug={location.slug} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/locations"
              className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition"
            >
              View All Locations
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Best hairdresser I've been to on the Gold Coast! They really listened to what I wanted and the colour is absolutely perfect."
              </p>
              <p className="font-bold">Sarah M. - Surfers Paradise</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Professional service every time. My hair always looks amazing after visiting BestHair. Highly recommend!"
              </p>
              <p className="font-bold">Emma K. - Broadbeach</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "They did my bridal hair and it was absolutely stunning. Stayed perfect all day and looked amazing in photos!"
              </p>
              <p className="font-bold">Lisa T. - Burleigh Heads</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Your Best Hair Yet?</h2>
          <p className="text-xl mb-8">
            Book your appointment today and experience the BestHair difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1300BESTHAIR"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              Call Now
            </a>
            <Link
              href="/contact"
              className="bg-primary-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-800 transition"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
