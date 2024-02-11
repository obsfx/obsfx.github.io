import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center gap-2 py-12 text-gray-400'>
      <h1 className='text-4xl font-bold text-gray-300'>404</h1>
      <p>
        There is nothing here. Go back to the{' '}
        <Link href='/' className='text-blue-500 hover:underline'>
          homepage
        </Link>
        .
      </p>
    </div>
  );
}
