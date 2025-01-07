'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddToCart from '@/components/cart/AddToCart';
export default function SingleProductPage({ params: paramsPromise }) {
    const [id, setId] = useState(null);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // State for quantity
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const resolveParams = async () => {
            const resolvedParams = await paramsPromise;
            setId(resolvedParams.id);
        };

        resolveParams();
    }, [paramsPromise]);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:80/products/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (value) => {
        setQuantity((prev) => Math.max(1, prev + value)); // Ensure quantity is at least 1
    };

    // const handleAddToCart = () => {
    //     alert(`已將 ${quantity} 件 ${product.productName} 加入購物車`);
    //     // Add functionality to save to cart
    // };
    const router = useRouter();
    const handleCheckout = () => {
        alert(`正在結帳 ${quantity} 件 ${product.productName}`);
        router.push('/checkout');
        // Add functionality for checkout
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'flex-start',  justifyContent: 'center' }}>
            {/* Left side: Image */}
            <div style={{ flex: '1', maxWidth: '50%' }}>
                {product?.image ? (
                    <img
                        src={product.image}
                        alt={product.productName}
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                        
                    />
                ) : (
                    <p>No image available</p>
                )}
            </div>

            {/* Right side: Product Details */}
            <div style={{ flex: '1', maxWidth: '50%' }}>
                <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{product?.productName}</h1>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#e4584f' }}>
                    NT${product?.price}
                </p>
                <p style={{ margin: '10px 0' }}>
                    {product?.description || 'No description available'}
                </p>
                <div style={{ margin: '20px 0' }}>
                    <p>數量：</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            style={{
                                width: '30px',
                                height: '30px',
                                background: '#ddd',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            -
                        </button>
                        <span style={{ fontSize: '18px' }}>{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            style={{
                                width: '30px',
                                height: '30px',
                                background: '#ddd',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <AddToCart product={product} />
                    <button
                        onClick={handleCheckout}
                        style={{
                            padding: '10px 20px',
                            background: '#000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        立即結帳
                    </button>
                </div>
            </div>
        </div>
    );
}