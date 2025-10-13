// 'use client';
// import { useState } from 'react';
// // TODO can delete this
// export default function AuthForm({ mode = 'login' }: { mode?: 'login' | 'register' }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');

//   async function submit(e: React.FormEvent) {
//     e.preventDefault();
//     const body = { action: mode, email, password };
//     if (mode === 'register') body.name = name;
//     const res = await fetch('/api/auth', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body),
//     });
//     const j = await res.json();
//     if (j?.token) {
//       document.cookie = `token=${j.token}; path=/; max-age=3600`;
//       window.location.href = '/';
//     } else {
//       alert('Error: ' + JSON.stringify(j));
//     }
//   }

//   return (
//     <form onSubmit={submit} className="max-w-md mx-auto p-4 space-y-3">
//       {mode === 'register' && (
//         <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded" />
//       )}
//       <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
//       <input
//         type="password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder="Password"
//         className="w-full p-2 border rounded"
//       />
//       <button className="px-4 py-2 bg-blue-600 text-white rounded">
//         {mode === 'login' ? 'Login' : 'Register'}
//       </button>
//     </form>
//   );
// }
