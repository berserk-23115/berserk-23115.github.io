"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@astryxdesign/core/Button";
import { CommandPalette } from "@astryxdesign/core/CommandPalette";
import { createStaticSource } from "@astryxdesign/core/Typeahead";
import { profile, projects } from "@/data/profile";

export function SiteActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const actions = useMemo(() => {
    const jump = (id: string) => {
      history.pushState(null, "", `#${id}`);
      document.getElementById(id)?.scrollIntoView();
    };
    const open = (url: string) =>
      window.open(url, "_blank", "noopener,noreferrer");
    return [
      ...[
        ["about", "Field notes"],
        ["work", "Selected work"],
        ["github", "GitHub signal"],
        ["oss", "Open source"],
        ["contact", "Contact"],
        ["top", "Back to top"],
      ].map(([id, label]) => ({
        id,
        label,
        keywords: [id, label],
        auxiliaryData: { group: "Index" },
        run: () => jump(id),
      })),
      ...projects.map((project) => ({
        id: project.slug,
        label: `View ${project.title}`,
        keywords: [project.repo],
        auxiliaryData: { group: "Work" },
        run: () => jump(project.slug),
      })),
      {
        id: "github-link",
        label: "Open GitHub",
        keywords: ["code"],
        auxiliaryData: { group: "Connect" },
        run: () => open(profile.sources.github),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        keywords: ["social"],
        auxiliaryData: { group: "Connect" },
        run: () => open(profile.sources.linkedin),
      },
      {
        id: "email",
        label: "Email Anushk",
        keywords: ["contact"],
        auxiliaryData: { group: "Connect" },
        run: () => {
          window.location.assign(`mailto:${profile.email}`);
        },
      },
      {
        id: "copy",
        label: "Copy email address",
        keywords: ["clipboard"],
        auxiliaryData: { group: "Connect" },
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setNotice("Email copied");
          } catch {
            setNotice(profile.email);
          }
        },
      },
      {
        id: "motion",
        label: "Pause / resume motion",
        keywords: ["animation", "accessibility"],
        auxiliaryData: { group: "Experience" },
        run: () => {
          const paused = document.documentElement.dataset.motion !== "paused";
          document.documentElement.dataset.motion = paused
            ? "paused"
            : "active";
          window.dispatchEvent(new Event("matter-motion"));
          setNotice(paused ? "Motion paused" : "Motion resumed");
        },
      },
    ];
  }, []);
  const source = useMemo(
    () =>
      createStaticSource(actions, { keywords: (action) => action.keywords }),
    [actions],
  );
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.palette = isOpen ? "open" : "closed";
  }, [isOpen]);
  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timeout);
  }, [notice]);
  return (
    <>
      <Button
        label="Index / ⌘ K"
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
      />
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        searchSource={source}
        label="Explore the portfolio"
        onValueChange={(value) => {
          setIsOpen(false);
          void actions.find((action) => action.id === value)?.run();
        }}
      />
      <p className="copy-notice" role="status">
        {notice}
      </p>
    </>
  );
}
