import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const TITLES = {
  '/': 'ShopNest — Online Shopping',
  '/cart': 'Shopping Cart',
  '/checkout': 'Checkout',
  '/login': 'Sign In',
  '/signup': 'Create Account',
  '/orders': 'Your Orders',
  '/deals': "Today's Deals",
  '/search': 'Search Results',
}

export default function PageTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    let page = TITLES[pathname]

    if (!page && pathname.startsWith('/product/')) page = 'Product Details'
    if (!page && pathname.startsWith('/category/')) {
      const cat = pathname.split('/')[2]
      page = cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : 'Category'
    }

    if (pathname === '/') {
      document.title = 'ShopNest — Online Shopping'
    } else {
      document.title = page ? `${page} | ShopNest` : 'ShopNest — Online Shopping'
    }
  }, [pathname])

  return null
}
