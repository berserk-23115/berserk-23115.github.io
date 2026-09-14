'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useMemo, useState } from 'react';
import type { ContributionYear } from '@/lib/github/types';

const month = new Intl.DateTimeFormat('en', { month: 'short' });
const fullDate = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' });

function months(weeks: ContributionYear['weeks']) {
  return weeks.map((week, index) => {
    const day = week.find(item => item.date.endsWith('-01'));
    return day ? { label: month.format(new Date(`${day.date}T12:00:00`)), index } : null;
  }).filter((value): value is { label: string; index: number } => Boolean(value));
}

export function ContributionGraph({ years }: { years: ContributionYear[] }) {
  const [year, setYear] = useState(years[0]?.year);
  const reducedMotion = useReducedMotion();
  const selected = years.find(item => item.year === year) ?? years[0];
  const labels = useMemo(() => selected ? months(selected.weeks) : [], [selected]);
  if (!selected) return null;

  return (
    <section className="contribution-shell" aria-labelledby="github-title">
      <header className="contribution-head">
        <section>
          <p className="section-index">01 / GITHUB</p>
          <h2 id="github-title">The work leaves a visible trail.</h2>
        </section>
        <section className="contribution-total" aria-label={`${selected.total} contributions in ${selected.year}`}>
          <strong>{selected.total.toLocaleString()}</strong><span>contributions / {selected.year}</span>
        </section>
      </header>
      {years.length > 1 && <nav className="year-switcher" aria-label="Contribution year">
        {years.map(item => <button key={item.year} type="button" aria-pressed={item.year === selected.year} onClick={() => setYear(item.year)}>{item.year}</button>)}
      </nav>}
      <section className="graph-scroll" tabIndex={0} aria-label={`GitHub contribution activity for ${selected.year}`}>
        <section className="month-row" aria-hidden="true">{labels.map(item => <span key={`${item.label}-${item.index}`} style={{ gridColumnStart: item.index + 2 }}>{item.label}</span>)}</section>
        <section className="calendar">
          <section className="weekday-labels" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></section>
          <section className="calendar-weeks">
            {selected.weeks.map((week, weekIndex) => <section className="calendar-week" key={`${selected.year}-${weekIndex}`}>
              {week.map((day, dayIndex) => <motion.button
                className={`contribution-cell level-${day.level}`}
                key={day.date}
                type="button"
                title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${fullDate.format(new Date(`${day.date}T12:00:00`))}`}
                aria-label={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${fullDate.format(new Date(`${day.date}T12:00:00`))}`}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.18, delay: Math.min((weekIndex * 7 + dayIndex) * 0.003, 0.22) }}
              />)}
            </section>)}
          </section>
        </section>
      </section>
      <p className="graph-key"><span>less</span>{[0, 1, 2, 3, 4].map(level => <i className={`contribution-cell level-${level}`} key={level} />)}<span>more</span></p>
    </section>
  );
}
