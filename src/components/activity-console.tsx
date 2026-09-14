'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/data/profile';
import type { PortfolioData } from '@/lib/github/types';

export function ActivityConsole({ data }: { data: PortfolioData }) {
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
        {data.pullRequests[0] && <section><dt>latest</dt><dd>merged PR · {data.pullRequests[0].owner}/{data.pullRequests[0].repository}</dd></section>}
        {data.contributions[0] && <section><dt>contributions</dt><dd>{data.contributions[0].total.toLocaleString()} <small>this year</small></dd></section>}
        {data.repositories[0] && <section><dt>recently active</dt><dd>{data.repositories[0].name}</dd></section>}
        {data.profile && <section><dt>github</dt><dd>@{data.profile.login}</dd></section>}
      </dl>
      <a className="console-link" href={profile.sources.github} target="_blank" rel="noreferrer">Open live profile <span aria-hidden="true">↗</span></a>
    </section>
  );
}
