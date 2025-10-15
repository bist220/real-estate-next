import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreatePropertyRequest } from '@/app/types/Property';
import { CreateUpdatePropertyForm } from '@/app/components/PropertyForm';
import { getDictionary } from '@/app/lib/dictionaries';
import CreateProperty from './CreateProperty';

export default async function NewPropertyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);



  return (
    <CreateProperty dict={dict}></CreateProperty>
    // createUpdateProperty(onSubmit, name, setName, builder, setBuilder, price, setPrice, location, setLocation, description, setDescription, uploadedUrls, setUploadedUrls, loading)
    


    // <div className="max-w-3xl mx-auto p-6">
    //   <h2 className="text-2xl font-semibold mb-4">List a new property</h2>
    //   <form onSubmit={onSubmit} className="space-y-3">
    //     <input className="w-full p-2 border rounded" value={name} onChange={e => setName(e.target.value)} placeholder="Property name" required />
    //     <input className="w-full p-2 border rounded" value={builder} onChange={e => setBuilder(e.target.value)} placeholder="Builder" />
    //     <input type="number" className="w-full p-2 border rounded" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
    //     <input className="w-full p-2 border rounded" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
    //     <textarea className="w-full p-2 border rounded" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
    //     <textarea className="w-full p-2 border rounded" value={uploadedUrls} onChange={e => setUploadedUrls(e.target.value)} placeholder="Image Urls" />

    //     {/* <div>
    //       <label className="block text-sm font-medium mb-1">Images</label>
    //       <input type="file" accept="image/*" multiple onChange={e => setImages(Array.from(e.target.files || []))} />
    //       <div className="mt-2 flex gap-2 flex-wrap">
    //         {images.map((f, idx) => (
    //           <div key={idx} className="text-xs border p-1 rounded">
    //             {f.name}
    //           </div>
    //         ))}
    //       </div>
    //     </div> */}

    //     <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
    //       {loading ? 'Saving...' : 'Create Property'}
    //     </button>
    //   </form>
    // </div>
  );
}





// function createUpdateProperty(onSubmit: (e: React.FormEvent) => Promise<void>, name: string, setName: React.Dispatch<React.SetStateAction<string>>, builder: string, setBuilder: React.Dispatch<React.SetStateAction<string>>, price: string, setPrice: React.Dispatch<React.SetStateAction<string>>, location: string, setLocation: React.Dispatch<React.SetStateAction<string>>, description: string, setDescription: React.Dispatch<React.SetStateAction<string>>, uploadedUrls: string, setUploadedUrls: React.Dispatch<React.SetStateAction<string>>, loading: boolean) {

// function createUpdatePropertyForm (onSubmit: (e: React.FormEvent) => Promise<void>, form: CreatePropertyRequest, setForm: React.Dispatch<React.SetStateAction<CreatePropertyRequest>>, loading: boolean) {
//   return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//     {/* <div className="w-full max-w-sm"> */}
//     <div className="w-full max-w-md">
//       <Card className="w-full max-w-sm">
//         <CardHeader>
//           <CardTitle>List a new property</CardTitle>
//           <CardDescription>
//             List your commercial or residential property from the comfort of your couch
//           </CardDescription>
//           {/* <CardAction>
//           <Button variant="link">Sign Up</Button>
//         </CardAction> */}
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={onSubmit}>
//             <FieldGroup>
//               <FieldSet>
//                 {/* <FieldLegend>List a new property</FieldLegend>
//         <FieldDescription>
//           List your commercial or residential property from the comfort of your couch
//         </FieldDescription> */}
//                 <FieldGroup>
//                   <Field>
//                     <FieldLabel htmlFor="name">
//                       Property Name
//                     </FieldLabel>
//                     <Input
//                       id="name" value={form.name}
//                       onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Property name" required />
//                   </Field>
//                   <Field>
//                     <FieldLabel htmlFor="builder">
//                       Builder
//                     </FieldLabel>
//                     <Input
//                       id="builder" value={form.builder}
//                       onChange={e => setForm({ ...form, builder: e.target.value })} placeholder="Builder" required/>
//                   </Field>
//                   <Field>
//                     <FieldLabel htmlFor="price">
//                       Price
//                     </FieldLabel>
//                     <Input
//                       id="price" type="number" value={form.price}
//                       onChange={e =>
//                         setForm({ ...form, price: parseFloat(e.target.value) })
//                       } placeholder="Price" required />
//                   </Field>
//                   <Field>
//                     <FieldLabel htmlFor="location">
//                       Location
//                     </FieldLabel>
//                     <Input
//                       id="location" value={form.location}
//                       onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Location" required />
//                   </Field>
//                   <Field>
//                     <FieldLabel htmlFor="description">
//                       Description
//                     </FieldLabel>
//                     <Textarea
//                       id="description" value={form.description}
//                       onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" />
//                   </Field>

