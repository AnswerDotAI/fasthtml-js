export function $ (sel) {return document.querySelector   (sel)}
export function $$(sel) {return document.querySelectorAll(sel)}
export function $E(t='div', {style, dataset, className, cls, ...attrs}={}, c=[]) {
  const e = document.createElement(t);
  if (style && typeof style === 'object') Object.assign(e.style, style);
  if (className || cls) e.className = className || cls;
  if (dataset) Object.assign(e.dataset, dataset);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  });
  e.append(...(Array.isArray(c) ? c : [c]));
  return e;
}

export function $H(ss, ...values) {
  const r = $E();
  r.innerHTML = ss.reduce((r,s,i) => r+s + (values[i] || ''), '').trim();
  return r.firstElementChild;
}

export function proc_htmx(sel, func) {
  htmx.onLoad(elt => {
    const elements = Array.from(htmx.findAll(elt, sel));
    if (elt.matches(sel)) elements.unshift(elt)
    elements.forEach(func);
  });
}

if (typeof window !== 'undefined') {
  window.$ = $;
  window.$$ = $$;
  window.$E = $E;
  window.$H = $H;
  window.proc_htmx = proc_htmx;
}
