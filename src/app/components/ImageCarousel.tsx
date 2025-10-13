import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel"
// import Image from "next/image"

// export function ImageCarousel({urls, className=""} : {urls: string[], className: string}) {
export function ImageCarousel({urls} : {urls: string[]}) {
  return (
    // <Carousel className={"w-full max-w-xs" + className}>
    <Carousel className={"w-full max-w-xs"}>
      <CarouselContent>
        {/* {Array.from({ length: 5 }).map((_, index) => ( */}
        {urls.map((url, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="border-0">
                <CardContent className="flex aspect-square items-center justify-center">
                  {/* <Image src={url} alt={`property_${index}`} width={100} height={100}></Image> */}
                  <img src={url} alt={`property_${index}`}></img>
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious size={"icon-sm"} variant={"ghost"} />
      <CarouselNext size={"icon-sm"} variant={"ghost"} /> */}
    </Carousel>
  )
}
