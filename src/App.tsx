import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Collections } from './pages/Collections';
import { About } from './pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout data-jc-id="UDVF0I"/>,
    children: [
      { index: true, element: <Home data-jc-id="UDVEVA"/> },
      { path: 'shop', element: <Shop data-jc-id="UDVE9O"/> },
      { path: 'collections', element: <Collections data-jc-id="UDVE5D"/> },
      { path: 'about', element: <About data-jc-id="UDVDIY"/> },
      { path: 'product/:id', element: <Product data-jc-id="UDVDEM"/> },
      { path: 'cart', element: <Cart data-jc-id="UDVCSC"/> },
      { path: 'checkout', element: <Checkout data-jc-id="UDVCO4"/> },
      { path: '*', element: <Navigate to="/" replace data-jc-id="UDVCKK"/> }
    ]
  }
]);

import { ThemeProvider } from './components/providers/ThemeProvider';

export function App() {
  return (
    <ThemeProvider data-jc-id="IJNRL8">
      <RouterProvider router={router} data-jc-id="IJNRJG"/>
    </ThemeProvider>
  );
}
