/*
  SECTIONS: the interactive parts of the home page.
    1. Skills: the filter pills (with a sliding animation)
       and the brand-colored light that follows the mouse over a card
*/
;(function () {
  const { $, $$, reducedMotion } = WB

  /* ---------- Skills ----------
     The "Core stack" cards are always shown. Below them, every card in #skill-grid has
     data-cat (its group), and the pills show only the cards of one group. */
  const grid = $('#skill-grid')
  const cards = $$('.skill-card', grid) // only the grid's cards: the filter never hides the core stack
  const pills = $$('[data-skill-filter]')
  const count = $('#skill-count')
  const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)' // same curve as --ease-out in the CSS

  /* Filtering uses the "FLIP" animation trick:
       First:  remember where every visible card is,
       Last:   show/hide the cards (the grid jumps to its new layout instantly),
       Invert: for each card still shown, work out how far it moved,
       Play:   animate it from the old spot back to the new one.
     Cards that were hidden and come back fade and grow in, one after another. */
  function applyFilter(filter, animate) {
    for (const pill of pills) {
      pill.setAttribute('aria-pressed', String(pill.dataset.skillFilter === filter))
    }

    // First
    const before = new Map()
    if (animate)
      for (const card of cards) if (!card.hidden) before.set(card, card.getBoundingClientRect())

    // Last
    let shown = 0
    for (const card of cards) {
      const match = filter === 'all' || card.dataset.cat === filter
      card.hidden = !match
      if (match) shown += 1
    }
    // Screen readers hear the result, e.g. "5 skills shown".
    count.textContent = shown + ' skills shown'
    if (!animate || reducedMotion) return

    // Invert + Play (the Web Animations API: element.animate(keyframes, options))
    let newcomer = 0
    for (const card of cards) {
      if (card.hidden) continue
      card.classList.remove('reveal') // the scroll fade-up isn't needed once you've filtered
      const old = before.get(card)
      const now = card.getBoundingClientRect()
      if (old) {
        const dx = old.left - now.left
        const dy = old.top - now.top
        if (dx || dy) {
          card.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], {
            duration: 550,
            easing: EASE_OUT,
          })
        }
      } else {
        card.animate(
          [
            { opacity: 0, transform: 'translateY(14px) scale(0.94)' },
            { opacity: 1, transform: 'none' },
          ],
          {
            duration: 500,
            delay: Math.min(newcomer, 10) * 35,
            easing: EASE_OUT,
            fill: 'backwards',
          },
        )
        newcomer += 1
      }
    }
  }

  for (const pill of pills) {
    pill.addEventListener('click', () => applyFilter(pill.dataset.skillFilter, true))
  }

  /* The soft light under the mouse: tell the CSS where the pointer is inside the card.
     (css/styles.css section 9 draws it with a radial gradient at --mx / --my.)
     Listening on the whole section covers the core stack cards and the grid's cards. */
  $('#skills').addEventListener('pointermove', (event) => {
    const card = event.target.closest('.skill-card')
    if (!card) return
    const box = card.getBoundingClientRect()
    card.style.setProperty('--mx', event.clientX - box.left + 'px')
    card.style.setProperty('--my', event.clientY - box.top + 'px')
  })

  applyFilter('all', false)
})()
