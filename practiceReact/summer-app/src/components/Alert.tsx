import React from 'react'

type Props = {
  text: string;
}

const Alert = ({text} : Props) => {
  return (
    <div className = "alert alert-primary">{text}</div>
  )
}

export default Alert