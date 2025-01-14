
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/container'
import { TopHeader } from '@/components/header/topHeader'
import { PHeader } from '@/components/header/t2'
import { Minus, Plus, Trash2 } from 'lucide-react'

interface CartItem {
  name: string
  image: string
  price: number
  slug: string
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const cartWithQuantity = cart.map((item: CartItem) => ({ ...item, quantity: item.quantity || 1 }))
    setCartItems(cartWithQuantity)
  }, [])

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const removeItem = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index)
    updateCart(newCart)
  }

  const updateQuantity = (index: number, change: number) => {
    const newCart = cartItems.map((item, i) => {
      if (i === index) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    })
    updateCart(newCart)
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  // shipping charges add
  const shippingCharges = 10;
  const totalAmount = total + shippingCharges

  return (
    <Container>
      <TopHeader />
      <PHeader title='Cart' />

      <div className="mx-auto px-4 py-16 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <li key={index} className="py-6 flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-grow">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-orange-500 font-bold">${item.price.toFixed(2)}</p>
                    <Link href={`/shop/${item.slug}`} className="text-blue-500 hover:underline">
                      View Product
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(index, -1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="ml-4 p-2 text-red-500 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-end">
              <div className="text-2xl font-bold">
                Total: ${total.toFixed(2)}
              </div>
            </div>
          </>
        )}
      </div>


<div className="mt-8 grid md:grid-cols-2 gap-4">
<div className="border rounded-lg p-6">
  <h2 className="text-lg font-semibold mb-4">Coupon Code</h2>
  <p className="text-sm text-gray-600 mb-4">
    Enter your coupon code if you have one. A coupon code may provide a discount on your purchase.
  </p>
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="Enter discount code"
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
    <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
      Apply
    </button>
  </div>
</div>

<div className="border rounded-lg p-6">
  <h2 className="text-lg font-semibold mb-4">Total Bill</h2>
  <div className="space-y-2">
    <div className="flex justify-between">
      <span>Cart Subtotal</span>
      <span>${total.toFixed(2)}</span>
    </div>
    <div className="flex justify-between">
      <span>Shipping Charges</span>
      <span>${shippingCharges}</span>
    </div>
    <div className="flex justify-between font-semibold pt-2 border-t">
      <span>Total Amount</span>

      {/* add variable */}
      {/* <span>${(total + 10).toFixed(2)}</span> */}
      <span>${(totalAmount).toFixed(2)}</span>
      
    </div>
  </div>
  <button className="w-full mt-4 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
    <Link href="/checkout">Proceed to Checkout</Link>
  </button>
</div>
</div>

    </Container>
  )
}


// 'use client';

// import { Container } from '@/components/container';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Minus, Plus, X } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { TopHeader } from '@/components/header/topHeader';
// import { PHeader } from '@/components/header/t2';
// import { client } from '@/sanity/lib/client';
// import ProductList from '../../components/ourShop/productList';

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   rating: number;
//   image: string;
// }

// export default function ShoppingCart() {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [products, setProducts] = useState<CartItem[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProducts() {
//       setIsLoading(true);
//       try {
//         const query = `*[_type == "product"]{
//           _id,
//           name,
//           price,
//           rating,
//           "image": image.asset->url
//         }`;
//         const fetchedProducts = await client.fetch(query);
//         setProducts(fetchedProducts.map((product: any) => ({
//           ...product,
//           id: product._id,
//           quantity: 0
//         })));
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setItems(JSON.parse(savedCart));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(items));
//   }, [items]);

//   const addToCart = (id: string) => {
//     const productToAdd = products.find(product => product.id === id);
//     if (productToAdd) {
//       setItems(prevItems => {
//         const existingItem = prevItems.find(item => item.id === id);
//         if (existingItem) {
//           return prevItems.map(item =>
//             item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//           );
//         } else {
//           return [...prevItems, { ...productToAdd, quantity: 1 }];
//         }
//       });
//     }
//   };

//   const updateQuantity = (id: string, increment: boolean) => {
//     setItems(prevItems =>
//       prevItems.map(item =>
//         item.id === id
//           ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(0, item.quantity - 1) }
//           : item
//       ).filter(item => item.quantity > 0)
//     );
//   };

//   const removeItem = (id: string) => {
//     setItems(prevItems => prevItems.filter(item => item.id !== id));
//   };

//   const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <Container>
//       <TopHeader />
//       <PHeader title='Shopping Cart' />
//       <div className="mx-auto px-4 py-8 md:px-6 lg:px-8">
//         <div className="md:max-w-4xl mx-auto">
//           {isLoading ? (
//             <p>Loading products...</p>
//           ) : (
//             <ProductList products={products} addToCart={addToCart} />
//           )}
          
