// import Link from 'next/link';

import {
  Card,
  // CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Property from '../types/Property';
import Link from "next/link";
import { ImageCarousel } from "./ImageCarousel";

export default function PropertyCard({ property }: { property: Property }) {
  let imgageUrlArr : string[] = []
  if (property.images && property.images.trim().length>0) {
    imgageUrlArr = property.images.trim().split(",")
  }

  return (
    
      <Card className="w-full max-w-sm border-1 shadow-md/30 p-4">
        <CardHeader>
          <div className="max-w-full w-full h-1/2 mb-8">
            <ImageCarousel urls={imgageUrlArr} ></ImageCarousel>
            {/* <img src={imgageUrlArr[0]}></img> */}
            {/* <img src={property.images.split(",")[0]}></img> */}
            {/* <img src="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg"
              className="max-w-full w-full h-full" height={100} width={"stretch"}></img> */}
          </div>
          <CardTitle>{property.name}</CardTitle>
          <CardDescription>{property.description}</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <Link href={`/property/${property.id}`}>
        <CardContent>
          {/* <p>{property.images}</p> */}
          {/* <img height={100} width={100} alt={property.images}></img> */}
          <p><i>By</i></p>
          <p>{property.builder}</p>
          {/* <br/> */}
          {/* <p><i>Location</i></p> */}
          <p>{property.location}</p>
        </CardContent>
        <CardFooter>
          <p>₹{Number(property.price).toLocaleString()}</p>
        </CardFooter>
        </Link>
      </Card>
    

    // <article className="bg-white rounded overflow-hidden shadow">
    //   <Link href={`/property/${property.slug}`}>
    //     <img
    //       src={(property.images && property.images[0]) ?? '/placeholder.png'}
    //       alt={property.name}
    //       className="w-full h-44 object-cover"
    //     />
    //   </Link>
    //   <div className="p-3">
    //     <h3 className="text-lg font-semibold">{property.name}</h3>
    //     <p className="text-sm text-gray-500">{property.builder}</p>
    //     <p className="mt-2 font-medium">₹{Number(property.price).toLocaleString()}</p>
    //   </div>
    // </article>
  );
}

// export default function PropertyCard({ property }: { property: any }) {
//   return (
//     <article className="bg-white rounded overflow-hidden shadow">
//       <Link href={`/property/${property.slug}`}>
//         <img
//           src={(property.images && property.images[0]) ?? '/placeholder.png'}
//           alt={property.name}
//           className="w-full h-44 object-cover"
//         />
//       </Link>
//       <div className="p-3">
//         <h3 className="text-lg font-semibold">{property.name}</h3>
//         <p className="text-sm text-gray-500">{property.builder}</p>
//         <p className="mt-2 font-medium">₹{Number(property.price).toLocaleString()}</p>
//       </div>
//     </article>
//   );
// }