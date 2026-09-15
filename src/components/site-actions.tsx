"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@astryxdesign/core/Button";
import { CommandPalette } from "@astryxdesign/core/CommandPalette";
import { createStaticSource } from "@astryxdesign/core/Typeahead";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";

export function SiteActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const router = useRouter();

  const actions = useMemo(() => {
    const jump = (id: string) => {
      if (window.location.pathname !== "/") {
        router.push(`/#${id}`);
      } else {
        history.pushState(null, "", `#${id}`);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    };

    const navigate = (path: string) => {
      router.push(path);
    };

    const open = (url: string) => {
      window.open(url, "_blank", "noopener,noreferrer");
    };

    return [
      // Sections Navigation
      {
        id: "nav-about",
        label: "About Anushk",
        keywords: ["about", "bio", "iiitd", "background"],
        auxiliaryData: { group: "Sections" },
        run: () => jump("about"),
      },
      {
        id: "nav-skills",
        label: "Core Engineering Domains",
        keywords: ["skills", "systems", "ai", "security", "product"],
        auxiliaryData: { group: "Sections" },
        run: () => jump("skills"),
      },
      {
        id: "nav-technologies",
        label: "Technologies I've Worked With",
        keywords: ["technologies", "stack", "tools", "languages"],
        auxiliaryData: { group: "Sections" },
        run: () => jump("technologies"),
      },
      {
        id: "nav-experience",
        label: "Experience & History",
        keywords: ["experience", "adobe", "iras-hub", "hipec", "resxiv", "internship"],
        auxiliaryData: { group: "Sections" },
        run: () => jump("experience"),
      },
      {
        id: "nav-research",
        label: "Research & Publications",
        keywords: ["research", "publications", "papers", "cvpr", "icmr", "deepfake"],
        auxiliaryData: { group: "Sections" },
        run: () => jump("research"),
      },
      {
        id: "nav-projects-home",
        label: "Selected Projects",
        keywords: ["work", "projects", "amber", "kryptvault"],
        auxiliaryData: { group: "Sections" },
        run: () => jump("projects"),
      },
      {
        id: "nav-github",
        label: "GitHub Activity & Contributions",
        keywords: ["github", "heatmap", "contributions", "commits"],
        auxiliaryData: { group: "Sections" },
        run: () => jump("github-activity"),
      },
      {
        id: "nav-contact",
        label: "Contact & Inquiries",
        keywords: ["contact", "email", "reach"],
        auxiliaryData: { group: "Sections" },
        run: () => jump("contact"),
      },

      // Dedicated Pages
      {
        id: "route-projects",
        label: "Go to /projects (All Projects)",
        keywords: ["projects", "all", "case studies"],
        auxiliaryData: { group: "Pages" },
        run: () => navigate("/projects"),
      },
      {
        id: "route-oss",
        label: "Go to /oss (Open Source Contributions)",
        keywords: ["oss", "open source", "pull requests", "vertex ai"],
        auxiliaryData: { group: "Pages" },
        run: () => navigate("/oss"),
      },
      {
        id: "route-blog",
        label: "Go to /blog (Technical Writing)",
        keywords: ["blog", "writing", "articles", "cuda", "hpc"],
        auxiliaryData: { group: "Pages" },
        run: () => navigate("/blog"),
      },
      {
        id: "route-resume",
        label: "Go to /resume (Interactive Resume)",
        keywords: ["resume", "cv", "pdf", "qualifications"],
        auxiliaryData: { group: "Pages" },
        run: () => navigate("/resume"),
      },

      // Individual Project Case Studies
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        label: `Case Study: ${project.title}`,
        keywords: [project.title, project.slug, ...project.technologies],
        auxiliaryData: { group: "Case Studies" },
        run: () => navigate(`/projects/${project.slug}`),
      })),

      // Research Papers
      ...publications.map((paper) => ({
        id: `pub-${paper.id}`,
        label: `Publication: ${paper.title.slice(0, 50)}...`,
        keywords: [paper.id, paper.venue, "paper"],
        auxiliaryData: { group: "Publications" },
        run: () => open(paper.link),
      })),

      // Social & Contact
      {
        id: "open-github",
        label: "GitHub Profile",
        keywords: ["code", "repositories", "git"],
        auxiliaryData: { group: "Connect" },
        run: () => open(profile.sources.github),
      },
      {
        id: "open-linkedin",
        label: "LinkedIn Profile",
        keywords: ["social", "network", "career"],
        auxiliaryData: { group: "Connect" },
        run: () => open(profile.sources.linkedin),
      },
      {
        id: "email-anushk",
        label: "Send Email (anushk3984@gmail.com)",
        keywords: ["email", "mail", "contact"],
        auxiliaryData: { group: "Connect" },
        run: () => window.location.assign(`mailto:${profile.email}`),
      },
      {
        id: "copy-email",
        label: "Copy Email to Clipboard",
        keywords: ["clipboard", "copy"],
        auxiliaryData: { group: "Connect" },
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setNotice("Email copied to clipboard");
          } catch {
            setNotice(profile.email);
          }
        },
      },
      {
        id: "toggle-motion",
        label: "Pause / Resume Motion",
        keywords: ["animation", "motion", "reduce", "accessibility"],
        auxiliaryData: { group: "Experience" },
        run: () => {
          const isPaused = document.documentElement.dataset.motion === "paused";
          document.documentElement.dataset.motion = isPaused ? "active" : "paused";
          window.dispatchEvent(new Event("matter-motion"));
          setNotice(isPaused ? "Motion resumed" : "Motion paused");
        },
      },
    ];
  }, [router]);

  const source = useMemo(
    () => createStaticSource(actions, { keywords: (action) => action.keywords }),
    [actions]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.palette = isOpen ? "open" : "closed";
  }, [isOpen]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);

  return (
    <div className="site-actions-wrapper">
      <Button
        label="Search ⌘K"
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="cmd-trigger-btn"
      />
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        searchSource={source}
        label="Type a command or search..."
        onValueChange={(value) => {
          setIsOpen(false);
          void actions.find((a) => a.id === value)?.run();
        }}
      />
      {notice && (
        <div className="toast-notice" role="status">
          {notice}
        </div>
      )}
    </div>
  );
}
