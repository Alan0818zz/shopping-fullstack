import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import {ReactSortable} from "react-sortablejs";

export default function ProductForm({
  id,
  productName:existingTitle,
  description:existingDescription,
  price:existingPrice,
  image:existingImages,
  stock:existingStock,
  category:assignedCategory,
}) {
  const [productName,setProductName] = useState(existingTitle || '');
  const [description,setDescription] = useState(existingDescription || '');
  const [category,setCategory] = useState(assignedCategory?.categoryName.toString() || '');
  const [price,setPrice] = useState(existingPrice || '');
  const [image,setImage] = useState(existingImages || '');
  const [stock,setStock] = useState(existingStock || 0);
  const [goToProducts,setGoToProducts] = useState(false);
  const [isUploading,setIsUploading] = useState(false);
  const [categories,setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    })
  }, []);
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      productName,
      price: Number(price),
      description,
      stock: Number(stock),
      image,
      category: {
          categoryId: Number(categories.find(c => c.categoryName === category)?.categoryId),
      }
    };
    if (id) {
      //update
      await axios.put('/api/products', {...data,id});
    } else {
      //create
        await axios.post('/api/products', data);

    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/products');
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      data.append('file', files[0]);  // 只上傳第一張圖片
      const res = await axios.post('/api/upload', data);
      setImage(res.data.links[0]);    // 儲存單一圖片 URL
      setIsUploading(false);
    }
  }
  function updateImagesOrder(images) {
    setImage(images);
  }
  return (

      <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input
            type="text"
            placeholder="product name"
            value={productName}
            onChange={ev => setProductName(ev.target.value)}/>
        <label>Category</label>
        <select value={category}
                onChange={ev => setCategory(ev.target.value)}>
          <option value="">Uncategorized</option>
          {categories.length > 0 && categories.map(c => (
              <option key={c.categoryId} value={c.categoryName}
              >{c.categoryName}</option>
          ))}
        </select>
        <label>
          Photos
        </label>
        <div className="mb-2 flex flex-wrap gap-1">
          {image && (
              <div className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                <img src={image} alt="" className="rounded-lg"/>
              </div>
          )}
          {/*<ReactSortable*/}
          {/*  list={images}*/}
          {/*  className="flex flex-wrap gap-1"*/}
          {/*  setList={updateImagesOrder}>*/}
          {/*  {!!images?.length && images.map(link => (*/}
          {/*    <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">*/}
          {/*      <img src={link} alt="" className="rounded-lg"/>*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</ReactSortable>*/}
          {isUploading && (
              <div className="h-24 flex items-center">
                <Spinner/>
              </div>
          )}
          <label
              className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
            </svg>
            <div>
              Add image
            </div>
            <input type="file" onChange={uploadImages} className="hidden"/>
          </label>
        </div>
        <label>Description</label>
        <textarea
            placeholder="description"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
        />
        <label>Price</label>
        <input
            type="number" placeholder="price"
            value={price}
            onChange={ev => setPrice(ev.target.value)}
        />
        <label>Stock</label>
        <input
            type="number"
            placeholder="stock"
            value={stock}
            onChange={ev => setStock(ev.target.value)}
        />
        <button
            type="submit"
            className="btn-primary">
          Save
        </button>
      </form>
  );
}
