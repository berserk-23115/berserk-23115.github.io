import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FlowGradient } from "@/components/flow-gradient";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Technical Writing | Anushk Kumar",
  description:
    "Engineering essays and technical deep-dives on CUDA parallel kernels, HPC LLM quantization, and zero-knowledge storage protocols.",
};

export default function BlogPage() {
  return (
    <div className="portfolio subpage-shell">
      <Navigation />

      <main className="subpage-main">
        {/* Header */}
        <header className="subpage-hero">
          <div className="subpage-hero-inner">
            <Link href="/" className="subpage-back-link">
              <ArrowLeft className="size-4" />
              <span>Back to home</span>
            </Link>

            <span className="eyebrow">WRITING // 13</span>
            <h1 className="subpage-title">
              Engineering Notes &amp; <br />
              <em>Systems Writing.</em>
            </h1>
            <p className="subpage-desc">
              Notes on GPU programming, CPU inference optimization, cryptography,
              and low-level software architecture.
            </p>
          </div>
        </header>

        {/* Blog Post List */}
        <section className="subpage-content-container" aria-label="Articles list">
          <div className="blog-posts-stack">
            {blogPosts.map((post, index) => (
              <article className="blog-card" key={post.slug}>
                <FlowGradient variant={index} className="blog-card-art" />
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-cat-tag">{post.category}</span>
                    <div className="blog-time-info">
                      <Calendar className="size-3.5" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <span className="meta-sep">·</span>
                      <Clock className="size-3.5" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>

                  <h2 className="blog-card-title">
                    <Link href={`/blog/${post.slug}`} className="blog-title-link">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="blog-card-desc">{post.description}</p>

                  <div className="blog-card-footer">
                    <div className="blog-tags-list">
                      {post.tags.map((tag) => (
                        <span className="blog-tag-pill" key={tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${post.slug}`} className="read-post-btn">
                      <span>Read Article</span>
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
