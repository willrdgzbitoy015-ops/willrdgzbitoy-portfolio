/*
  SECTIONS: the interactive parts of the home page.
    1. Skills: category labels and the filter pills
    2. Certificates: "Preview" opens the lightbox
*/
;(function () {
  const { $, $$, t, reducedMotion, onLangChange } = WB

  /* ---------- 1. Skills ----------
     Every card has data-cat (its group). The small grey label under the name is the
     group's singular name from the dictionary (cat.lang.one = "Language"), so it follows
     the language switch. The pills show only the cards of one group. */
  const cards = $$('.skill-card')
  const pills = $$('[data-skill-filter]')
  const count = $('#skill-count')
  let currentFilter = 'all'

  function paintSkillLabels() {
    for (const card of cards)
      $('.skill-cat', card).textContent = t('cat.' + card.dataset.cat + '.one')
  }

  function applyFilter(filter, animate) {
    currentFilter = filter
    for (const pill of pills) {
      pill.setAttribute('aria-pressed', String(pill.dataset.skillFilter === filter))
    }
    let shown = 0
    for (const card of cards) {
      const match = filter === 'all' || card.dataset.cat === filter
      card.hidden = !match
      if (!match) continue
      shown += 1
      if (animate && !reducedMotion) {
        // Restart the little "pop" animation on the cards that are shown.
        card.classList.remove('pop')
        void card.offsetWidth // forces the browser to notice the removal
        card.classList.add('pop')
      }
    }
    // Screen readers hear the result, e.g. "5 skills shown".
    count.textContent = t('skills.count').replace('{n}', shown)
  }

  for (const pill of pills) {
    pill.addEventListener('click', () => applyFilter(pill.dataset.skillFilter, true))
  }
  paintSkillLabels()
  applyFilter('all', false)

  /* ---------- 2. Certificates ----------
     Each "Preview" button opens the lightbox with a bigger copy of that certificate's paper
     art (drawn with CSS). All certificates are in one gallery, so the arrow keys move
     between them. Will keeps his real certificates private: no photos or scans. */
  const certButtons = $$('[data-cert]')
  function certItems() {
    return certButtons.map((button) => {
      const card = button.closest('.cert-card')
      const caption = $('h3', card).textContent + ' · ' + $('.cert-org', card).textContent
      return { node: $('.cert-art', button), caption }
    })
  }
  certButtons.forEach((button, index) => {
    button.addEventListener('click', () => WB.openLightbox(certItems(), index))
  })

  /* ---------- Language switch: rebuild the text this file created ---------- */
  onLangChange(() => {
    paintSkillLabels()
    applyFilter(currentFilter, false)
  })
})()
