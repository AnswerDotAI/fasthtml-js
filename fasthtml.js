export function $ (sel) {return document.querySelector   (sel)}
export function $$(sel) {return document.querySelectorAll(sel)}
export function $E(t='div', {dataset, ...props}={}, c=[]) {
    let e = Object.assign(document.createElement(t), props);
    if (dataset) Object.assign(e.dataset, dataset);
    e.append(...c);
    return e;
}

export function proc_htmx(sel, func) {
  htmx.onLoad(elt => {
    const elements = Array.from(htmx.findAll(elt, sel));
    if (elt.matches(sel)) elements.unshift(elt)
    elements.forEach(func);
  });
}
