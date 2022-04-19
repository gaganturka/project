import React from 'react'

const FectchPracticeAreaList = ({getPracticeArea,setGetPracticeArea,setSelectedPracticeArea,selectedPracticeArea}) => {
  return (
    <>
      <select
                          class="form-control"
                          onChange={(e) => {
                            setSelectedPracticeArea(
                              e.target.value
                            );
                          }}
                        >
                          {/* <option selected value="0">Select</option>
                          <option selected value="1">Category 1</option>
                          <option selected value="2">Category 2</option>
                          <option selected value="3">Category 3</option> */}
                          <option selected value="0">
                            Filter Practice Area
                          </option>
                          {getPracticeArea &&
                            getPracticeArea.map((obj, index) => {
                              return (
                                <option value={`${obj._id}`}>
                                  {obj.name}
                                </option>
                              );
                            })}
                        </select>
    </>
  )
}

export default FectchPracticeAreaList