import type { TranslationKey } from '../i18n/en'

/*
  The About timeline, styled like `git log --oneline` (newest first).
  `hash` is decoration (a made-up short commit id). `type` mimics commit
  prefixes (feat, ship, wip...) and stays in English like real git messages.
*/
export interface TimelineEntry {
  hash: string
  type: 'wip' | 'ship' | 'feat' | 'init' | 'grad' | 'award' | 'role' | 'work'
  textKey: TranslationKey
  /** Shown as written. Text in [brackets] is a placeholder Will still has to fill in. */
  when: string
}

export const TIMELINE: TimelineEntry[] = [
  { hash: 'e41c9a2', type: 'wip', textKey: 'timeline.capstone', when: '2027' },
  { hash: '3f8d1c0', type: 'ship', textKey: 'timeline.rubens', when: 'Nov 2026' },
  { hash: '9b7f310', type: 'ship', textKey: 'timeline.smartfine', when: 'Oct 2026' },
  { hash: 'c07f1b9', type: 'feat', textKey: 'timeline.css', when: '2026' },
  { hash: '6a4e2b8', type: 'feat', textKey: 'timeline.pos', when: '2026' },
  { hash: '0a1b2c3', type: 'init', textKey: 'timeline.bsit', when: '2024' },
  { hash: '5d2a8e4', type: 'feat', textKey: 'timeline.bpp', when: '2023' },
  { hash: 'b2c9e17', type: 'grad', textKey: 'timeline.grad', when: '2023' },
  { hash: 'd4f0a63', type: 'award', textKey: 'timeline.award', when: '2023' },
  { hash: '8e1b5f2', type: 'role', textKey: 'timeline.hailey', when: '2022' },
  { hash: '1c7a9d4', type: 'role', textKey: 'timeline.kira', when: '2021–22' },
  { hash: '71e6d03', type: 'work', textKey: 'timeline.work', when: '[year]' },
]
