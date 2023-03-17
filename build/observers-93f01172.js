import { k as Build } from './index-d836c4a8.js';

/**
 * This utility ensures observers are created only for browser contexts.
 *
 * @param type - the type of observer to create
 * @param callback - the observer callback
 * @param options - the observer options
 */
function createObserver(type, callback, options) {
  const Observer = getObserver(type);
  return Build.isBrowser ? new Observer(callback, options) : undefined;
}
function getObserver(type) {
  return (type === "intersection" ? IntersectionObserver : type === "mutation" ? MutationObserver : ResizeObserver);
}

export { createObserver as c };
