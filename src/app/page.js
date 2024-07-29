'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Chat Application</h1>
      <div className="text-center">
        <Link href="/register" className="btn btn-primary m-2">Register</Link>
        <Link href="/login" className="btn btn-primary m-2">Login</Link>
      </div>
    </div>
  );
}