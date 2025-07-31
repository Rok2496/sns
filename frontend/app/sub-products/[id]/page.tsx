import SubProductDetailClient from './SubProductDetailClient';

// Generate static params for static export
export async function generateStaticParams() {
  try {
    // Fetch actual sub-product IDs from the API
    const response = await fetch('https://sns-38a5.onrender.com/public/sub-products');
    if (!response.ok) {
      throw new Error('Failed to fetch sub-products');
    }
    const subProducts = await response.json();
    
    // Return actual IDs from the database
    return subProducts.map((subProduct: any) => ({
      id: subProduct.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return empty array if API is not available during build
    return [];
  }
}

export default function SubProductDetailPage() {
  return <SubProductDetailClient />;
}