import React from 'react'

const Screen = ({screenText , isError}) => {
  return (
    <>
    <div className="cal-screen">
              <span
                className={`cal-screen-text d-flex justify-content-end pe-3 ${
                    isError && "text-danger text"
                }`}

              style= {isError ? {fontSize: "63px",
                fontWeight: 500} : {}}
              >
                {screenText}
              </span>
            </div>
    </>
  )
}

export default Screen