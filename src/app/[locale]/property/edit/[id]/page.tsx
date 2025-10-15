// import { useEffect, useState, FormEvent } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Navbar from '../../../../components/Navbar';
// import LanguageSwitcher from '../../../../components/LanguageSwitcher';
// import Property, { PropertyResponse, UpdatePropertyRequest } from '@/app/types/Property';
// import { createUpdatePropertyForm } from '@/app/components/PropertyForm';
import { getDictionary } from '@/app/lib/dictionaries';
import EditProperty from './EditProperty';

// interface Property {
//   id: string;
//   name: string;
//   builder: string;
//   price: number;
//   location: string;
//   description: string;
//   imageUrl?: string;
// }

// TODO update PropertyUpdate in fetchProperty func

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  
  return (


    <EditProperty dict={dict}></EditProperty>

    
    // <div className="min-h-screen bg-gray-50">
    //   {/* <Navbar /> */}
    //   <main className="max-w-3xl mx-auto py-10 px-6 bg-white mt-6 rounded shadow">
    //     <h1 className="text-2xl font-semibold mb-6 text-center">
    //       Edit Property
    //     </h1>
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <input
    //         type="text"
    //         placeholder="Property Name"
    //         value={form.name}
    //         onChange={e => setForm({ ...form, name: e.target.value })}
    //         className="w-full border rounded px-3 py-2"
    //         required
    //       />
    //       <input
    //         type="text"
    //         placeholder="Builder"
    //         value={form.builder}
    //         onChange={e => setForm({ ...form, builder: e.target.value })}
    //         className="w-full border rounded px-3 py-2"
    //         required
    //       />
    //       <input
    //         type="number"
    //         placeholder="Price"
    //         value={form.price}
    //         onChange={e =>
    //           setForm({ ...form, price: parseFloat(e.target.value) })
    //         }
    //         className="w-full border rounded px-3 py-2"
    //         required
    //       />
    //       <input
    //         type="text"
    //         placeholder="Location"
    //         value={form.location}
    //         onChange={e => setForm({ ...form, location: e.target.value })}
    //         className="w-full border rounded px-3 py-2"
    //         required
    //       />
    //       <textarea
    //         placeholder="Description"
    //         value={form.description}
    //         onChange={e => setForm({ ...form, description: e.target.value })}
    //         className="w-full border rounded px-3 py-2 h-32"
    //       />
    //       {/* <input
    //         type="text"
    //         placeholder="Location"
    //         value={form.slug}
    //         onChange={e => setForm({ ...form, slug: e.target.value })}
    //         className="w-full border rounded px-3 py-2"
    //         required
    //       /> */}
    //       <input
    //         type="url"
    //         placeholder="Image URL (optional)"
    //         value={form.images || ''}
    //         onChange={e => setForm({ ...form, images: e.target.value })}
    //         className="w-full border rounded px-3 py-2"
    //       />

    //       <button
    //         type="submit"
    //         disabled={updating}
    //         className={`w-full py-2 rounded text-white ${updating
    //           ? 'bg-green-600 cursor-not-allowed'
    //           : 'bg-blue-600 hover:bg-blue-700'
    //           }`}
    //       >
    //         {updating ? 'Updating...' : 'Update Property'}
    //       </button>
    //     </form>

    //     {/* <div className="mt-8 flex justify-center">
    //       <LanguageSwitcher />
    //     </div> */}
    //   </main>
    // </div>


  );
}
