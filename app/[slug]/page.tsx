import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllServices, getServiceBySlug } from '@/lib/services';
import { getAllLocations, getLocationBySlug } from '@/lib/locations';
import { getServiceImage } from '@/lib/images';
import ContactForm from '@/components/ContactForm';

interface ServiceLocationPageProps {
  params: { slug: string };
}

function parseSlug(slug: string): { serviceSlug: string; locationSlug: string } | null {
  const parts = slug.split('-in-');
  if (parts.length !== 2) return null;
  return { serviceSlug: parts[0], locationSlug: parts[1] };
}

export async function generateStaticParams() {
  const services = getAllServices();
  const locations = getAllLocations();
  const params = [];

  for (const service of services) {
    for (const location of locations) {
      params.push({ slug: `${service.slug}-in-${location.slug}` });
    }
  }

  return params;
}

export async function generateMetadata({ params }: ServiceLocationPageProps): Promise<Metadata> {
  const parsed = parseSlug(params.slug);
  if (!parsed) return { title: 'Page Not Found' };

  const service = getServiceBySlug(parsed.serviceSlug);
  const location = getLocationBySlug(parsed.locationSlug);

  if (!service || !location) return { title: 'Page Not Found' };

  return {
    title: `${service.name} in ${location.name} | BestHair Gold Coast | Book Today`,
    description: `Professional ${service.name.toLowerCase()} services in ${location.name}, Gold Coast. Expert stylists, premium products, satisfaction guaranteed. Call 1300 BESTHAIR now!`,
  };
}

