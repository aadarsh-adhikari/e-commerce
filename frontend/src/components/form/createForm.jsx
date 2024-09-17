import React from 'react'

const CreateForm = ({value,handleSubmit,setvalue})=> {
  return (
    <div>
           <div className="flex  items-center ">
      <div className="w-full max-w-sm  p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              add Catogory
            </label>
            <input
              type="text"
              name="inputField"
              value={value}
              onChange={(e)=>setvalue(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter new category"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default CreateForm
 