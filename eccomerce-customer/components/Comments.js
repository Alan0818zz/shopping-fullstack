'use client';
import { useState, useEffect } from 'react';

export default function Comments({ productId }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0); // 評分

    // Fetch comments and ratings for the product
    useEffect(() => {
        const fetchComments = async () => {
            const res = await fetch(`/api/comments?productId=${productId}`);
            const data = await res.json();
            setComments(data);
        };

        fetchComments();
    }, [productId]);

    // Add a new rating and comment
    const addComment = async () => {
        if (rating === 0) {
            alert('請選擇星級評分再提交。');
            return;
        }

        // 動態生成評論者名字
        const author = `user${comments.length + 1}`;

        const newComment = {
            "product": { "id": productId },    // 符合實體關係
            "member": { "id": 2 },     // 符合實體關係
            "order": { "id": 2 },      // 符合實體關係
            "ratingScore": rating,
            "ratingComment": text.toString(),
            "author": author, // 新增者名字
        };

        console.log("Payload Sent:", newComment);

        try {
            const res = await fetch('http://localhost:80/ratings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newComment),
            });

            if (!res.ok) {
                const errorText = await res.text(); // 後端返回錯誤訊息
                throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
            }

            const savedComment = await res.json(); // 後端返回新增的評論資料

            // 更新評論列表（將新評論添加到現有的評論中）
            setComments((prevComments) => [
                {
                    rating_id: savedComment.id, // 假設後端返回新增評論的 ID
                    member_id: 1231,
                    rating_date: new Date().toISOString(),
                    rating_score: rating,
                    rating_comment: text,
                    author: author, // 新增者名字
                },
                ...prevComments,
            ]);

            // 清空表單
            setText('');
            setRating(0);
            alert('評論已成功提交！');
        } catch (error) {
            // console.error('Error creating comment:', error.message);
            alert('無法提交評論，請稍後再試。');
        }
    };

    return (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3>評論與評分</h3>

            <ul>
                {comments.map((comment, index) => (
                    <li key={comment.rating_id|| `temp-key-${index}`} style={{ marginBottom: '10px' }}>
                        <strong>{`Alan`}</strong> <span>({new Date(comment.rating_date).toLocaleString()})</span>
                        <p>評分: {'★'.repeat(comment.rating_score)}{'☆'.repeat(5 - comment.rating_score)}</p>
                        {comment.rating_comment && <p>評論: {comment.rating_comment}</p>}
                    </li>
                ))}
            </ul>

            {/* Add Rating and Comment Form */}
            <div style={{ marginTop: '20px' }}>
                <h4>評分這個產品</h4>
                <div style={{ marginBottom: '10px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            style={{
                                fontSize: '20px',
                                color: star <= rating ? 'gold' : 'gray',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            ★
                        </button>
                    ))}
                </div>

                <h4>評論內容 (可選填)</h4>
                <textarea
                    placeholder="評論"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%' }}
                />
                <button onClick={addComment} style={{ padding: '10px 15px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}>
                    Submit
                </button>
            </div>
        </div>
    );
}