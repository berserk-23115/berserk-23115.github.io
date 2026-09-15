"use client";

import { useMemo, useState } from "react";
import type { ContributionYear, GithubProfile } from "@/lib/github/types";
import { GitPullRequest, Calendar, Code } from "lucide-react";

interface ContributionHeatmapProps {
  years: ContributionYear[];
  profile: GithubProfile | null;
  pullRequestsCount: number;
}

const monthFormat = new Intl.DateTimeFormat("en", { month: "short" });
const fullDateFormat = new Intl.DateTimeFormat("en", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function ContributionHeatmap({
  years,
  profile,
  pullRequestsCount,
}: ContributionHeatmapProps) {
  const [selectedYear, setSelectedYear] = useState<number>(
    years[0]?.year ?? new Date().getFullYear()
  );
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const activeYearData = useMemo(() => {
    return years.find((y) => y.year === selectedYear) || years[0];
  }, [years, selectedYear]);

  // Extract month label positions from the weeks
  const monthLabels = useMemo(() => {
    if (!activeYearData) return [];
    const labels: { label: string; weekIdx: number }[] = [];
    let lastMonth = "";

    activeYearData.weeks.forEach((week, wIdx) => {
      const firstValidDay = week.find((d) => d && d.date);
      if (firstValidDay) {
        const d = new Date(`${firstValidDay.date}T12:00:00Z`);
        const m = monthFormat.format(d);
        if (m !== lastMonth) {
          labels.push({ label: m, weekIdx: wIdx });
          lastMonth = m;
        }
      }
    });

    return labels;
  }, [activeYearData]);

  if (!activeYearData) return null;

  return (
    <div className="contribution-heatmap-container" aria-labelledby="github-activity-title">
      {/* High-Level Evidence Metrics */}
      <div className="heatmap-metrics-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap">
            <Code className="size-4" />
          </div>
          <div>
            <span className="stat-label">Public Repositories</span>
            <strong className="stat-value">{profile?.publicRepos ?? 22}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap">
            <GitPullRequest className="size-4" />
          </div>
          <div>
            <span className="stat-label">Merged External PRs</span>
            <strong className="stat-value">{pullRequestsCount ?? 12}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap">
            <Calendar className="size-4" />
          </div>
          <div>
            <span className="stat-label">Contributions in {selectedYear}</span>
            <strong className="stat-value">{activeYearData.total.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* Heatmap Header & Year Selector */}
      <div className="heatmap-toolbar">
        <div className="heatmap-title-group">
          <span className="eyebrow">ACTIVITY RECORD</span>
          <span className="activity-summary">
            <b>{activeYearData.total}</b> contributions logged in {selectedYear}
          </span>
        </div>

        {years.length > 1 && (
          <div className="year-selector" role="tablist" aria-label="Contribution year">
            {years.map((y) => (
              <button
                key={y.year}
                type="button"
                role="tab"
                aria-selected={y.year === selectedYear}
                className={`year-btn ${y.year === selectedYear ? "is-active" : ""}`}
                onClick={() => setSelectedYear(y.year)}
              >
                {y.year}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Responsive Calendar Scroll Container */}
      <div
        className="heatmap-scroll-area"
        tabIndex={0}
        role="region"
        aria-label={`GitHub contribution calendar for ${selectedYear}`}
      >
        <div className="heatmap-inner-layout">
          {/* Month Labels */}
          <div className="month-labels-row" aria-hidden="true">
            <div className="month-spacer" />
            <div className="month-names-track">
              {monthLabels.map((m, i) => (
                <span
                  key={`${m.label}-${i}`}
                  className="month-name"
                  style={{ left: `${m.weekIdx * 14}px` }}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          {/* Calendar Grid: 7 Rows (Mon-Sun) */}
          <div className="calendar-grid-wrapper">
            {/* Weekday Labels */}
            <div className="weekday-labels-col" aria-hidden="true">
              <span className="day-label">Mon</span>
              <span className="day-label">Wed</span>
              <span className="day-label">Fri</span>
            </div>

            {/* Weeks columns */}
            <div className="weeks-row">
              {activeYearData.weeks.map((week, wIdx) => (
                <div className="week-col" key={`week-${selectedYear}-${wIdx}`}>
                  {week.map((day, dIdx) => {
                    const formattedDate = fullDateFormat.format(
                      new Date(`${day.date}T12:00:00Z`)
                    );
                    const labelText = `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formattedDate}`;

                    return (
                      <button
                        key={day.date || `empty-${dIdx}`}
                        type="button"
                        className={`heatmap-cell level-${day.level}`}
                        aria-label={labelText}
                        tabIndex={0}
                        onPointerEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredCell({
                            date: formattedDate,
                            count: day.count,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 8,
                          });
                        }}
                        onPointerLeave={() => setHoveredCell(null)}
                        onFocus={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredCell({
                            date: formattedDate,
                            count: day.count,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 8,
                          });
                        }}
                        onBlur={() => setHoveredCell(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Accessible Tooltip */}
      {hoveredCell && (
        <div
          className="heatmap-floating-tooltip"
          style={{
            position: "fixed",
            left: `${hoveredCell.x}px`,
            top: `${hoveredCell.y}px`,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
          role="tooltip"
        >
          <strong>
            {hoveredCell.count} contribution{hoveredCell.count === 1 ? "" : "s"}
          </strong>
          <span>{hoveredCell.date}</span>
        </div>
      )}

      {/* Legend */}
      <div className="heatmap-footer">
        <span className="footer-note">Public activity record from GitHub GraphQL</span>
        <div className="heatmap-legend" aria-hidden="true">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span key={lvl} className={`legend-cell level-${lvl}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
