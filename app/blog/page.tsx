import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { getAllBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Hair Care Tips & Advice Blog | BestHair Gold Coast',
  description: 'Expert hair care advice, styling tips, and industry insights from BestHair professional stylists. Your guide to beautiful, healthy hair.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Hair Care Blog</h1>
          <p className="text-xl">
            Expert tips, trends, and advice from Gold Coast's leading hairdressing professionals
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog Coming Soon</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                We're working on bringing you expert hair care advice and styling tips. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Popular Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">✂️</div>
              <h3 className="font-bold">Haircut Trends</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="font-bold">Color Tips</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">💆</div>
              <h3 className="font-bold">Hair Care</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="font-bold">Styling How-Tos</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
