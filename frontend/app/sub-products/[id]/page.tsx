import SubProductDetailClient from './SubProductDetailClient';

// For static export, we'll generate some common static params
// but allow dynamic params for any other IDs
export async function generateStaticParams() {
  // Return a few common static params to satisfy Next.js static export requirements
  // These will be pre-generated at build time
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

// Enable dynamic routing for IDs not in generateStaticParams
export const dynamicParams = true;

export default function SubProductDetailPage() {
  return <SubProductDetailClient />;
}