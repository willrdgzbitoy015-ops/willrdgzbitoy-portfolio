/*
  CONTACT: "Submit a ticket".
    1. Copy-email button
    2. Checking the form (validation)
    3. Sending it with Web3Forms
    4. The success card

  Web3Forms is a free service that turns a form post into an email to me.
  Its access key is made to sit in the page (it can only send mail to my inbox,
  it can't read anything), so it is not a secret.
*/
;(function () {
  const { $, el, t, toast, onLangChange } = WB

  // Paste the key from web3forms.com between the quotes. While it is empty, the form
  // still checks the input but tells the visitor to email me instead of pretending to send.
  const WEB3FORMS_KEY = ''
  const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
  const EMAIL = 'willrdgzbitoy015@gmail.com'

  /* ---------- 1. Copy email ---------- */
  async function copyEmail() {
    try {
      // The modern way. It needs a secure page (https or localhost)...
      await navigator.clipboard.writeText(EMAIL)
      toast(t('toast.copied'))
    } catch (error) {
      // ...so here is the old way as a backup: select hidden text and "press copy".
      const helper = el('textarea', { readonly: '', style: 'position:fixed;opacity:0' })
      helper.value = EMAIL
      document.body.append(helper)
      helper.select()
      const copied = document.execCommand('copy')
      helper.remove()
      toast(t(copied ? 'toast.copied' : 'toast.copyFailed'))
    }
  }
  $('#copy-email').addEventListener('click', copyEmail)
  WB.copyEmail = copyEmail // the command palette uses it too

  /* ---------- 2. Validation ----------
     Each field has a test and the dictionary key of its error message.
     The message is shown in the <span class="err"> under the field, and
     aria-invalid marks the field for screen readers and for the red border. */
  const form = $('#ticket-form')
  const okCard = $('#ticket-ok')
  const errorBox = $('#form-error')
  const sendButton = $('#ticket-send')
  const sendLabel = $('span', sendButton)

  const FIELDS = [
    {
      input: $('#t-name'),
      error: $('#e-name'),
      messageKey: 'form.errName',
      isValid: (value) => value.length >= 2,
    },
    {
      input: $('#t-email'),
      error: $('#e-email'),
      messageKey: 'form.errEmail',
      // something@something.something, with no spaces
      isValid: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
    {
      input: $('#t-msg'),
      error: $('#e-msg'),
      messageKey: 'form.errMessage',
      isValid: (value) => value.length >= 10,
    },
  ]

  /** Checks one field, shows or clears its message, and returns true if it is fine. */
  function checkField(field) {
    const valid = field.isValid(field.input.value.trim())
    field.error.textContent = valid ? '' : t(field.messageKey)
    if (valid) field.input.removeAttribute('aria-invalid')
    else field.input.setAttribute('aria-invalid', 'true')
    return valid
  }

  for (const field of FIELDS) {
    // Once a field is marked wrong, re-check it while the visitor fixes it.
    field.input.addEventListener('input', () => {
      if (field.input.hasAttribute('aria-invalid')) checkField(field)
    })
  }

  /* ---------- 3. Sending ---------- */
  let sending = false
  let lastErrorKey = null // remembered so the error can be re-written when the language changes

  function setSending(isSending) {
    sending = isSending
    sendButton.disabled = isSending
    sendLabel.textContent = t(isSending ? 'form.sending' : 'form.send')
  }

  /** Shows the red error box with my email as a fallback, or hides it with null. */
  function showError(messageKey) {
    lastErrorKey = messageKey
    errorBox.hidden = messageKey === null
    if (messageKey === null) return
    errorBox.replaceChildren(t(messageKey), ' ', el('a', { href: 'mailto:' + EMAIL }, EMAIL))
  }

  function showSuccess() {
    // A ticket number just for fun: #WRB- plus four random digits.
    $('#ticket-num').textContent = '#WRB-' + Math.floor(1000 + Math.random() * 9000)
    form.hidden = true
    okCard.hidden = false
    okCard.focus() // move keyboard and screen-reader focus to the result
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault() // stop the browser from reloading the page
    if (sending) return
    showError(null)

    // Check every field (not just the first), then jump to the first wrong one.
    const results = FIELDS.map(checkField)
    const firstBad = FIELDS[results.indexOf(false)]
    if (firstBad) {
      firstBad.input.focus()
      return
    }

    // Honeypot: a real person never sees this field, so only bots fill it in.
    // We show "success" and send nothing, so the bot learns nothing.
    if ($('#t-company').value !== '') {
      showSuccess()
      return
    }

    if (!WEB3FORMS_KEY) {
      showError('form.notConnected')
      return
    }

    setSending(true)
    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Portfolio ticket: ' + $('#t-topic').value,
          from_name: 'Will R. Bitoy · Portfolio',
          name: $('#t-name').value.trim(),
          email: $('#t-email').value.trim(),
          topic: $('#t-topic').value,
          message: $('#t-msg').value.trim(),
        }),
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message || 'Send failed')
      showSuccess()
    } catch (error) {
      // No internet, the service is down, or it said no. The typed message stays in the form.
      showError('form.failed')
    } finally {
      setSending(false)
    }
  })

  /* ---------- 4. "Send another" ---------- */
  $('#ticket-again').addEventListener('click', () => {
    form.reset()
    for (const field of FIELDS) {
      field.error.textContent = ''
      field.input.removeAttribute('aria-invalid')
    }
    okCard.hidden = true
    form.hidden = false
    FIELDS[0].input.focus()
  })

  /* ---------- Language switch: re-write the messages this file created ---------- */
  onLangChange(() => {
    for (const field of FIELDS) {
      if (field.input.hasAttribute('aria-invalid')) checkField(field)
    }
    setSending(sending)
    if (lastErrorKey) showError(lastErrorKey)
  })
})()
