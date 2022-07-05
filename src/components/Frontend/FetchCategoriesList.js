import React from 'react'

const FetchCategoriesList = ({selectedCategory,setSelectedCategory,getCategories,setGetCategories}) => {
  return (
      <><select
      class="form-control"
      onChange={(e) => {
        console.log('the changes')
        setSelectedCategory(e.target.value);
      }}
      value={selectedCategory}
    >
      <option selected value="">
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