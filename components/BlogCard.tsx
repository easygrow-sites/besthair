import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden border border-gray-200 group">
      <div className="relative h-48 overflow-hidden">
        {post.featuredImage ? (
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary-400 to-primary-600"></div>
        )}
      </div>
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <span className="text-primary-600 font-semibold group-hover:underline">Read More →</span>
      </div>
    </Link>
  );
}
