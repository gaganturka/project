import React from 'react'

const FetchCategoriesList = ({selectedCategory,setSelectedCategory,getCategories,setGetCategories}) => {
  return (
      <><select
      class="form-control"
      onChange={(e) => {
        setSelectedCategory(e.target.value);
      }}
    >
      <option selected value="0">
        Filter Categories
      </option>
      
      {getCategories &&
        getCategories.map((obj, index) => {
          return (
            <option value={`${obj._id}`}>
              {obj.name}
            </option>
          );
        })}
    </select></>
  )
}

export default FetchCategoriesList