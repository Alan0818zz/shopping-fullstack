let commentsDB = []; // Temporary in-memory database for ratings and comments

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
        return new Response(JSON.stringify({ error: 'Product ID is required' }), { status: 400 });
    }

    // Filter comments by product ID
    const productComments = commentsDB.filter(comment => comment.product_id === parseInt(productId));
    return new Response(JSON.stringify(productComments), { status: 200 });
}

export async function POST(request) {
    const body = await request.json();
    console.log("hi")
    // Default values for missing fields
    const newComment = {
        rating_id: commentsDB.length + 1, // Auto-increment ID
        order_id: body.order_id || null, // Default to null if not provided
        product_id: parseInt(body.product_id) || null, // Ensure it's an integer
        member_id: body.member_id || 'Anonymous', // Default to "Anonymous"
        rating_score: body.rating_score || 0, // Default to 0 if not provided
        rating_comment: body.rating_comment || null, // Default to null if not provided
        rating_date: new Date().toISOString(), // Use the current timestamp
    };

    commentsDB.push(newComment); // Add the new comment to the in-memory database

    return new Response(JSON.stringify(newComment), { status: 201 }); // Return the structured response
}