//                   <Field>
//                     <FieldLabel htmlFor="imgUrl">
//                       Image Urls
//                     </FieldLabel>
//                     <Textarea
//                       id="imgUrl" value={form.images || ''}
//                       onChange={e => setForm({ ...form, images: e.target.value })} placeholder="Image Urls" />
//                     <FieldDescription>
//                       Enter comma seperated image urls
//                     </FieldDescription>
//                   </Field>


//                   {/* <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
//           {loading ? 'Saving...' : 'Create Property'}
//         </button> */}


//                 </FieldGroup>
//               </FieldSet>
//               <FieldSeparator />

//               <Field orientation="horizontal" className='items-center justify-center'>
//                 <Button variant={'outline'} disabled={loading}>
//                   {loading ? 'Saving...' : 'Create Property'}</Button>
//                 <Button variant="outline" type="button">
//                   Cancel
//                 </Button>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   </div>;
// }


// export function FieldDemo() {
//   return (
//     <div className="w-full max-w-md">
//       <form>
//         <FieldGroup>
//           <FieldSet>
//             <FieldLegend>List a new property</FieldLegend>
//             <FieldDescription>
//               List your commercial or residential property from the comfort of your couch
//             </FieldDescription>
//             <FieldGroup>
//               <Field>
//                 <FieldLabel htmlFor="checkout-7j9-card-name-43j">
//                   Name
//                 </FieldLabel>
//                 <Input
//                   value={name} onChange={e => setName(e.target.value)} placeholder="Property name" required
//                 />
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
//                   Builder
//                 </FieldLabel>
//                 <Input
//                   value={builder} onChange={e => setBuilder(e.target.value)} placeholder="Builder"
//                 />
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
//                   Price
//                 </FieldLabel>
//                 <Input
//                   type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required
//                 />
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
//                   Location
//                 </FieldLabel>
//                 <Input
//                   value={location} onChange={e => setLocation(e.target.value)} placeholder="Location"
//                 />
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
//                   Description
//                 </FieldLabel>
//                 <Textarea
//                   value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"
//                 />
//               </Field>

//               <Field>
//                 <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
//                   Image Urls
//                 </FieldLabel>
//                 <Textarea
//                   value={uploadedUrls} onChange={e => setUploadedUrls(e.target.value)} placeholder="Image Urls"
//                 />
//                 <FieldDescription>
//                   Enter comma seperated image urls
//                 </FieldDescription>
//               </Field>


//               <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
//                 {loading ? 'Saving...' : 'Create Property'}
//               </button>


//             </FieldGroup>
//           </FieldSet>
//           <FieldSeparator />

//           <Field orientation="horizontal">
//             <Button disabled={loading} >
//               {loading ? 'Saving...' : 'Create Property'}</Button>
//             <Button variant="outline" type="button">
//               Cancel
//             </Button>
//           </Field>
//         </FieldGroup>
//       </form>
//     </div>
//   )
// }
