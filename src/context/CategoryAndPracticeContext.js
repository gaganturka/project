import React,{createContext} from 'react';

export const CategoryAndPracticeContext=createContext();


const CategoryAndPracticeContextProvider = (props) => {
  const [fetchedPracticeAreas,setFetchedPracticeAreas]=useState([]);
  const [fetchedCategories,setFetchedCategories]=useState([]);
  return (
    <CategoryAndPracticeContext.Provider>
{props.children}
    </CategoryAndPracticeContext.Provider>
  )
}

export default CategoryAndPracticeContextProvider