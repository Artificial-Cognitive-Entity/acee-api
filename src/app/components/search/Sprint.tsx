import React from 'react'
import Issue from './Issue'

const Sprint = ({sprint} :{sprint: any}) => {
  return (
    <div className="mb-8">
      <div>{`${sprint.sprint_name}`}</div>
      {sprint.issues.length > 0 ? (
              <div>
                {sprint.issues.map((iss: any, index: any) => (
                  <Issue issue={iss} key={index}></Issue>
                ))}
              </div>
            ) : (
              <></>
            )}
    </div>
  )
}

export default Sprint