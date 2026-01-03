import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllServices, getServiceBySlug, getAllServiceSlugs } from '@/lib/services';
import { getAllLocations } from '@/lib/locations';
import { getServiceImage } from '@/lib/images';
import ContactForm from '@/components/ContactForm';

interface ServicePageProps {
  params: { service: string };
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug: string) => ({ service: slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.service);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.name} Gold Coast | Professional Hair Services | BestHair`,
    description: `Expert ${service.name.toLowerCase()} services in Gold Coast. ${service.description} Book your appointment today!`,
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.service);
  if (!service) notFound();

  const allServices = getAllServices();
  const relatedServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);
  const locations = getAllLocations().slice(0, 12);

  // Service-specific content
  const serviceContent = getServiceContent(service.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={getServiceImage(service.slug, 0)}
            alt={service.name}
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{service.name} Gold Coast</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">{service.description}</p>
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
              Book Appointment
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
              <div className="prose max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional {service.name} Services</h2>
                <p className="text-lg text-gray-600 mb-6">{serviceContent.intro}</p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">What We Offer</h3>
                <p className="text-gray-600 mb-4">{serviceContent.whatWeOffer}</p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Why Choose BestHair for {service.name}?</h3>
                <ul className="space-y-3 mb-8">
                  {serviceContent.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">The Process</h3>
                <p className="text-gray-600 mb-4">{serviceContent.process}</p>
              </div>

              {/* FAQ */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {serviceContent.faqs.map((faq: { q: string; a: string }, idx: number) => (
                    <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Book Now</h3>
                <ContactForm />
              </div>

              {/* Service Areas */}
              <div className="bg-primary-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Service Areas</h3>
                <p className="text-gray-600 mb-4 text-sm">We provide {service.name.toLowerCase()} across Gold Coast:</p>
                <div className="space-y-2">
                  {locations.slice(0, 8).map((location) => (
                    <Link
                      key={location.slug}
                      href={`/${service.slug}-in-${location.slug}`}
                      className="block text-primary-600 hover:underline text-sm"
                    >
                      {service.name} in {location.name}
                    </Link>
                  ))}
                </div>
                <Link href="/locations" className="text-primary-600 font-semibold hover:underline text-sm mt-4 block">
                  View all locations →
                </Link>
              </div>

              {/* Quick Contact */}
              <div className="bg-gray-900 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Get Instant Quote</h3>
                <p className="mb-4 text-sm text-gray-300">Call us now for immediate assistance</p>
                <a
                  href="tel:1300BESTHAIR"
                  className="block bg-primary-600 text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-primary-700 transition"
                >
                  1300 BESTHAIR
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="bg-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService, idx) => (
                <Link
                  key={relatedService.slug}
                  href={`/services/${relatedService.slug}`}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                >
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={getServiceImage(relatedService.slug, idx)}
                      alt={relatedService.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{relatedService.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{relatedService.description}</p>
                  <span className="text-primary-600 font-semibold hover:underline">Learn More →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function getServiceContent(slug: string): {
  intro: string;
  whatWeOffer: string;
  benefits: string[];
  process: string;
  faqs: { q: string; a: string }[];
} {
  const contentMap: Record<string, any> = {
    'womens-haircuts': {
      intro: "At BestHair, we understand that your haircut is more than just a trim – it's a statement of your personal style and confidence. Our expert stylists specialize in women's haircuts that complement your face shape, hair texture, and lifestyle while keeping you on-trend with the latest styles.",
      whatWeOffer: "From classic bobs and long layers to modern pixie cuts and textured lobs, we offer a full range of cutting techniques. Whether you're looking for a dramatic transformation or just a refresh of your current style, our stylists will consult with you to create the perfect cut that enhances your natural beauty.",
      benefits: [
        "Expert consultation to determine the best style for your face shape and hair type",
        "Precision cutting techniques for clean, beautiful results",
        "Styling tips and product recommendations for at-home maintenance",
        "Complimentary blow-dry and styling with every cut",
        "Experienced stylists who stay current with the latest trends",
        "Premium professional scissors and tools for perfect results"
      ],
      process: "Every haircut begins with a thorough consultation where we discuss your hair goals, lifestyle, and maintenance preferences. We'll assess your hair texture, face shape, and natural growth patterns to recommend the best style for you. After shampooing with premium products, your stylist will skillfully cut your hair using advanced techniques, then finish with a professional blow-dry and style.",
      faqs: [
        { q: "How often should I get a haircut?", a: "For most styles, we recommend every 6-8 weeks to maintain shape and remove split ends. Shorter styles may need more frequent trims every 4-6 weeks." },
        { q: "Should I come with clean or dirty hair?", a: "Either is fine! We'll shampoo your hair as part of the service, but if you prefer, you can arrive with freshly washed hair." },
        { q: "Can you cut all hair types?", a: "Absolutely! Our stylists are trained in cutting straight, wavy, curly, and coily hair textures." },
        { q: "What if I'm not sure what style I want?", a: "That's what consultations are for! Bring inspiration photos if you have them, and we'll discuss options that will work for your hair type and lifestyle." },
        { q: "How long does a women's haircut take?", a: "Typically 45-60 minutes including consultation, cut, and styling." }
      ]
    },
    'mens-haircuts': {
      intro: "BestHair offers professional men's haircutting services that combine traditional barbering skills with modern styling techniques. Whether you prefer a classic businessman's cut, a trendy fade, or something edgy and contemporary, our experienced stylists deliver sharp, clean results every time.",
      whatWeOffer: "We specialize in all men's cutting styles including skin fades, taper fades, undercuts, buzz cuts, crew cuts, and scissor cuts. Our stylists are skilled in both clipper and scissor work, ensuring precision and attention to detail in every cut. We also offer beard trimming and styling services.",
      benefits: [
        "Expert clipper work and precision fades",
        "Skilled in traditional and modern cutting techniques",
        "Beard trimming and shaping available",
        "Quick, efficient service that respects your time",
        "Professional advice on styling and maintenance",
        "Complimentary neck shave and hot towel treatment"
      ],
      process: "Your appointment begins with a consultation about your desired style and any concerns. We'll discuss length, shape, and whether you want any special techniques like fades or texturing. After a clarifying shampoo, we'll cut your hair to perfection using a combination of scissors and clippers as needed, then style and finish with products suited to your hair type.",
      faqs: [
        { q: "How often should men get haircuts?", a: "Most men get haircuts every 3-4 weeks to maintain their style, especially for fades and shorter cuts. Longer styles can go 4-6 weeks between cuts." },
        { q: "Do you do skin fades?", a: "Yes! Our stylists are experienced in all types of fades including skin fades, low fades, mid fades, and high fades." },
        { q: "Can I get my beard trimmed too?", a: "Absolutely! We offer beard trimming and shaping services. Just let us know when you book." },
        { q: "How long does a men's haircut take?", a: "Typically 30-45 minutes depending on the style complexity." },
        { q: "Do I need to book in advance?", a: "We recommend booking to guarantee your preferred time, but we do accept walk-ins when available." }
      ]
    },
    'hair-colouring': {
      intro: "Transform your look with professional hair colouring services at BestHair. Our colour specialists use premium products and advanced techniques to deliver stunning, long-lasting results whether you're covering greys, making a bold change, or adding subtle dimension to your natural colour.",
      whatWeOffer: "We offer full colour services including all-over colour, root touch-ups, grey coverage, fashion colours, colour correction, and toner applications. Using premium L'Oréal and other professional colour lines, we can achieve any shade you desire while maintaining the health and integrity of your hair.",
      benefits: [
        "Premium professional colour products for vibrant, long-lasting results",
        "Customized colour formulation for your unique shade",
        "Expert colour matching and correction",
        "Gentle formulas that protect hair health",
        "Complimentary colour consultation and patch test",
        "Take-home colour care advice and product recommendations"
      ],
      process: "Colour services begin with a detailed consultation where we discuss your colour goals, assess your current colour and hair condition, and recommend the best approach. We'll perform a strand test if needed, then expertly apply your custom colour blend. After processing, we'll shampoo with colour-safe products and finish with a conditioning treatment and style.",
      faqs: [
        { q: "How long does hair colouring take?", a: "All-over colour typically takes 2-3 hours including application, processing, and styling. Root touch-ups take about 1.5-2 hours." },
        { q: "Will colouring damage my hair?", a: "We use premium products and proper techniques to minimize damage. We also include bond-building treatments when needed to protect hair integrity." },
        { q: "Can you match my natural colour?", a: "Yes! Our colorists are experts at matching natural shades for seamless grey coverage or root touch-ups." },
        { q: "How often should I colour my hair?", a: "For grey coverage, every 4-6 weeks. For fashion colours, every 6-8 weeks depending on fade and growth." },
        { q: "Do you do colour corrections?", a: "Yes! We specialize in correcting at-home colour mishaps and previous salon colour issues." }
      ]
    },
    'balayage-highlights': {
      intro: "Create beautiful, sun-kissed dimension with balayage and highlights at BestHair. Our highlighting specialists use hand-painted techniques and strategic foil placement to add depth, brightness, and movement to your hair for a natural, lived-in look that grows out beautifully.",
      whatWeOffer: "We offer balayage, traditional foil highlights, babylights, face-framing highlights, full and partial highlights, and lowlights. Whether you want subtle dimension or dramatic contrast, our colorists will customize your highlight placement and tones to complement your skin tone and base colour.",
      benefits: [
        "Hand-painted balayage for natural-looking dimension",
        "Strategic highlight placement for maximum impact",
        "Customized tones to complement your complexion",
        "Low-maintenance colour that grows out beautifully",
        "Expert blending and toning for seamless results",
        "Olaplex or bond-building treatments to protect hair"
      ],
      process: "Your highlighting service starts with a consultation to determine placement, tone, and technique. We'll apply highlights using foils, balayage painting, or a combination of methods. After processing, we'll rinse and apply a custom toner to perfect your shade. Finally, we'll deep condition and style your hair to showcase your beautiful new dimension.",
      faqs: [
        { q: "What's the difference between balayage and highlights?", a: "Balayage is hand-painted for a softer, more natural look, while foil highlights create more defined, uniform lightness. We can combine both techniques too!" },
        { q: "How long do highlights last?", a: "Balayage and highlights typically last 3-4 months before needing a refresh, making them very low-maintenance." },
        { q: "Will highlights damage my hair?", a: "We use bond-building treatments and take care to minimize damage, but some lightening does stress hair. We'll advise on the healthiest approach for your hair." },
        { q: "Can you highlight dark hair?", a: "Absolutely! We can lighten any base colour, though very dark hair may require multiple sessions for dramatic lifts." },
        { q: "How long does highlighting take?", a: "Full balayage or highlights typically take 3-4 hours including application, processing, toning, and styling." }
      ]
    },
    'hair-extensions': {
      intro: "Add instant length, volume, and versatility to your hair with professional hair extensions at BestHair. Our extension specialists offer multiple application methods and premium quality hair to seamlessly blend with your natural hair for stunning, natural-looking results.",
      whatWeOffer: "We provide tape-in extensions, keratin bonded extensions, micro-bead extensions, and clip-in extension fitting and styling. Using 100% human hair in various textures and colours, we can add the length and fullness you've always wanted while maintaining a natural appearance.",
      benefits: [
        "Premium 100% human hair extensions",
        "Multiple application methods to suit your needs",
        "Expert colour matching for seamless blending",
        "Customized placement for natural-looking volume and length",
        "Comprehensive care and maintenance guidance",
        "Reusable extensions with proper care (for tape-ins and some other methods)"
      ],
      process: "Extension services begin with a thorough consultation about your goals, lifestyle, and hair condition. We'll recommend the best method for your needs and show you hair samples for colour matching. During application, we'll strategically place extensions to create the most natural look. We'll finish by cutting and styling your new hair, and provide detailed care instructions.",
      faqs: [
        { q: "How long do hair extensions last?", a: "Tape-ins last 6-8 weeks between moves, keratin bonds last 3-4 months, and clip-ins can last over a year with proper care." },
        { q: "Will extensions damage my hair?", a: "When professionally applied and maintained, extensions shouldn't damage your hair. We assess hair health before application." },
        { q: "Can I style extensions with heat?", a: "Yes! Our human hair extensions can be heat styled, curled, and straightened just like your natural hair." },
        { q: "How much do extensions cost?", a: "Cost varies based on the method, amount of hair needed, and installation time. Contact us for a personalized quote." },
        { q: "Can you match my hair colour?", a: "Yes! We have a wide range of colours and can blend multiple shades for a perfect match." }
      ]
    },
    'bridal-hair': {
      intro: "Your wedding day deserves perfect hair. BestHair specializes in bridal hair styling, creating elegant updos, romantic waves, and stunning styles that photograph beautifully and last throughout your celebration. We'll work with you to create a look that complements your dress, theme, and personal style.",
      whatWeOffer: "We provide bridal consultations and trials, wedding day styling, bridesmaid hair, mother-of-the-bride styling, and on-location services. From classic chignons to bohemian braids to Hollywood glamour, we can create any bridal style you envision.",
      benefits: [
        "Complimentary bridal consultation and trial",
        "Expert styling that photographs beautifully",
        "Styles designed to last all day and night",
        "On-location services available",
        "Bridesmaid and wedding party hair packages",
        "Flexible scheduling for early morning weddings"
      ],
      process: "Your bridal hair journey begins with a consultation where we'll discuss your vision, wedding details, and dress style. We'll schedule a trial session to perfect your look and make any adjustments. On your wedding day, we'll recreate your chosen style, ensuring every detail is perfect. For on-location services, we'll arrive with all necessary tools and products.",
      faqs: [
        { q: "When should I book my bridal hair trial?", a: "We recommend booking 1-3 months before your wedding, and scheduling the trial 4-6 weeks prior to the big day." },
        { q: "Do you travel to wedding locations?", a: "Yes! We offer on-location services for weddings. Travel fees may apply depending on distance." },
        { q: "Can you style my bridesmaids' hair too?", a: "Absolutely! We offer bridesmaid and wedding party packages. Ask about group discounts." },
        { q: "What if I'm not sure what style I want?", a: "Bring inspiration photos to your consultation! We'll discuss what works for your hair type, face shape, and wedding style." },
        { q: "How long will my wedding hair last?", a: "With professional products and techniques, your style will last 12+ hours through ceremony, photos, and reception." }
      ]
    },
    'hair-treatments': {
      intro: "Restore, strengthen, and revitalize your hair with professional treatments at BestHair. Our deep conditioning treatments, keratin smoothing systems, and specialized therapies repair damage, enhance shine, and improve hair health for beautiful results that last.",
      whatWeOffer: "We offer Olaplex treatments, keratin smoothing treatments, deep conditioning masks, protein treatments, scalp treatments, and bond-building therapies. Each treatment is customized to address your specific hair concerns whether you're dealing with damage, dryness, frizz, or lack of shine.",
      benefits: [
        "Professional-strength treatments unavailable for home use",
        "Customized treatment plans for your hair's specific needs",
        "Visible improvement in hair health and appearance",
        "Long-lasting results (2-6 months depending on treatment)",
        "Expert application for maximum effectiveness",
        "Take-home care recommendations to maintain results"
      ],
      process: "Treatment services begin with a hair health analysis to determine which treatments will benefit you most. We'll cleanse your hair, then apply the treatment and allow it to process for optimal results. Depending on the treatment, we may use heat or steaming to enhance penetration. After rinsing and conditioning, we'll style your hair to showcase its improved condition.",
      faqs: [
        { q: "What is Olaplex and how does it work?", a: "Olaplex is a bond-building treatment that repairs broken bonds in damaged hair, making it stronger and healthier. It's perfect for colour-treated or chemically processed hair." },
        { q: "How long do hair treatments last?", a: "Deep conditioning lasts 2-4 weeks, Olaplex benefits last 6-8 weeks, and keratin smoothing lasts 3-6 months." },
        { q: "Are treatments necessary?", a: "Not necessary, but highly beneficial! Treatments repair damage, prevent future breakage, and keep hair looking its best." },
        { q: "Can treatments help with frizz?", a: "Yes! Keratin treatments and deep conditioning significantly reduce frizz and create smoother hair." },
        { q: "How often should I get treatments?", a: "For maintenance, every 4-6 weeks. For repair, we may recommend more frequent treatments initially." }
      ]
    },
    'blow-dry-styling': {
      intro: "Get salon-perfect hair for any occasion with professional blow-dry and styling services at BestHair. Whether you need a sleek, straight look, bouncy curls, or voluminous waves, our stylists will create a polished, long-lasting style using professional techniques and products.",
      whatWeOffer: "We provide wash and blow-dry, special occasion styling, bridal party blow-outs, curling and waving services, and straightening. Choose from various finishes including sleek and smooth, voluminous and bouncy, beachy waves, or formal updos and half-up styles.",
      benefits: [
        "Professional heat styling for long-lasting results",
        "Techniques that create volume and movement",
        "Heat protection to prevent damage",
        "Styles that last 2-3 days with proper care",
        "Premium styling products for shine and hold",
        "Quick service perfect for events and special occasions"
      ],
      process: "We'll start by shampooing and conditioning your hair with products suited to your hair type. After applying heat protectant and styling products, we'll blow-dry using professional techniques to create volume, smoothness, or texture as desired. Finally, we'll finish with curling or straightening irons if needed and lock in your style with appropriate finishing products.",
      faqs: [
        { q: "How long does a blow-dry take?", a: "Typically 45-60 minutes depending on hair length and thickness." },
        { q: "Will my blow-dry last?", a: "With proper care and the right products, your professional blow-dry should last 2-3 days. We'll give you tips for maintenance." },
        { q: "Can you do blow-drys for special events?", a: "Absolutely! We're experienced in special occasion styling for weddings, formals, and other events." },
        { q: "Do I need to bring my own products?", a: "No, we provide all professional products. However, we can use your products if you prefer." },
        { q: "Can you teach me to blow-dry my own hair?", a: "Yes! Ask your stylist for tips and techniques during your appointment." }
      ]
    },
    'perms-waves': {
      intro: "Add lasting curls, waves, and body to your hair with professional perm services at BestHair. Using modern perming techniques and formulas, we create natural-looking texture that's softer and more manageable than traditional perms, with results that last for months.",
      whatWeOffer: "We offer digital perms, beach wave perms, spiral perms, volumizing root perms, and body wave treatments. Whether you want tight curls, loose waves, or just added volume and texture, we'll customize the technique and rod size to achieve your desired look.",
      benefits: [
        "Modern, gentle perm formulas that protect hair health",
        "Customizable curl patterns from tight to loose",
        "Long-lasting results (3-6 months)",
        "Reduced daily styling time",
        "Added volume and body to fine or flat hair",
        "Expert rod placement for natural-looking texture"
      ],
      process: "Perming begins with a consultation to determine your desired curl pattern and assess your hair's condition. We'll shampoo your hair, then wrap it around rods of the appropriate size. After applying the perm solution and processing, we'll rinse, neutralize, and condition your hair thoroughly. The process takes 2-4 hours depending on hair length and the technique used.",
      faqs: [
        { q: "How long do perms last?", a: "Modern perms typically last 3-6 months before you need a refresh. The curl gradually loosens over time." },
        { q: "Will a perm damage my hair?", a: "Modern perm formulas are much gentler than old-school perms. We also use conditioning treatments to minimize damage." },
        { q: "Can I get a perm if I have colour-treated hair?", a: "Yes, but we'll assess your hair's condition first to ensure it's healthy enough. We may recommend treatments before perming." },
        { q: "How should I care for my perm?", a: "Use sulfate-free shampoos, deep condition weekly, and avoid heat styling when possible. We'll provide detailed care instructions." },
        { q: "Can you just add volume without tight curls?", a: "Absolutely! Body wave perms add volume and texture without creating defined curls." }
      ]
    },
    'hair-straightening': {
      intro: "Achieve smooth, sleek, frizz-free hair with professional straightening treatments at BestHair. Our keratin straightening and Japanese straightening services dramatically reduce frizz, eliminate curl, and create permanently straight hair that's soft, shiny, and manageable.",
      whatWeOffer: "We provide keratin straightening treatments (Brazilian blowouts), Japanese straightening, smoothing treatments, and frizz-control therapies. Depending on your hair type and goals, we'll recommend the best treatment to give you the smooth, straight hair you desire.",
      benefits: [
        "Dramatically reduced frizz and flyaways",
        "Permanently straight or significantly smoother hair",
        "Reduced styling time – air drying gives sleek results",
        "Long-lasting results (3-6 months)",
        "Enhanced shine and manageability",
        "Less damage from daily heat styling"
      ],
      process: "Hair straightening is a multi-step process that takes 3-5 hours depending on hair length and treatment type. We'll cleanse your hair, apply the straightening solution, and allow it to process. For Japanese straightening, we'll then flat iron the hair to set the treatment. After rinsing and neutralizing, we'll style your newly smooth hair and provide aftercare instructions.",
      faqs: [
        { q: "What's the difference between keratin and Japanese straightening?", a: "Keratin smoothing reduces frizz and loosens curl (3-6 months). Japanese straightening permanently straightens hair until it grows out." },
        { q: "Can I still curl my straightened hair?", a: "With keratin treatments, yes! With Japanese straightening, hair will be permanently straight until you cut it or it grows out." },
        { q: "How long do straightening treatments last?", a: "Keratin smoothing lasts 3-6 months. Japanese straightening is permanent on treated hair." },
        { q: "Will straightening damage my hair?", a: "When professionally done, damage is minimal. The reduction in daily heat styling often leads to healthier hair overall." },
        { q: "Can I colour my hair after straightening?", a: "Yes, but wait 2 weeks after keratin treatments. With Japanese straightening, colour should be done before the treatment." }
      ]
    },
    'kids-haircuts': {
      intro: "BestHair makes kids' haircuts fun, easy, and stress-free! Our patient, experienced stylists are skilled at working with children of all ages, creating age-appropriate styles that kids love and parents appreciate. We make the experience comfortable and enjoyable for even the most nervous first-timers.",
      whatWeOffer: "We provide haircuts for babies, toddlers, children, and teens in a welcoming, relaxed environment. Whether your child needs a simple trim, their first haircut, or a trendy style for school photos, our stylists are patient, gentle, and skilled at making kids feel comfortable.",
      benefits: [
        "Patient, kid-friendly stylists experienced with children",
        "Quick, efficient service to accommodate short attention spans",
        "Distraction techniques to keep kids calm and happy",
        "Age-appropriate style advice",
        "Certificate for first haircuts",
        "Relaxed, pressure-free environment"
      ],
      process: "Kids' haircuts are designed to be quick and comfortable. We'll seat your child in the styling chair (with a parent nearby if needed), discuss the desired style, and get to work. Our stylists are skilled at working efficiently while keeping kids engaged and comfortable. The whole process typically takes 20-30 minutes.",
      faqs: [
        { q: "At what age can you cut babies' hair?", a: "We can cut hair at any age! Some parents wait until age 1, others come sooner. We're experienced with all ages." },
        { q: "What if my child won't sit still?", a: "We're used to wiggly kids! We work quickly and use gentle distraction techniques. Parents can sit with younger children if needed." },
        { q: "Do you do trendy kids' styles?", a: "Yes! From mohawks to fades to cute bobs, we can create age-appropriate trendy styles." },
        { q: "How long does a kids' haircut take?", a: "Usually 20-30 minutes, sometimes less for very simple trims." },
        { q: "Should I book in advance for kids?", a: "We recommend booking to avoid wait times, but we welcome walk-ins when possible." }
      ]
    },
    'formal-hair-styling': {
      intro: "Look stunning at your special event with professional formal hair styling from BestHair. Whether you're attending a wedding, school formal, gala, or any special occasion, our stylists will create an elegant, long-lasting style that photographs beautifully and turns heads.",
      whatWeOffer: "We specialize in formal updos, half-up styles, Hollywood waves, braided styles, and special occasion blow-outs. We also offer makeup services to complete your look. Trials are available for important events like school formals and important occasions.",
      benefits: [
        "Professional styling that lasts throughout your event",
        "Styles designed to photograph beautifully",
        "Complementary consultation to plan your look",
        "Trials available for major events",
        "Expertise in all formal hair trends and classic styles",
        "Accessory placement and styling"
      ],
      process: "Formal styling appointments begin with a consultation about your event, dress, and style preferences. We'll discuss options and create a plan. On the day of your event, we'll shampoo, prep, and style your hair using professional techniques and long-hold products. The process takes 1-2 hours depending on style complexity. Trials can be scheduled in advance to perfect your look.",
      faqs: [
        { q: "Should I get a trial before my formal?", a: "For major events like school formals or important occasions, we highly recommend a trial 2-4 weeks before." },
        { q: "How long will my formal style last?", a: "With professional products and techniques, your style will last throughout your event – typically 8-12 hours." },
        { q: "Can you incorporate hair accessories?", a: "Absolutely! Bring any clips, flowers, or accessories you'd like included, and we'll work them into your style." },
        { q: "What if I'm not sure what style I want?", a: "Bring inspiration photos! We'll discuss what works for your hair type, face shape, and dress style." },
        { q: "Do you do makeup too?", a: "Yes! Ask about our hair and makeup packages for complete event preparation." }
      ]
    }
  };

  return contentMap[slug] || contentMap['womens-haircuts'];
}
