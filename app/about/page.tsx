import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About BestHair | Award-Winning Hairdressers Gold Coast',
  description: 'Meet the BestHair team. Over 15 years serving Gold Coast with expert hairdressing, cutting-edge techniques, and exceptional customer service.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1920"
            alt="BestHair salon team"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About BestHair</h1>
          <p className="text-xl md:text-2xl">Gold Coast's trusted hairdressing experts since 2008</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              BestHair was founded with a simple mission: to provide Gold Coast residents with world-class
              hairdressing services in a welcoming, professional environment. What started as a small salon in
              Surfers Paradise has grown into the region's most trusted name in hair care.
            </p>
            <p className="mb-6">
              For over 15 years, we've been perfecting our craft, staying ahead of trends, and investing in
              ongoing education to ensure our team delivers nothing but the best. Our stylists are not just
              technicians – they're artists who are passionate about making you look and feel incredible.
            </p>
            <p>
              Today, we're proud to serve clients across the entire Gold Coast region, from Coolangatta to
              Coomera and everywhere in between. Our reputation for excellence is built on thousands of
              satisfied clients who trust us with their most important hair moments.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4 text-center">💯</div>
              <h3 className="text-2xl font-bold mb-4 text-center">Excellence</h3>
              <p className="text-gray-600 text-center">
                We strive for perfection in every cut, colour, and style. Your satisfaction is our standard.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4 text-center">🤝</div>
              <h3 className="text-2xl font-bold mb-4 text-center">Integrity</h3>
              <p className="text-gray-600 text-center">
                Honest advice, transparent pricing, and genuine care for every client who walks through our door.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4 text-center">🎓</div>
              <h3 className="text-2xl font-bold mb-4 text-center">Education</h3>
              <p className="text-gray-600 text-center">
                Continuous learning keeps us at the forefront of techniques, trends, and innovations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Meet Our Team</h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Our talented stylists bring years of experience and a passion for creating beautiful hair
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Mitchell', role: 'Senior Stylist & Colourist', exp: '12 years' },
              { name: 'James Chen', role: 'Master Cutter', exp: '10 years' },
              { name: 'Emma Thompson', role: 'Bridal Specialist', exp: '8 years' },
              { name: 'Olivia Brown', role: 'Extension Expert', exp: '7 years' },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 bg-gradient-to-br from-primary-300 to-primary-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.exp} experience</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Qualifications & Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="font-bold mb-2">Certified Professionals</h4>
              <p className="text-gray-600 text-sm">All stylists hold Certificate III & IV in Hairdressing</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">💎</div>
              <h4 className="font-bold mb-2">L'Oréal Trained</h4>
              <p className="text-gray-600 text-sm">Advanced colour training with industry leaders</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">✨</div>
              <h4 className="font-bold mb-2">Kerastase Certified</h4>
              <p className="text-gray-600 text-sm">Expert in premium treatment systems</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">🎨</div>
              <h4 className="font-bold mb-2">Ongoing Education</h4>
              <p className="text-gray-600 text-sm">Regular training in latest trends and techniques</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Experience the BestHair Difference</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied clients across Gold Coast
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
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
