'use client';
import { useState, useEffect } from 'react';

export default function Comments({ productId }) {
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0); // Track the selected rating

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
            alert('Please select a rating before submitting.');
            return;
        }

        const newComment = {
            "product": { "id": productId },    // 符合實體關係
            "member": { "id": 1231 },     // 符合實體關係
            "order": { "id": 123 },      // 符合實體關係
            "ratingScore": rating,
            "ratingComment": text.toString()
        };
        console.log("Payload Sent:", newComment);
        const res = await fetch('http://localhost:80/ratings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment),
        });
        if (!res.ok) {
            const errorText = await res.text(); // Capture the error message from the backend
            throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
        }
    };

    return (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3>Comments & Ratings</h3>

            {/* List of Comments and Ratings */}
            <ul>
                {comments.map((comment) => (
                    <li key={comment.rating_id} style={{ marginBottom: '10px' }}>
                        <strong>Member ID: {comment.member_id}</strong> <span>({new Date(comment.rating_date).toLocaleString()})</span>
                        <p>Rating: {'★'.repeat(comment.rating_score)}{'☆'.repeat(5 - comment.rating_score)}</p>
                        {comment.rating_comment && <p>Comment: {comment.rating_comment}</p>}
                    </li>
                ))}
            </ul>

            {/* Add Rating and Comment Form */}
            <div style={{ marginTop: '20px' }}>
                <h4>Rate this Product</h4>
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

                <h4>Add a Comment (Optional)</h4>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%' }}
                />
                <textarea
                    placeholder="Your Comment"
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