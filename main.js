/* eslint-disable no-var */

var css = require('sheetify')
var deburr = require('lodash.deburr')
var html = require('nanohtml')

css('tachyons')

var style = css`
  body {
    background-color: #cdecff;
  }
  :host input,
  :host textarea {
    -webkit-appearance: none;
  }
`

document.title = 'Create human-readable, unique identifiers in the browser'

var meta = html`
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
`

document.head.appendChild(meta)

var header = html`
  <header class="tc">
    <h1 class="f1 fw5 mb2 mt0">slugs</h1>
    <h2 class="f4 fw4 mb5 mt0"><i>Create human-readable, unique identifiers in the browser</i></h2>
  </header>
`

var input = html`<input autofocus class="ba br0 code db f4 mb3 mid-gray h2 w-100" onkeyup=${format} type="text">`

var output = html`<textarea class="br0 br-0 code db f4 mb3 mid-gray overflow-y-hidden h2 w-100" readonly style="resize: none"></textarea>`

var copyButton = html`<button class="b--black ba bg-white black mb4 ph3 pointer h2 f6" onclick=${copyOutput}>Copy</button>`

var form = html`
  <div class="ml-auto mr-auto mw7">
    <label class="db mb1">Input:</label>
      ${input}
    <label class="db mb1">Output:</label>
    <div class="flex">
      ${output}
      ${copyButton}
    </div>
    <details class="db lh-copy pointer w-100">
      <summary>Instructions:</summary>
      <ul>
        <li>You can use the key binding <span><code>Ctrl</code> + <code>v</code></span> to copy the output.</li>
        <li>Deselect the current field with <code>Esc</code>.</li>
      </ul>
    </details>
  </div>
`

var footer = html`
  <footer class="absolute bottom-1">
    <nav>
      <a class="mid-gray" href="https://github.com/frekyll/slugs">View on GitHub</a>
    </nav>
  </footer>
`

var container = html`
  <div class="${style} avenir mid-gray pa3">
    ${header}
    ${form}
    ${footer}
  </div>
`

document.body.appendChild(container)

function slugify (string) {
  var separator = '-'

  string = deburr(string)

  // Decamelize
  string = string
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2')

  string = string.toLowerCase()

  string = string.replace(/[^a-z\d]+/g, '-')

  string = string
    // Remove duplicate separators
    .replace(new RegExp(`${separator}{2,}`, 'g'), separator)
    // Remove separator from start and end
    .replace(new RegExp(`^${separator}|${separator}$`, 'g'), '')

  return string
}

function format (e) {
  output.innerText = slugify(e.target.value)
}

function copyOutput (e) {
  output.focus()
  output.select()
  output.select(0, 99999)
  document.execCommand('copy')
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    this.activeElement.blur()
  }

  if (e.ctrlKey && e.key === 'v') {
    copyOutput()
  }
})
