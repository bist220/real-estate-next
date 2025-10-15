"use client"
import { CreateUpdatePropertyForm } from "@/app/components/PropertyForm";
import { Dictionary } from "@/app/types/DictionaryType";
import { PropertyResponse, UpdatePropertyRequest } from "@/app/types/Property";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function EditProperty({ dict }: { dict: Dictionary }) {
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
      router.replace(`/property/${id}`);
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
    <CreateUpdatePropertyForm onSubmit={handleSubmit} form={form} setForm={setForm} loading={updating} dict={dict} />
  )
}