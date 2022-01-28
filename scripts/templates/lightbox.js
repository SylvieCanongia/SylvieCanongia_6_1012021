/* eslint-disable camelcase */
import { createElement } from '../utils/functions.js';

/**
 * Call the function buildLightbox that builds the lightbox template
 * @returns Function that builds the lightbox template
 */
function lightbox() {
  /**
 *
 * @param {string} url URL de l'image
 * @returns {HTMLElement} Template of the lightbox
 */
  const buildLightbox = () => {
    const lightbox__wrapper = createElement('div', { className: 'lightbox__wrapper', ariaLabel: 'Vue rapprochée de l\'image' }, undefined, 'body');

    createElement('div', { className: 'lightbox' }, undefined, 'div.lightbox__wrapper');
    createElement('button', { className: 'lightbox__close', ariaLabel: 'Fermer la fenêtre' }, undefined, 'div.lightbox');
    createElement('button', { className: 'lightbox__next', ariaLabel: 'Image suivante' }, undefined, 'div.lightbox');
    createElement('button', { className: 'lightbox__prev', ariaLabel: 'Image précédente' }, undefined, 'div.lightbox');
    createElement('div', { className: 'lightbox__container' }, undefined, 'div.lightbox');

    return { lightbox__wrapper };
  };

  return { buildLightbox };
}

export { lightbox };
