import { Metadata } from 'next';
import ServiceCard from '@/components/ServiceCard';
import { getAllServices } from '@/lib/services';
import { getServiceImage } from '@/lib/images';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Services | Professional Hairdressing Gold Coast | BestHair',
  description: 'Complete range of hairdressing services: cuts, colour, balayage, extensions, treatments, bridal hair & more. Expert stylists, premium products.',
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl">
            Professional hairdressing services for every style, occasion, and budget
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From everyday maintenance to special occasion styling, we've got you covered
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
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose BestHair?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">👩‍🎨</div>
              <h3 className="font-bold text-lg mb-2">Expert Stylists</h3>
              <p className="text-gray-600 text-sm">Highly trained professionals with years of experience</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="font-bold text-lg mb-2">Premium Products</h3>
              <p className="text-gray-600 text-sm">L'Oréal, Kerastase, and other professional brands</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-bold text-lg mb-2">Latest Techniques</h3>
              <p className="text-gray-600 text-sm">Stay current with the newest trends and methods</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">💯</div>
              <h3 className="font-bold text-lg mb-2">Satisfaction Guarantee</h3>
              <p className="text-gray-600 text-sm">We're not happy until you're thrilled with your hair</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Look?</h2>
          <p className="text-xl mb-8">
            Book your appointment today and experience professional hairdressing at its finest
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1300BESTHAIR"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              Call 1300 BESTHAIR
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