export default function ServiceLocationPage({ params }: ServiceLocationPageProps) {
  const parsed = parseSlug(params.slug);
  if (!parsed) notFound();

  const service = getServiceBySlug(parsed.serviceSlug);
  const location = getLocationBySlug(parsed.locationSlug);

  if (!service || !location) notFound();

  const allServices = getAllServices();
  const relatedServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);
  const nearbyLocations = getAllLocations()
    .filter((l) => l.slug !== location.slug)
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={getServiceImage(service.slug, 0)}
            alt={`${service.name} in ${location.name}`}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {service.name} in {location.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Professional {service.name.toLowerCase()} services serving {location.name} and surrounding Gold Coast areas. Fast response, expert results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:1300BESTHAIR"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition text-center"
            >
              Call Now: 1300 BESTHAIR
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

      {/* Trust Signals */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-gray-600 text-sm">Years Serving {location.name}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">Same Day</div>
              <div className="text-gray-600 text-sm">Appointments Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600 text-sm">Satisfaction Guaranteed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">5★</div>
              <div className="text-gray-600 text-sm">Rated Service</div>
            </div>
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
                Expert {service.name} in {location.name}, Gold Coast
              </h2>

              <div className="prose max-w-none text-gray-600">
                <p className="text-lg mb-4">
                  When you need professional {service.name.toLowerCase()} in {location.name}, BestHair is your trusted local expert. We've been proudly serving {location.name} residents and the wider Gold Coast community for over 15 years, building a reputation for excellence, reliability, and outstanding customer service.
                </p>

                <p className="mb-4">
                  Our experienced stylists understand the unique needs of {location.name} clients. Whether you're preparing for a special occasion, maintaining your regular style, or trying something completely new, we have the expertise and premium products to deliver exceptional results that exceed your expectations.
                </p>

                <p className="mb-6">
                  What sets BestHair apart as the leading {service.name.toLowerCase()} provider in {location.name}? It's our combination of highly trained professionals, state-of-the-art techniques, premium products, and genuine commitment to customer satisfaction. We don't just style hair – we build lasting relationships with our clients based on trust and consistently excellent results.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  Why {location.name} Residents Choose BestHair
                </h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Local Expertise:</strong> We know {location.name} and understand how Gold Coast's climate affects your hair</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Experienced Professionals:</strong> Our stylists have 10+ years experience in {service.name.toLowerCase()}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Premium Products:</strong> We use only the finest professional brands for superior results</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Convenient Appointments:</strong> Flexible scheduling including evenings and Saturdays</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Satisfaction Guaranteed:</strong> We're not happy until you love your hair</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  Our {service.name} Process in {location.name}
                </h3>
                <p className="mb-4">
                  When you choose BestHair for {service.name.toLowerCase()} in {location.name}, you're choosing a proven process that delivers consistently excellent results:
                </p>
                <ol className="space-y-3 mb-8 list-decimal list-inside">
                  <li className="text-gray-700"><strong>Consultation:</strong> We start by understanding your goals, preferences, and any concerns</li>
                  <li className="text-gray-700"><strong>Expert Assessment:</strong> Our stylists evaluate your hair type, condition, and what will work best</li>
                  <li className="text-gray-700"><strong>Professional Service:</strong> Using premium products and advanced techniques, we deliver your service</li>
                  <li className="text-gray-700"><strong>Styling & Finishing:</strong> We complete your look with professional styling</li>
                  <li className="text-gray-700"><strong>Care Advice:</strong> We provide personalized tips for maintaining your gorgeous new look</li>
                </ol>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  Serving {location.name} & Surrounding Areas
                </h3>
                <p className="mb-4">
                  While we're proud to be a top choice for {service.name.toLowerCase()} in {location.name}, our service extends throughout the Gold Coast region. Whether you're in {location.name} or a nearby suburb, you'll receive the same exceptional service, expertise, and results that have made BestHair the trusted name in Gold Coast hairdressing.
                </p>
              </div>

              {/* Testimonial */}
              <div className="bg-primary-50 p-8 rounded-lg mt-12">
                <div className="flex text-yellow-400 mb-4">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="text-2xl">{star}</span>
                  ))}
                </div>
                <p className="text-lg text-gray-700 mb-4 italic">
                  "I've been getting my {service.name.toLowerCase()} done at BestHair for years and I wouldn't go anywhere else. The team is professional, friendly, and always delivers amazing results. Highly recommend to anyone in {location.name}!"
                </p>
                <p className="font-bold text-gray-900">- Satisfied Client, {location.name}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-primary-200 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Book {service.name} in {location.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">Fast response. Expert service. Guaranteed satisfaction.</p>
                <ContactForm />
              </div>

              {/* Quick Call */}
              <div className="bg-primary-600 text-white p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-2">Need Immediate Assistance?</h3>
                <p className="mb-4 text-sm">Call us now for same-day appointments</p>
                <a
                  href="tel:1300BESTHAIR"
                  className="block bg-white text-primary-600 px-6 py-3 rounded-lg font-bold text-center hover:bg-gray-100 transition text-lg"
                >
                  1300 BESTHAIR
                </a>
                <p className="text-xs mt-3 text-center text-primary-100">Available Mon-Sat</p>
              </div>

              {/* Service Info */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Service Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <strong>Location:</strong><br />
                      Serving {location.name} & all Gold Coast
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong>Response Time:</strong><br />
                      Same day appointments available
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong>Guarantee:</strong><br />
                      100% satisfaction or we'll make it right
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Services */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">More Services in {location.name}</h3>
                <div className="space-y-2">
                  {relatedServices.map((relatedService) => (
                    <Link
                      key={relatedService.slug}
                      href={`/${relatedService.slug}-in-${location.slug}`}
                      className="block text-primary-600 hover:underline text-sm py-1"
                    >
                      {relatedService.name} in {location.name}
                    </Link>
                  ))}
                </div>
                <Link href="/services" className="text-primary-600 font-semibold hover:underline text-sm mt-4 block">
                  View all services →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Common Questions About {service.name} in {location.name}
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">Do you provide {service.name.toLowerCase()} to {location.name}?</h3>
              <p className="text-gray-600">
                Yes! BestHair proudly serves {location.name} and all surrounding Gold Coast suburbs with professional {service.name.toLowerCase()} services. We have over 15 years of experience serving the {location.name} community.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">How quickly can you book an appointment?</h3>
              <p className="text-gray-600">
                We offer same-day appointments when available, and typically can book you within 24-48 hours. Call us now on 1300 BESTHAIR for the fastest service.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">What makes BestHair different from other {location.name} hairdressers?</h3>
              <p className="text-gray-600">
                Our combination of experienced professionals, premium products, personalized service, and 100% satisfaction guarantee sets us apart. We've built our reputation on consistently excellent results and outstanding customer care.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">Are your stylists qualified and experienced?</h3>
              <p className="text-gray-600">
                Absolutely! All our stylists hold professional certifications and have extensive experience. Our team regularly undergoes training to stay current with the latest techniques and trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Locations */}
      {nearbyLocations.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              {service.name} in Nearby Areas
            </h2>
            <p className="text-gray-600 mb-12 text-center">
              We also provide {service.name.toLowerCase()} to these Gold Coast locations
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {nearbyLocations.map((nearbyLoc) => (
                <Link
                  key={nearbyLoc.slug}
                  href={`/${service.slug}-in-${nearbyLoc.slug}`}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition text-center border border-gray-200"
                >
                  <p className="font-semibold text-gray-900 text-sm">{nearbyLoc.name}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/locations" className="text-primary-600 font-semibold hover:underline">
                View All Locations →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Book {service.name} in {location.name}?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied clients across Gold Coast. Call now or book online.
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
              className="bg-primary-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-800 transition border-2 border-white"
            >
              Book Online Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
