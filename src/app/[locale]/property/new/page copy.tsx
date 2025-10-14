// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function NewPropertyPage() {
//   const [name, setName] = useState('');
//   const [builder, setBuilder] = useState('');
//   const [price, setPrice] = useState('');
//   const [location, setLocation] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function uploadFile(file: File) {
//     const form = new FormData();
//     form.append('file', file);
//     const res = await fetch('/api/upload', { method: 'POST', body: form });
//     const json = await res.json();
//     if (!res.ok) throw new Error(json?.error || 'Upload failed');
//     return json.url || json.key;
//   }

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const uploadedUrls: string[] = [];
//       for (const f of images) {
//         const url = await uploadFile(f);
//         uploadedUrls.push(url);
//       }
//       const body = { name, builder, price: Number(price), location, description, images: uploadedUrls };
//       const res = await fetch('/api/properties', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//       });
//       if (!res.ok) {
//         const j = await res.json();
//         throw new Error(j?.error || 'Failed to create');
//       }
//       router.push('/');
//     } catch (err: any) {
//       alert(err.message || String(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-4">List a new property</h2>
//       <form onSubmit={onSubmit} className="space-y-3">
//         <input className="w-full p-2 border rounded" value={name} onChange={e => setName(e.target.value)} placeholder="Property name" required />
//         <input className="w-full p-2 border rounded" value={builder} onChange={e => setBuilder(e.target.value)} placeholder="Builder" />
//         <input type="number" className="w-full p-2 border rounded" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
//         <input className="w-full p-2 border rounded" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
//         <textarea className="w-full p-2 border rounded" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />

//         <div>
//           <label className="block text-sm font-medium mb-1">Images</label>
//           <input type="file" accept="image/*" multiple onChange={e => setImages(Array.from(e.target.files || []))} />
//           <div className="mt-2 flex gap-2 flex-wrap">
//             {images.map((f, idx) => (
//               <div key={idx} className="text-xs border p-1 rounded">
//                 {f.name}
//               </div>
//             ))}
//           </div>
//         </div>

//         <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
//           {loading ? 'Saving...' : 'Create Property'}
//         </button>
//       </form>
//     </div>
//   );
// }
