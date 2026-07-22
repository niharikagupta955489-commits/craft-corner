import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");


  useEffect(() => {

    fetchCategories();

  }, []);



  const fetchCategories = async () => {

    try {

      const res = await api.get("/categories");

      setCategories(res.data.categories);

    } catch(error) {

      console.log(error);

    }

  };



  const addCategory = async () => {

    if(!categoryName.trim()) return;


    try {

      const res = await api.post("/categories", {
        name: categoryName
      });


      toast.success(res.data.message);


      setCategoryName("");

      fetchCategories();


    } catch(error) {

      toast.error(
        error.response?.data?.message ||
        "Category add failed"
      );

    }

  };



  const deleteCategory = async (id) => {

    try {

      await api.delete(`/categories/${id}`);

      toast.success("Category Deleted");

      fetchCategories();


    } catch(error) {

      toast.error("Delete failed");

    }

  };



  return (

    <div className="min-h-screen bg-[#F5F5F5] p-8">


      <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
        Categories
      </h1>



      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">


        <h2 className="text-2xl font-semibold mb-4">
          Add New Category
        </h2>


        <div className="flex gap-4">


          <input

            type="text"

            placeholder="Category Name"

            value={categoryName}

            onChange={(e)=>setCategoryName(e.target.value)}

            className="flex-1 border rounded-xl px-4 py-3"

          />



          <button

            onClick={addCategory}

            className="bg-[#556B2F] text-white px-8 rounded-xl"

          >

            Add

          </button>


        </div>


      </div>




      <div className="bg-white rounded-2xl shadow-md overflow-hidden">


        <table className="w-full">


          <thead className="bg-gray-100">


            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>


          </thead>



          <tbody>


          {
            categories.length === 0 ? (

              <tr>

                <td
                  colSpan="3"
                  className="text-center p-6"
                >

                  No Categories Found

                </td>

              </tr>


            ) : (


              categories.map((cat,index)=>(


                <tr
                  key={cat._id}
                  className="border-t"
                >


                  <td className="p-4">

                    {index + 1}

                  </td>



                  <td className="p-4 font-semibold">

                    {cat.name}

                  </td>




                  <td className="p-4 text-center">


                    <button

                      onClick={()=>deleteCategory(cat._id)}

                      className="bg-red-500 text-white px-5 py-2 rounded-lg"

                    >

                      Delete

                    </button>


                  </td>


                </tr>


              ))

            )

          }


          </tbody>


        </table>


      </div>


    </div>

  );

}