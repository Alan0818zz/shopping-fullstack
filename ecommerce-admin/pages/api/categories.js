import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  const YOUR_API_BASE_URL = 'http://localhost:80';

  await isAdminRequest(req,res);

  try {
    if (method === 'GET') {
      const response = await fetch(`${YOUR_API_BASE_URL}/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      res.json(data);
    }

    if (method === 'POST') {
      const {categoryName, categoryDiscount} = req.body;
      try {
        console.log('Sending data:', {categoryName, categoryDiscount});

        const response = await fetch(`${YOUR_API_BASE_URL}/categories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            categoryName,
            categoryDiscount: categoryDiscount || 0,
          }),
        });

        const text = await response.text();
        console.log('Response text:', text);  // 檢查實際回應內容

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error('Failed to parse response:', text);
          throw new Error('Invalid JSON response from server');
        }

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create category');
        }

        // 返回實際的資料
        res.status(response.status).json(data.data || data);

      } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({
          error: error.message,
          details: typeof error === 'object' ? error.toString() : error
        });
      }
    }

    if (method === 'PUT') {
      const {categoryId, categoryName, categoryDiscount} = req.body;
      const response = await fetch(`${YOUR_API_BASE_URL}/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryName,
          categoryDiscount: categoryDiscount || 0,
        }),
      });

      if (!response.ok) throw new Error('Failed to update category');
      const data = await response.json();
      res.json(data);
    }

    if (method === 'DELETE') {
      const {id} = req.query;
      const response = await fetch(`${YOUR_API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete category');
      res.json({ message: 'Category deleted successfully' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}