//           <h2 className="text-2xl font-bold mt-8 mb-4">Your Cart</h2>
          
//           {/* Mobile view */}
//           <div className="sm:hidden space-y-4">
//             {items.map((item) => (
//               <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
//                 <div className="flex items-center space-x-4 mb-4">
//                   <Image
//                     src={item.image}
//                     alt={item.name}
//                     width={80}
//                     height={80}
//                     className="rounded-lg object-cover"
//                   />
//                   <div>
//                     <h3 className="font-medium">{item.name}</h3>
//                     <div className="flex gap-0.5 text-yellow-400 mt-1">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <span key={i}>{i < item.rating ? '★' : '☆'}</span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="font-medium">Price:</span>
//                   <span>${item.price.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="font-medium">Quantity:</span>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, false)}
//                       className="p-1 hover:bg-gray-100 rounded"
//                     >
//                       <Minus className="w-4 h-4" />
//                     </button>
//                     <span className="w-8 text-center">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, true)}
//                       className="p-1 hover:bg-gray-100 rounded"
//                     >
//                       <Plus className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="font-medium">Total:</span>
//                   <span>${(item.price * item.quantity).toFixed(2)}</span>
//                 </div>
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Desktop view */}
//           <div className="hidden sm:block overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   <th scope="col" className="px-6 py-3">Product</th>
//                   <th scope="col" className="px-6 py-3">Price</th>
//                   <th scope="col" className="px-6 py-3">Quantity</th>
//                   <th scope="col" className="px-6 py-3">Total</th>
//                   <th scope="col" className="px-6 py-3">Remove</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {items.map((item) => (
//                   <tr key={item.id} className="text-sm md:text-base">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-4">
//                         <Image
//                           src={item.image}
//                           alt={item.name}
//                           width={80}
//                           height={80}
//                           className="rounded-lg object-cover"
//                         />
//                         <div>
//                           <h3 className="font-medium">{item.name}</h3>
//                           <div className="flex gap-0.5 text-yellow-400 mt-1">
//                             {Array.from({ length: 5 }).map((_, i) => (
//                               <span key={i}>{i < item.rating ? '★' : '☆'}</span>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">${item.price.toFixed(2)}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => updateQuantity(item.id, false)}
//                           className="p-1 hover:bg-gray-100 rounded"
//                         >
//                           <Minus className="w-4 h-4" />
//                         </button>
//                         <span className="w-8 text-center">{item.quantity}</span>
//                         <button
//                           onClick={() => updateQuantity(item.id, true)}
//                           className="p-1 hover:bg-gray-100 rounded"
//                         >
//                           <Plus className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">${(item.price * item.quantity).toFixed(2)}</td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="p-1 hover:text-red-500 rounded"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-8 grid md:grid-cols-2 gap-4">
//             <div className="border rounded-lg p-6">
//               <h2 className="text-lg font-semibold mb-4">Coupon Code</h2>
//               <p className="text-sm text-gray-600 mb-4">
//                 Enter your coupon code if you have one. A coupon code may provide a discount on your purchase.
//               </p>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Enter discount code"
//                   className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
//                   Apply
//                 </button>
//               </div>
//             </div>

//             <div className="border rounded-lg p-6">
//               <h2 className="text-lg font-semibold mb-4">Total Bill</h2>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span>Cart Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping Charge</span>
//                   <span>$50.00</span>
//                 </div>
//                 <div className="flex justify-between font-semibold pt-2 border-t">
//                   <span>Total Amount</span>
//                   <span>${(subtotal + 50).toFixed(2)}</span>
//                 </div>
//               </div>
//               <button className="w-full mt-4 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
//                 <Link href="/checkout">Proceed to Checkout</Link>
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </Container>
//   );
// }
//___________________OLD UI CODE__________








// 'use client'

// import { useEffect, useState } from 'react'
// import { Container } from '@/components/container'
// import { TopHeader } from '@/components/header/topHeader'
// import { PHeader } from '@/components/header/t2'
// import Image from 'next/image'

// interface CartItem {
//   name: string
//   image: string
//   price: number
// }

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([])

//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem('cart') || '[]')
//     setCartItems(cart)
//   }, [])

//   return (
//     <Container>
//       <TopHeader />
//       <PHeader title='Cart' />

//       <div className="mx-auto px-4 py-16 md:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <ul>
//             {cartItems.map((item, index) => (
//               <li key={index} className="flex items-center gap-4 mb-4">
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   width={100}
//                   height={100}
//                   className="w-[100px] h-[100px] object-cover rounded-lg"
//                 />
//                 <div>
//                   <h2 className="text-xl font-semibold">{item.name}</h2>
//                   <p className="text-orange-500 font-bold">${item.price.toFixed(2)}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </Container>
//   )
// }
//----------------- OK CODE









