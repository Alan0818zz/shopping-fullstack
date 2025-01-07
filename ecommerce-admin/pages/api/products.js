export default async function handle(req, res) {
  const {method} = req;
  const YOUR_API_BASE_URL = 'http://localhost:80';  // 確保這樣寫，不要在結尾加 '/'
  try {
    if (method === 'GET') {
      if (req.query?.id) {
        const response = await fetch(`${YOUR_API_BASE_URL}/products/${req.query.id}`);
        if (!response.ok) {
          console.error('API Error: ID', response.status);
        }
        const data = await response.json();
        res.json(data);
      } else {
        const response = await fetch(`${YOUR_API_BASE_URL}/products`);
        if (!response.ok) {
          console.error('API Error: no id', response.status);
        }
        const data = await response.json();
        //console.log('products:', data);
        res.json(data);
      }
    }

    if (method === 'POST') {
      //console.log('Received data:', req.body);
      const response = await fetch(`${YOUR_API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });
      // 詳細記錄錯誤
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response status:', response.status);
        console.error('Response text:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data = await response.json();
      res.json(data);
    }

    if (method === 'PUT') {
      const {id} = req.body;
      const response = await fetch(`${YOUR_API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      res.json(data);
    }

    if (method === 'DELETE') {
      if (req.query?.id) {
        const response = await fetch(`${YOUR_API_BASE_URL}/products/${req.query.id}`, {
          method: 'DELETE'
        });
        const data = await response.text();  // 使用 text() 因為後端返回的是字串
        if (!response.ok) {
          throw new Error(data);  // 使用後端返回的錯誤訊息
        }
        res.json({ message: data });  // 包裝成 JSON 格式返回
      }
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}