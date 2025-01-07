export default async function handler(req, res) {
    if (req.method === 'POST') {
        const newOrder = req.body;
        try {
            // Replace with actual backend logic or database interaction
            // For demonstration, assume the order is saved successfully
            const savedOrder = {
                id: Math.random().toString(36).substr(2, 9), // Simulated order ID
                ...newOrder,
            };

            res.status(201).json(savedOrder); // Return the saved order
        } catch (error) {
            console.error('Error saving order:', error.message);
            res.status(500).json({ message: 'Failed to create order', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}