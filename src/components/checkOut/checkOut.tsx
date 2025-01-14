// "use client"
// import React, { useState } from 'react';
// import { IoIosArrowBack } from "react-icons/io";
// import { IoIosArrowForward } from "react-icons/io";
// import Link from 'next/link';
// const CheckoutPage = () => {
//   const [sameAsShipping, setSameAsShipping] = useState(false);

//   return (
    
//     <div style={{ display: 'flex', flexDirection: 'row', padding: '20px', fontFamily: 'Arial, sans-serif', marginLeft:'150px', marginRight:'150px' }}>
//       {/* Shipping and Billing Address */}
//       <div style={{ flex: 3, marginRight: '20px' }}>
//         <h2 className='font-semibold'>Shipping Address</h2>
//         <br />
//         <ul className='flex justify-start items-center space-x-[232px] mb-5'>
//           <li>First Name</li>
//           <li>Last Name</li>
//         </ul>
//         <form style={{ display: 'grid', gap: '15px' }}>
//           <div style={{ display: 'flex', gap: '10px' }}>
            
//             <input type="text" placeholder="" style={inputStyle} />
//             <input type="text" placeholder="" style={inputStyle} />
//           </div>
//           <ul className='flex justify-start items-center space-x-[210px]'>
//           <li>Email Address</li>
//           <li>Phone number</li>
//         </ul>
//           <div style={{ display: 'flex', gap: '10px' }}>
//             <input type="text" placeholder="" style={inputStyle} />
//             <input type="text" placeholder="" style={inputStyle} />
//           </div>
          
//           <ul className='flex justify-start items-center space-x-[240px]'>
//           <li>Company</li>
//           <li>Country</li>
//         </ul>
//           <div style={{ display: 'flex', gap: '10px' }}>
//           <input type="text" placeholder="" style={inputStyle} />
//             <select style={inputStyle}>
//             <option>Choose Country</option>
//               <option>New York</option>
//               <option>Delhi</option>
//               <option>Toronto</option>
//             </select>
//           </div>
//           <ul className='flex justify-start items-center space-x-[210px]'>
//           <li>City</li>
//           <li>Zip Code</li>
//         </ul>
//         <div style={{ display: 'flex', gap: '10px' }}>
//             <select style={inputStyle}>
//               <option>Choose City</option>
//               <option>New York</option>
//               <option>Delhi</option>
//               <option>Toronto</option>
//             </select>
//             <input type="text" placeholder="" style={inputStyle} />
//           </div>
//           <ul className='flex justify-start items-center space-x-[240px]'>
//           <li>Address 1</li>
//           <li>Address 2</li>
//         </ul>
//         <div style={{ display: 'flex', gap: '10px' }}>
//             <input type="text" placeholder="" style={inputStyle} />
//             <input type="text" placeholder="" style={inputStyle} />
//           </div>
//           <h1 className='font-semibold'>Biling Address</h1>
//           <div>
//             <input
//               type="checkbox"
//               id="sameAsShipping"
//               checked={sameAsShipping}
//               onChange={(e) => setSameAsShipping(e.target.checked)}
//             />
//             <label htmlFor="sameAsShipping"> Same as shipping address</label>
//           </div>

//           <div style={{ display: 'flex', gap:'10px' }}>
//             <Link href={'/cart'}>
//             <button type="button"  className='w-[300px] border-2'>
//                <span className='mt-[-20px]'> Back to cart</span>
//                 </button>
//             </Link>
//             <button type="submit" style={buttonStyle} className='w-[300px]'>
//                 <span className='mt-2'>Proceed to shipping</span>
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Cart Summary */}
//       <div style={{ flex: 1, backgroundColor: '#f9f9f9', padding: '20px'}}>
//         <br />
//         <div>
//           {[1, 2, 3].map((item, index) => (
//             <div key={index} style={{ display: 'flex', gap:'20px', marginBottom: '10px' }}>
//               <img
//                 src="/checkoutpage/p1.png"
//                 alt="Chicken Tikka Kabab"
//                 style={{ width: '50px', height: '50px' }}
//               />
//               <div>
//                 <p className='font-semibold'>Chicken Tikka Kabab</p>
//                 <p className='text-sm text-gray-600'>150 gm net</p>
//                 <p className='text-sm text-gray-600'>50$</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: '10px' }}>
//           <ul className='flex items-center justify-center gap-80'>
//             <li>Subtotal</li>
//             <li>130$</li>
//           </ul>
//           <br />
//           <ul className='flex items-center justify-center gap-80'>
//             <li>Shipping</li>
//             <li>Free</li>
//           </ul>
//           <br />
//           <ul className='flex items-center justify-center gap-80'>
//             <li>Discount</li>
//             <li>25%</li>
//           </ul>
//           <br />
//           <ul className='flex items-center justify-center gap-[340px]'>
//             <li>Tax</li>
//             <li>54.76$</li>
//           </ul>
//           <br />
//           <ul className=' font-semibold flex items-center justify-center gap-[320px]'>
//             <li>Total</li>
//             <li>432.65$</li>
//           </ul>
//         </div>
//         <div className='flex items-center justify-center mt-20'>
//         <button className='bg-[#FF9F0D] w-[300px] h-[50px] rounded-md'>Place an order</button>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// const inputStyle = {
//   padding: '10px',
//   border: '1px solid #ddd',
//   borderRadius: '4px',
//   width: '100%',
// };

// const buttonStyle = {
//   padding: '10px 20px',
//   backgroundColor: '#ffa500',
//   color: 'white',
  
  
//   cursor: 'pointer',
// };

// export default CheckoutPage;
