import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export default function ServiceCard({ name, slug, description, image }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200 group"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <span className="text-primary-600 font-semibold group-hover:underline">
          Learn More →
        </span>
      </div>
    </Link>
  );
}
