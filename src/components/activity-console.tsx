'use client';

import { useEffect, useState } from 'react';
import { contributionLevels, profile } from '@/data/profile';

export function ActivityConsole() {
  const [time, setTime] = useState('—');

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-IN', {
      timeZone: profile.timezone,
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }).format(new Date()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="console" aria-label="Engineering activity console">
      <header className="console-header">
        <p className="kicker">/ engineering_activity</p>
        <span className="live-dot">live</span>
      </header>
      <dl className="console-stats">
        <section><dt>local time</dt><dd>{time} <small>IST</small></dd></section>
        <section><dt>base</dt><dd>New Delhi <small>IN</small></dd></section>
        <section><dt>focus</dt><dd>AI · security · systems</dd></section>
      </dl>
      <section className="heatmap-wrap" aria-label="GitHub contribution activity, public snapshot from August 2026">
        <span className="heatmap-label">public GitHub activity · 2026</span>
        <section className="heatmap" role="img" aria-label="Public GitHub contribution calendar snapshot">
          {contributionLevels.map((level, index) => (
            <span key={index} className={`cell level-${level}`} aria-hidden="true" />
          ))}
        </section>
        <a href={`${profile.sources.github}?tab=overview&from=2026-01-01&to=2026-12-31`} target="_blank" rel="noreferrer">View live graph <span aria-hidden="true">↗</span></a>
      </section>
    </section>
  );
}
