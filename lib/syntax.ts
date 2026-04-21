/** JSON syntax highlight for terminal panels — ported from narvo-plat/resources/js/lib/terminal.js */

export function syntaxHighlight(obj: object): string {
  const json = JSON.stringify(obj, null, 2);
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"([^"\\]*(?:\\.[^"\\]*)*)"(\s*:)/g, '<span class="k">"$1"</span>$2')
    .replace(/: "([^"\\]*(?:\\.[^"\\]*)*)"/g, ': <span class="s">"$1"</span>')
    .replace(/\b(true|false|null)\b/g, '<span class="n">$1</span>')
    .replace(/: (-?\d+\.?\d*)/g, ': <span class="n">$1</span>');
}

export function highlightCurl(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, '<span class="s">"$1"</span>')
    .replace(/\bcurl\b/g, '<span class="k">curl</span>')
    .replace(/(^|\s)(-[XHd])\b/g, '$1<span class="flg">$2</span>')
    .replace(/(nrv_sk_(?:live|test)_[a-z0-9._]+)/g, '<span class="acc">$1</span>')
    .replace(/(\/v1\/[a-z/]+)/g, '<span class="acc">$1</span>');
}
