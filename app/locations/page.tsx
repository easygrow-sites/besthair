import { Metadata } from 'next';
import LocationCard from '@/components/LocationCard';
import { getAllLocations } from '@/lib/locations';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Service Areas | Professional Hairdresser Across Gold Coast | BestHair',
  description: 'BestHair serves all Gold Coast suburbs from Coolangatta to Coomera. Find professional hairdressing services in your area.',
};

export default function LocationsPage() {
  const locations = getAllLocations();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Service Areas</h1>
          <p className="text-xl">
            Professional hairdressing services across all Gold Coast suburbs
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600">
            From Coolangatta in the south to Coomera in the north, BestHair proudly serves the entire Gold Coast region with expert hairdressing services. Click on your suburb below to learn more about our services in your area.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Service Areas</h2>
            <p className="text-lg text-gray-600">
              {locations.length} locations and counting
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <LocationCard key={location.slug} name={location.name} slug={location.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Promise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Gold Coast Trusts BestHair</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🚗</div>
              <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
              <p className="text-gray-600">
                We understand Gold Coast style and lifestyle, delivering looks that suit our subtropical climate
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-3">Flexible Appointments</h3>
              <p className="text-gray-600">
                Convenient booking times to fit your schedule, including evenings and Saturdays
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💕</div>
              <h3 className="text-xl font-bold mb-3">Community Focused</h3>
              <p className="text-gray-600">
                Proudly serving Gold Coast families and businesses for over 15 years
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Find BestHair In Your Suburb</h2>
          <p className="text-xl mb-8">
            Professional hairdressing services available throughout Gold Coast
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
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
