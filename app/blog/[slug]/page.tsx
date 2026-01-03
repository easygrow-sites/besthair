import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogSlugs, getAllBlogPosts } from '@/lib/blog';
import { markdownToHtml } from '@/lib/markdown';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | BestHair Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords?.join(', '),
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const contentHtml = markdownToHtml(post.content);

  return (
    <>
      {/* Hero */}
      <article className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-600 text-sm">
              <span>{post.author}</span>
              <span className="mx-3">•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-AU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          {/* Post Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-100 rounded-lg">
            <h3 className="font-bold text-lg mb-2">About the Author</h3>
            <p className="text-gray-600">
              <strong>{post.author}</strong> is a professional hairdressing expert at BestHair Gold Coast,
              specializing in cuts, colour, and styling. With years of experience, they share their expertise
              to help you achieve your best hair.
            </p>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  {relatedPost.featuredImage && (
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{relatedPost.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{relatedPost.excerpt}</p>
                    <span className="text-primary-600 font-semibold hover:underline">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Hair?</h2>
          <p className="text-xl mb-8">
            Book your appointment with BestHair today
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
              Book Online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
