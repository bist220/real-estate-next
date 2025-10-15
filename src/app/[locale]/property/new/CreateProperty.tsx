"use client"
import { CreateUpdatePropertyForm } from "@/app/components/PropertyForm";
import { Dictionary } from "@/app/types/DictionaryType";
import { CreatePropertyRequest } from "@/app/types/Property";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateProperty({dict}: {dict: Dictionary}) {
      const [form, setForm] = useState<CreatePropertyRequest>({
        // id: '',
        name: '',
        builder: '',
        price: 0,
        location: '',
        description: '',
        images: '',
        // slug: ""
      });
      // const [updating, setUpdating] = useState(false);
      // const [error, setError] = useState('');
    
    
      // const [name, setName] = useState('');
      // const [builder, setBuilder] = useState('');
      // const [price, setPrice] = useState('');
      // const [location, setLocation] = useState('');
      // const [description, setDescription] = useState('');
      // // const [images, setImages] = useState<File[]>([]);
      // const [uploadedUrls, setUploadedUrls] = useState<string>("");
    
      const [updating, setUpdating] = useState(false);
      const router = useRouter();
    
      // async function uploadFile(file: File) {
      //   const form = new FormData();
      //   form.append('file', file);
      //   const res = await fetch('/api/upload', { method: 'POST', body: form });
      //   const json = await res.json();
      //   if (!res.ok) throw new Error(json?.error || 'Upload failed');
      //   return json.url || json.key;
      // }
    
      const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        try {
          // const uploadedUrls: string[] = [];
          // for (const f of images) {
          //   const url = await uploadFile(f);
          //   uploadedUrls.push(url);
          // }
          // const body = { name, builder, price: Number(price), location, description, images: uploadedUrls };
          const body = form;
          const res = await fetch('/api/properties', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          if (!res.ok) {
            const j = await res.json();
            // throw new Error(j?.error || 'Failed to create');
            console.error(JSON.stringify(j))
            throw new Error('Failed to create');
          }
          router.push('/');
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err.message);
            alert(err.message || String(err));
          } else if (typeof err === 'string') {
            console.error(`Caught string error: ${err}`);
            alert(err || String(err));
          } else {
            console.error("An unknown error occurred.");
            alert(String(err));
          }
        } finally {
          setUpdating(false);
        }
      };

      return (
        CreateUpdatePropertyForm(onSubmit, form, setForm, updating, dict)
      )
}