import React,{createContext, useState} from 'react';

export const CategoryAndPracticeContext=createContext();


const CategoryAndPracticeContextProvider = (props) => {
  const [selectedPractice,setSelectedPractice]=useState("");
  const [selectedCategories,setSelectedCategories]=useState("");
  return (
    <CategoryAndPracticeContext.Provider value={{selectedPractice,setSelectedPractice,selectedCategories,setSelectedCategories}}>
{props.children}
    </CategoryAndPracticeContext.Provider>
  )
}

export default CategoryAndPracticeContextProvider