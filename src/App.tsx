import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { ToastProvider } from './context/ToastContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingSpinner from './components/common/LoadingSpinner';
import KeyboardShortcuts from './components/common/KeyboardShortcuts';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const RequestQuote = lazy(() => import('./pages/RequestQuote'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <ToastProvider>
        <ScrollToTop />
        <KeyboardShortcuts />
        <div className="flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {[
                  { path: '/', element: <Home /> },
                  { path: '/products', element: <Products /> },
                  { path: '/about', element: <About /> },
                  { path: '/contact', element: <Contact /> },
                  { path: '/request-quote', element: <RequestQuote /> },
                  { path: '*', element: <NotFound /> }
                ].map(({ path, element }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <PageTransition>
                        <Suspense fallback={<LoadingSpinner />}>
                          {element}
                        </Suspense>
                      </PageTransition>
                    }
                  />
                ))}
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
        </div>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;