import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';

function Categories({swal}) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDiscount, setCategoryDiscount] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, [])

  function fetchCategories() {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
  }

  async function saveCategory(ev){
    ev.preventDefault();
    const data = {
      categoryName,
      categoryDiscount: categoryDiscount ? Number(categoryDiscount) : 0,
    };

    try {
      if (editedCategory) {
        data.categoryId = editedCategory.categoryId;
        await axios.put('/api/categories', data);
        setEditedCategory(null);
      } else {
        await axios.post('/api/categories', data);
      }
      setCategoryName('');
      setCategoryDiscount('');
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      swal.fire({
        title: 'Error',
        text: 'There was a problem saving the category',
        icon: 'error',
      });
    }
  }

  function editCategory(category){
    setEditedCategory(category);
    setCategoryName(category.categoryName);
    setCategoryDiscount(category.categoryDiscount || '');
  }

  function deleteCategory(category){
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${category.categoryName}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const {categoryId} = category;
        try {
          await axios.delete('/api/categories?id='+categoryId);
          fetchCategories();
        } catch (error) {
          swal.fire({
            title: 'Error',
            text: 'There was a problem deleting the category',
            icon: 'error',
          });
        }
      }
    });
  }

  return (
      <Layout>
        <h1>Categories</h1>
        <label>
          {editedCategory
              ? `Edit category ${editedCategory.categoryName}`
              : 'Create new category'}
        </label>
        <form onSubmit={saveCategory}>
          <div className="flex gap-1">
            <input
                type="text"
                placeholder={'Category name'}
                onChange={ev => setCategoryName(ev.target.value)}
                value={categoryName}/>
            <input
                type="number"
                placeholder={'Discount (%)'}
                step="0.01"
                onChange={ev => setCategoryDiscount(ev.target.value)}
                value={categoryDiscount}/>
          </div>
          <div className="flex gap-1 mt-2">
            {editedCategory && (
                <button
                    type="button"
                    onClick={() => {
                      setEditedCategory(null);
                      setCategoryName('');
                      setCategoryDiscount('');
                    }}
                    className="btn-default">Cancel</button>
            )}
            <button type="submit"
                    className="btn-primary py-1">
              Save
            </button>
          </div>
        </form>
        {!editedCategory && (
            <table className="basic mt-4">
              <thead>
              <tr>
                <td>Category name</td>
                <td>Discount</td>
                <td>Actions</td>
              </tr>
              </thead>
              <tbody>
              {categories.length > 0 && categories.map(category => (
                  <tr key={category.categoryId}>
                    <td>{category.categoryName}</td>
                    <td>{category.categoryDiscount}%</td>
                    <td>
                      <button
                          onClick={() => editCategory(category)}
                          className="btn-default mr-1"
                      >
                        Edits
                      </button>
                      <button
                          onClick={() => deleteCategory(category)}
                          className="btn-red">Delete</button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}
      </Layout>
  );
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
));