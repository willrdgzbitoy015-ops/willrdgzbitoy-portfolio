/*
  LIGHTBOX: a big view of a certificate or a screenshot.
  Built on the native <dialog> element, so Esc closes it, Tab stays inside it and focus
  returns to the button that opened it. We add: arrow keys, Previous / Next buttons,
  click-outside-to-close, and no scrolling of the page behind.

  Other scripts call WB.openLightbox(items, startIndex), where each item is either
    { src, alt, caption }   an image file, or
    { node, caption }       an element to show a bigger copy of (the certificate art).
*/
;(function () {
  const { $, el, t } = WB

  const dialog = $('#lightbox')
  if (!dialog) return
  const stage = $('#lb-stage')
  const caption = $('#lb-caption')
  const prevButton = $('#lb-prev')
  const nextButton = $('#lb-next')

  let items = []
  let index = 0

  function show() {
    const item = items[index]
    if (item.src) {
      stage.replaceChildren(el('img', { src: item.src, alt: item.alt || '' }))
    } else {
      stage.replaceChildren(item.node.cloneNode(true))
    }
    // "2 / 4 · Title" when there are several, just the title when there is one.
    const position = items.length > 1 ? index + 1 + ' / ' + items.length + ' · ' : ''
    caption.textContent = position + item.caption
    prevButton.hidden = nextButton.hidden = items.length < 2
  }

  function step(direction) {
    // % wraps around: after the last comes the first again.
    index = (index + direction + items.length) % items.length
    show()
  }

  WB.openLightbox = (list, start = 0) => {
    items = list
    index = start
    show()
    dialog.showModal()
    document.body.classList.add('locked')
  }

  prevButton.addEventListener('click', () => step(-1))
  nextButton.addEventListener('click', () => step(1))
  $('#lb-close').addEventListener('click', () => dialog.close())
  dialog.addEventListener('keydown', (event) => {
    if (items.length < 2) return
    if (event.key === 'ArrowLeft') step(-1)
    if (event.key === 'ArrowRight') step(1)
  })
  // A click on the dark backdrop (the dialog itself, or the empty stage around the picture)
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target === stage) dialog.close()
  })
  dialog.addEventListener('close', () => document.body.classList.remove('locked'))

  // Keep the Previous / Next labels in the current language.
  WB.onLangChange(() => {
    prevButton.setAttribute('aria-label', t('lb.prev'))
    nextButton.setAttribute('aria-label', t('lb.next'))
  })
})()
