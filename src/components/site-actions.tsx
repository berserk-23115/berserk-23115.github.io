'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@astryxdesign/core/Button';
import { CommandPalette } from '@astryxdesign/core/CommandPalette';
import { createStaticSource } from '@astryxdesign/core/Typeahead';
import { profile } from '@/data/profile';

type Action = { id: string; label: string; keywords: string[]; auxiliaryData: { group: string }; run: () => void };

export function SiteActions() {
  const [isOpen, setIsOpen] = useState(false);
  const actions = useMemo<Action[]>(() => [
    { id: 'projects', label: 'Jump to selected projects', keywords: ['work', 'repositories'], auxiliaryData: { group: 'Navigate' }, run: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'about', label: 'Jump to about', keywords: ['profile'], auxiliaryData: { group: 'Navigate' }, run: () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'github', label: 'Open GitHub', keywords: ['repositories', 'code'], auxiliaryData: { group: 'Links' }, run: () => window.open(profile.sources.github, '_blank', 'noopener,noreferrer') },
    { id: 'linkedin', label: 'Open LinkedIn', keywords: ['professional', 'social'], auxiliaryData: { group: 'Links' }, run: () => window.open(profile.sources.linkedin, '_blank', 'noopener,noreferrer') },
    { id: 'email', label: 'Copy email address', keywords: ['contact', 'mail'], auxiliaryData: { group: 'Contact' }, run: () => navigator.clipboard.writeText(profile.email) },
  ], []);
  const source = useMemo(() => createStaticSource(actions, { keywords: action => action.keywords }), [actions]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setIsOpen(true); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <Button label="Command menu" variant="ghost" size="sm" onClick={() => setIsOpen(true)} />
      <CommandPalette isOpen={isOpen} onOpenChange={setIsOpen} searchSource={source} label="Portfolio command menu" onValueChange={value => actions.find(action => action.id === value)?.run()} />
    </>
  );
}
