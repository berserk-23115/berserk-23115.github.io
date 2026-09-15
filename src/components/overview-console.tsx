"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { MapPin, Clock, Mail, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function OverviewConsole() {
  const [timeStr, setTimeStr] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: profile.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTimeStr(`${formatted} IST`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="overview-console-grid">
      {/* Location */}
      <div className="overview-meta-item">
        <div className="overview-icon-badge">
          <MapPin className="size-4 text-sky-400" />
        </div>
        <div className="overview-text-block">
          <span className="overview-sub">LOCATION</span>
          <span className="overview-val">{profile.location}</span>
        </div>
      </div>

      {/* Live Time */}
      <div className="overview-meta-item">
        <div className="overview-icon-badge">
          <Clock className="size-4 text-emerald-400" />
        </div>
        <div className="overview-text-block">
          <span className="overview-sub">LOCAL TIME</span>
          <span className="overview-val font-mono">{timeStr || "Loading..."}</span>
        </div>
      </div>

      {/* Email & Copy */}
      <div className="overview-meta-item email-meta-item">
        <div className="overview-icon-badge">
          <Mail className="size-4 text-violet-400" />
        </div>
        <div className="overview-text-block">
          <span className="overview-sub">DIRECT CONTACT</span>
          <a href={`mailto:${profile.email}`} className="overview-email-link">
            {profile.email}
          </a>
        </div>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="copy-email-btn"
          aria-label="Copy email address"
          title="Copy email to clipboard"
        >
          {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
        </button>
      </div>

      <div className="overview-quicklinks" aria-label="Quick links">
        <span className="overview-sub">QUICK LINKS</span>
        <a href={profile.sources.github} target="_blank" rel="noopener noreferrer" className="overview-social-link">
          <GithubIcon className="size-4" />
          <span>GitHub</span>
        </a>
        <a href={profile.sources.linkedin} target="_blank" rel="noopener noreferrer" className="overview-social-link">
          <LinkedinIcon className="size-4" />
          <span>LinkedIn</span>
        </a>
      </div>

    </div>
  );
}
