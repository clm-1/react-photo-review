import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll to top on button-click
export const scrollToTopBtn = () => {
  window.scrollTo({
    top: 0,
    behaviour: 'smooth'
  })
}

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop
