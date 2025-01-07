'use client';

import { useEffect, useState } from 'react';

import Comments from '@/components/Comments';
import SingleProductPage from '@/components/SingleProductPage';

export default function ProductPage({ params }) {
    const [id, setId] = useState(null);

    useEffect(() => {
        const resolveParams = async () => {
            const resolvedParams = await params; // 解包 `params` Promise
            setId(resolvedParams.id);
        };

        resolveParams();
    }, [params]); // 使用正確的變數名稱

    if (!id) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <SingleProductPage params={{ id }} />
            <Comments productId={id} />
        </div>
    );
}