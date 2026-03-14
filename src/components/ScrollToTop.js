import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop + Transição de página
 * - Volta para o topo ao navegar
 * - Aplica animação fadeSlide na página inteira
 */

// Injeta o CSS de transição uma única vez
const TRANSITION_CSS = `
  .page-transition-enter {
    opacity: 0;
    transform: translateY(14px);
  }
  .page-transition-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.32s cubic-bezier(.4,0,.2,1),
                transform 0.32s cubic-bezier(.4,0,.2,1);
  }
`;

let cssInjetado = false;

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPath = useRef(null);

  useEffect(() => {
    // Injeta CSS de transição
    if (!cssInjetado) {
      const style = document.createElement('style');
      style.textContent = TRANSITION_CSS;
      document.head.appendChild(style);
      cssInjetado = true;
    }
  }, []);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    // 1. Scroll imediato para o topo
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 2. Animação de entrada na página
    const root = document.getElementById('root');
    if (!root) return;

    root.classList.remove('page-transition-enter', 'page-transition-enter-active');

    // Frame 1 — estado inicial (invisível, levemente abaixo)
    requestAnimationFrame(() => {
      root.classList.add('page-transition-enter');

      // Frame 2 — ativa a transição CSS
      requestAnimationFrame(() => {
        root.classList.remove('page-transition-enter');
        root.classList.add('page-transition-enter-active');

        // Remove a classe após a animação terminar
        const cleanup = () => root.classList.remove('page-transition-enter-active');
        root.addEventListener('transitionend', cleanup, { once: true });
      });
    });
  }, [pathname]);

  return null; // Componente invisível
}
