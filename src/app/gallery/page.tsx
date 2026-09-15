import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { galleryConfig, galleryPhotos } from "@/data/gallery";
import { ArrowLeft, Camera, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery | Anushk Kumar",
  description: "Visual log, photography, and architectural frames by Anushk Kumar.",
};

export default function GalleryPage() {
  const isEnabled = galleryConfig.enabled && galleryPhotos.length > 0;

  return (
    <div className="portfolio subpage-shell">
      <Navigation />

      <main className="subpage-main">
        <header className="subpage-hero">
          <div className="subpage-hero-inner">
            <Link href="/" className="subpage-back-link">
              <ArrowLeft className="size-4" />
              <span>Back to home</span>
            </Link>

            <span className="eyebrow">VISUAL LOG // 20</span>
            <h1 className="subpage-title">{galleryConfig.title}</h1>
            <p className="subpage-desc">{galleryConfig.subtitle}</p>
          </div>
        </header>

        <section className="subpage-content-container">
          {!isEnabled ? (
            <div className="gallery-upcoming-state">
              <div className="upcoming-icon-frame">
                <Camera className="size-8 text-sky-400" />
              </div>
              <h2>Visual Log Upcoming</h2>
              <p>
                A curated collection of medium-format street and architectural photography
                is currently being curated and will be published here soon.
              </p>
              <div className="upcoming-badge">
                <Sparkles className="size-3.5" />
                <span>Feature-gated until curation release</span>
              </div>
            </div>
          ) : (
            <div className="gallery-masonry-grid">
              {galleryPhotos.map((photo) => (
                <figure key={photo.id} className="gallery-item">
                  {/* Future images will render here */}
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
