'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import Property, { PropertyResponse, UpdatePropertyRequest } from '@/app/types/Property';

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

export default function EditPropertyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [form, setForm] = useState<UpdatePropertyRequest>({
    id: '',
    name: '',
    builder: '',
    price: 0,
    location: '',
    description: '',
    images: '',
    // slug: ""
    updated_at: 0,
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProperty() {
      try {
        console.log(`===>>> fetching :: /api/properties/${id}`);
        const res = await fetch(`/api/properties/${id}`);
        console.log(`===>>> res :: ${JSON.stringify(res)}`);
        if (!res.ok) throw new Error('Failed to fetch property');
        const data = await res.json<PropertyResponse>();
        console.log(`===>>> data :: ${JSON.stringify(data)}`);
        setForm(data.property);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else if (typeof err === 'string') {
          setError(err);
        } else {
          console.error("An unknown error occurred.");
          console.error(JSON.stringify(err))
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProperty();
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      setUpdating(true);
      const res = await fetch(`/api/properties/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update property');
      alert('Property updated successfully!');
      router.push(`/property/${id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else if (typeof err === 'string') {
        alert(err);
      } else {
        console.error("An unknown error occurred.");
        console.error(JSON.stringify(err))
        alert("An unknown error occurred.");
      }
    } finally {
      setUpdating(false);
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading property details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <main className="max-w-3xl mx-auto py-10 px-6 bg-white mt-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Edit Property
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Property Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Builder"
            value={form.builder}
            onChange={e => setForm({ ...form, builder: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={e =>
              setForm({ ...form, price: parseFloat(e.target.value) })
            }
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded px-3 py-2 h-32"
          />
          {/* <input
            type="text"
            placeholder="Location"
            value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          /> */}
          <input
            type="url"
            placeholder="Image URL (optional)"
            value={form.images || ''}
            onChange={e => setForm({ ...form, images: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />

          <button
            type="submit"
            disabled={updating}
            className={`w-full py-2 rounded text-white ${updating
              ? 'bg-green-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {updating ? 'Updating...' : 'Update Property'}
          </button>
        </form>

        {/* <div className="mt-8 flex justify-center">
          <LanguageSwitcher />
        </div> */}
      </main>
    </div>
  );
}
