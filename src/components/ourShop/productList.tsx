
import { useEffect, useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { Image as Iimage } from "sanity";
import React from "react";

// Fetch products using the Sanity client
const fetchProducts = async (): Promise<IProduct[]> => {
  const query = `*[_type == "product"]{
    name,
    "slug": slug.current,
    image,
    category,
    price,
    price2,
    rating,
    sell
  }`;
  return await client.fetch(query);
};

// Define Product type
interface IProduct {
  name: string;
  slug: string;
  image: Iimage;
  category: string;
  price: number;
  price2?: number;
  rating?: number;
  sell?: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(({ slug, image, name, price, price2, sell }) => (
        <div
          key={slug}
          className="max-w-[312px] rounded-lg shadow-md overflow-hidden"
        >
          <Link href={`/shop/${slug}`}>
            <div className="relative group">
              <Image
                src={urlFor(image).url()}
                alt={name}
                width={200}
                height={200}
                className="object-cover w-full h-64"
              />
              <div className="absolute top-2 right-2 flex gap-2"></div>
              {sell && (
                <span className="absolute top-2 left-2 bg-orange-600 text-white rounded-md px-2 text-sm">
                  {sell}
                </span>
              )}
            </div>
          </Link>
          <div className="p-4">
            <Link href={`/shop/${slug}`}>
              <h3 className="font-semibold text-lg mb-2 hover:text-orange-500">
                {name}
              </h3>
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-orange-500 font-bold">
                ${price.toFixed(2)}
              </span>
              {price2 && (
                <span className="text-gray-600 line-through">
                  ${price2.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;











// // import { FaArrowsRotate, FaRegHeart } from "react-icons/fa";
// import { MdOutlineShoppingBag } from "react-icons/md";
// import Image from "next/image";
// import Link from "next/link";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
// import { Image as Iimage } from "sanity";
// import React from "react";

// // Fetch products using the Sanity client
// export const fetchProducts = async (): Promise<IProduct[]> => {
//   const query = `*[_type == "product"]{
//     name,
//     "slug": slug.current,
//     image,
//     category,
//     price,
//     price2,
//     rating,
//     sell
//   }`;
//   return await client.fetch(query); // Correctly fetch and return the data
// };

// // Define Product type
// interface IProduct {
//   name: string;
//   slug: string;
//   image: Iimage;
//   category: string;
//   price: number;
//   price2?: number;
//   rating?: number;
//   sell?: string;
// }
// // interface ProductListProps {
// //   products: IProduct[];
// //   addToCart: (id: string) => void;
// // }

// const ProductList = async () => {
//   const data: IProduct[] = await fetchProducts();

//   return (
//     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//       {data.map(({ slug, image, name, price, price2, sell }) => (
//         <div
//           key={slug}
//           className="max-w-[312px] rounded-lg shadow-md overflow-hidden"
//         >
//           <Link href={`/shop/${slug}`}>
//             <div className="relative group">
//               <Image
//                 src={urlFor(image).url()} // Correct usage of urlFor
//                 alt={name}
//                 width={200}
//                 height={200}
//                 className="object-cover w-full h-64"
//               />
//               <div className="absolute top-2 right-2 flex gap-2"></div>
//               {sell && (
//                 <span className="absolute top-2 left-2 bg-orange-600 text-white rounded-md px-2 text-sm">
//                   {sell}
//                 </span>
//               )}
//             </div>
//           </Link>
//           <div className="p-4">
//             <Link href={`/shop/${slug}`}>
//               <h3 className="font-semibold text-lg mb-2 hover:text-orange-500">
//                 {name}
//               </h3>
//             </Link>
//             <div className="flex items-center justify-between">
//               <span className="text-orange-500 font-bold">
//                 ${price.toFixed(2)}
//               </span>
//               {price2 && (
//                 <span className="text-gray-600 line-through">
//                   ${price2.toFixed(2)}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;







// import Image from 'next/image';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   rating: number;
//   image: string;
// }

// interface ProductListProps {
//   products: Product[];
//   addToCart: (id: string) => void;
// }

// export default function ProductList({ products, addToCart }: ProductListProps) {
//   if (!products || products.length === 0) {
//     return <p>No products available.</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Available Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {products.map((product) => (
//           <div key={product.id} className="border rounded-lg p-4">
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={200}
//               height={200}
//               className="w-full h-48 object-cover rounded-lg mb-4"
//             />
//             <h3 className="font-medium mb-2">{product.name}</h3>
//             <div className="flex justify-between items-center">
//               <span>${product.price.toFixed(2)}</span>
//               <button
//                 onClick={() => addToCart(product.id)}
//                 className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

