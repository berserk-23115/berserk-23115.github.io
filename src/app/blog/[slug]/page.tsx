import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Anushk Kumar`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="portfolio subpage-shell">
      <Navigation />

      <main className="subpage-main blog-post-layout">
        <header className="blog-post-header">
          <div className="subpage-hero-inner">
            <Link href="/blog" className="subpage-back-link">
              <ArrowLeft className="size-4" />
              <span>Back to all writing</span>
            </Link>

            <div className="blog-header-meta">
              <span className="eyebrow">{post.category}</span>
              <div className="blog-header-dates">
                <Calendar className="size-3.5" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span className="meta-sep">·</span>
                <Clock className="size-3.5" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            <h1 className="blog-post-title">{post.title}</h1>
            <p className="blog-post-subtitle">{post.description}</p>

            <div className="blog-tags-row">
              {post.tags.map((tag) => (
                <span className="blog-tag-pill" key={tag}>
                  <Tag className="size-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Article Body Content */}
        <article className="blog-article-content">
          <div className="article-body-inner">
            {post.content.split("\n\n").map((block, i) => {
              const trimmed = block.trim();
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={i} className="article-h3">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("```")) {
                const lines = trimmed.split("\n");
                const code = lines.slice(1, -1).join("\n");
                return (
                  <pre key={i} className="article-code-block">
                    <code>{code}</code>
                  </pre>
                );
              }
              if (trimmed.startsWith("1. ") || trimmed.startsWith("- ")) {
                const items = trimmed.split("\n");
                return (
                  <ul key={i} className="article-list">
                    {items.map((item, j) => (
                      <li key={j}>
                        {item.replace(/^(\d+\. |- )/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="article-paragraph">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
