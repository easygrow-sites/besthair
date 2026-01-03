import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllLocations, getLocationBySlug, getAllLocationSlugs } from '@/lib/locations';
import { getAllServices } from '@/lib/services';
import { getServiceImage } from '@/lib/images';
import ContactForm from '@/components/ContactForm';

interface LocationPageProps {
  params: { location: string };
}

export async function generateStaticParams() {
  const slugs = getAllLocationSlugs();
  return slugs.map((slug: string) => ({ location: slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = getLocationBySlug(params.location);
  if (!location) return { title: 'Location Not Found' };

  return {
    title: `Hairdresser ${location.name} | Professional Hair Services | BestHair`,
    description: `Professional hairdressing services in ${location.name}, Gold Coast. Expert cuts, colour, styling & more. Call BestHair today for your appointment!`,
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const location = getLocationBySlug(params.location);
  if (!location) notFound();

  const services = getAllServices();
  const nearbyLocations = getAllLocations()
    .filter((l) => l.slug !== location.slug)
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920"
            alt={`Hairdresser in ${location.name}`}
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Hairdresser {location.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Professional hairdressing services in {location.name}, Gold Coast. Expert cuts, colour, and styling for the whole family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:1300BESTHAIR"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition text-center"
            >
              Call 1300 BESTHAIR
            </a>
            <Link
              href="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition text-center"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Your Trusted Hairdresser in {location.name}
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  Looking for a professional hairdresser in {location.name}? BestHair is proud to serve the {location.name} community with expert hairdressing services that keep you looking and feeling your best. Whether you're a long-time resident or new to the area, we're your go-to salon for all your hair care needs.
                </p>
                <p className="mb-4">
                  Our experienced stylists understand the unique lifestyle and climate of {location.name} and the Gold Coast region. We know that your hair needs to look great while standing up to Queensland's sunshine, humidity, and beach lifestyle. That's why we use premium products and techniques specifically chosen to work in our local conditions.
                </p>
                <p className="mb-4">
                  From everyday cuts and colours to special occasion styling, BestHair has been the trusted choice for {location.name} residents for over 15 years. We combine technical expertise with genuine care for our clients, ensuring you leave our salon confident and satisfied every single time.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  Why {location.name} Residents Choose BestHair
                </h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Local expertise – we understand {location.name} style and lifestyle</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Experienced stylists with 10+ years serving Gold Coast</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Premium products suited to Queensland's climate</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Flexible appointment times to suit your schedule</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Satisfaction guaranteed on every service</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  Serving {location.name} & Surrounding Areas
                </h3>
                <p className="mb-4">
                  While we're proud to serve {location.name}, our reputation extends throughout the Gold Coast region. Clients from nearby suburbs regularly visit us for our expertise, friendly service, and consistently excellent results. Whether you're coming from {location.name} or a neighboring area, you'll find the journey worthwhile.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Book Your Appointment</h3>
                <p className="text-gray-600 mb-4 text-sm">Serving {location.name} and all Gold Coast areas</p>
                <ContactForm />
              </div>

              {/* Quick Contact */}
              <div className="bg-primary-600 text-white p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4">Call Us Now</h3>
                <p className="mb-4 text-sm">Speak to our friendly team</p>
                <a
                  href="tel:1300BESTHAIR"
                  className="block bg-white text-primary-600 px-6 py-3 rounded-lg font-bold text-center hover:bg-gray-100 transition"
                >
                  1300 BESTHAIR
                </a>
              </div>

              {/* Opening Hours */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Opening Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tuesday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wednesday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thursday</span>
                    <span className="font-semibold">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold text-red-600">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services in Location */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Our Services in {location.name}
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            All our professional hairdressing services are available to {location.name} residents
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/${service.slug}-in-${location.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition group"
              >
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={getServiceImage(service.slug, idx)}
                    alt={`${service.name} in ${location.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                <span className="text-primary-600 font-semibold group-hover:underline">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Locations */}
      {nearbyLocations.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              We Also Serve Nearby Areas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {nearbyLocations.map((nearbyLoc) => (
                <Link
                  key={nearbyLoc.slug}
                  href={`/locations/${nearbyLoc.slug}`}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition text-center"
                >
                  <p className="font-semibold text-gray-900">{nearbyLoc.name}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/locations" className="text-primary-600 font-semibold hover:underline">
                View All Service Areas →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      <section className="bg-primary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex text-yellow-400 mb-4 justify-center">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i} className="text-2xl">{star}</span>
              ))}
            </div>
            <p className="text-xl text-gray-600 mb-6 text-center italic">
              "I've been going to BestHair for years and I wouldn't trust anyone else with my hair. The stylists really know what they're doing and always make me feel welcome. Highly recommend to anyone in {location.name}!"
            </p>
            <p className="font-bold text-center text-gray-900">- Happy Client from {location.name}</p>
          </div>
        </div>
      </section>
    </>
  );
}
