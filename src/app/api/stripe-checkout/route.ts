// import { Currency } from "lucide-react";
import { NextResponse } from "next/server"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(){
    
    const session = await stripe.checkout.sessions.create({
      success_url: 'https://example.com/success',
      line_items: [
        {
          price_data: {
                currency: "USD",
                product_data:{
                    name: "Mango ",
                },
                unit_amount: 1000,
          }, 
          quantity: 1,
        },
      ],
      mode: 'payment',
    });

    return NextResponse.json({
        message: session,
    })
}












// import { NextResponse } from "next/server"

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// export async function GET(request: Request) {
//   try {
//     const { products } = await request.json();
    
//     const session = await stripe.checkout.sessions.create({
//       success_url: 'https://example.com/success',
//       line_items: products.map((product: any) => ({
//         price_data: {
//           currency: "USD",
//           product_data: {
//             name: product.name,
//           },
//           unit_amount: Math.round(product.price * 100), // Stripe expects amount in cents
//         },
//         quantity: product.quantity,
//       })),
//       mode: 'payment',
//     });

//     return NextResponse.json({
//       message: session,
//     })
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
//   }
// }














// // https://www.youtube.com/watch?v=7hN7fX-TVf4