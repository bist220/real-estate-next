"use client"
import { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
// import Navbar from '../../components/Navbar';
// import LanguageSwitcher from '../../components/LanguageSwitcher';
import Property, { PropertyResponse } from '@/app/types/Property';
import { AuthContext } from '@/app/auth-provider';
import { isNullOrEmptyObject } from '@/app/lib/utils';
import Link from 'next/link';
import { Dictionary } from '@/app/types/DictionaryType';
import { Button } from '@/components/ui/button';
// import { ImageCarousel } from '@/app/components/ImageCarousel';

// interface Property {
//   id: string;
//   name: string;
//   builder: string;
//   price: number;
//   location: string;
//   description: string;
//   imageUrl?: string;
//   owner_id: string;
//   created_at: string;
// }


export default function ViewProperty({ labels }: { labels: Dictionary }) {

  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [interestSent, setInterestSent] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties/${id}`);
        console.log(`===>>> res :: ${JSON.stringify(res)}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Property not found')
          }
          throw new Error('Failed to fetch property')
        }
        const data = await res.json<PropertyResponse>();
        console.log(`===>>> data :: ${JSON.stringify(data.property)}`);
        setProperty(data.property);

        // Determine ownership via token
        // const token = document.cookie
        //   .split('; ')
        //   .find(r => r.startsWith('token='))
        //   ?.split('=')[1];
        // if (token) {
        //   const payload = JSON.parse(atob(token.split('.')[1]));
        //   if (payload.userId === data.property.owner_id) setIsOwner(true);
        // }
        if (user !== null && !isNullOrEmptyObject(user) && isAuthenticated) {
          if (user.id === data.property.owner_id) setIsOwner(true);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Something went wrong');
        } else if (typeof err === 'string') {
          setError(err || 'Something went wrong');
        } else {
          console.error("An unknown error occurred.");
          setError(JSON.stringify(err) || 'Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    }
    console.log(`===>>> id :: ${id}`);
    if (id) fetchProperty();
  }, [id, user, isAuthenticated]);

  async function handleInterest() {
    try {
      const res = await fetch(`/api/properties/${id}/interest`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to send interest');
      setInterestSent(true);
      alert('Your interest has been sent to the property owner!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        alert(err.message);
      } else if (typeof err === 'string') {
        console.error(`Caught string error: ${err}`);
        alert(err);
      } else {
        console.error("An unknown error occurred.");
        // alert(JSON.stringify(err));
      }
    }

    // catch (err: any) {
    //   alert(err.message);
    // }
  }

    async function handleDelete() {
    try {
      const userConfirmed = confirm("Are you sure you want to Delete this property?");
      if (!userConfirmed) return;
      const res = await fetch(`/api/properties/${id}/delete`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete property');
      alert('Property deleted successfully');
      router.replace("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        alert(err.message);
      } else if (typeof err === 'string') {
        console.error(`Something went wrong: ${err}`);
        alert(err);
      } else {
        console.error("An unknown error occurred.");
        // alert(JSON.stringify(err));
      }
    }

    // catch (err: any) {
    //   alert(err.message);
    // }
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
        {/* <p className="text-red-500">{error}</p> */}
        <p className="text-gray-600">{error}</p>
      </div>
    );

  if (!property)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Property not found.</p>
      </div>
    );

  let imgageUrlArr: string[] = []
  if (property.images && property.images.trim().length > 0) {
    imgageUrlArr = property.images.trim().split(",")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow p-6">
          {property.images ? (
            // <ImageCarousel className="w-full h-80 object-cover rounded-xl mb-6" urls={imgageUrlArr} ></ImageCarousel>
            <img
              src={imgageUrlArr[0]}
              alt={property.name}
              className="w-full h-80 object-cover rounded-xl mb-6"
            />
          ) : (
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-xl mb-6">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          {/* {property.images ? (
            <img
              src={property.images}
              alt={property.name}
              className="w-full h-80 object-cover rounded-xl mb-6"
            />
          ) : (
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-xl mb-6">
              <span className="text-gray-500">No image available</span>
            </div>
          )} */}

          <h1 className="text-3xl font-semibold mb-2">{property.name}</h1>
          <p className="text-gray-600 mb-2">
            <strong>{labels.property.builder}:</strong> {property.builder}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>{labels.property.location}:</strong> {property.location}
          </p>
          <p className="text-gray-800 text-xl font-semibold mb-4">
            ₹{property.price?.toLocaleString()}
          </p>

          <p className="text-gray-700 mb-6 whitespace-pre-line">
            {property.description || 'No description provided.'}
          </p>
          {/* <p className="text-gray-700 mb-6 whitespace-pre-line">
            {property.slug || 'No description provided.'}
          </p> */}

          <div className="flex flex-wrap gap-4">
            {/* {!isOwner && (
              <button
                onClick={handleInterest}
                disabled={interestSent}
                className={`px-4 py-2 rounded text-white ${interestSent
                  ? 'bg-green-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {interestSent ? 'Interest Sent' : 'Show Interest'}
              </button>
            )} */}

            {isOwner && (
              <Button
                onClick={() => router.push(`/property/edit/${property.id}`)}
                variant={'outline'}
                // className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                className="px-4 py-2 bg-white text-black border-2 border-blue-500  hover:bg-blue-500 "
              >
                {labels.button.edit}
              </Button>
            )}

            {isOwner && (
              <Button
                onClick={handleDelete}
                variant={'outline'}
                // className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                className="px-4 py-2 bg-white text-black border-2 border-red-500  hover:bg-red-500 "

              >
                {labels.button.delete}
              </Button>
            )}
            
            
            <Button
                onClick={() => router.back()} variant={'outline'}
                // className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                // className="px-4 py-2 bg-white hover:bg-gray-200"
                className="px-4 py-2 bg-white text-black border-2 border-gray-500  hover:bg-gray-200 "
              >
                {labels.button.back}
              </Button>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            {labels.property.created_at}: {new Date(property.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* <div className="mt-8 flex justify-center">
          <LanguageSwitcher />
        </div> */}
      </div>
    </div>
  );

}