import React from 'react'

function WormDetail({ title, circles }) {
  console.log('WORM', title, circles)
  return (
    <div>
      Worm for {title}
    </div>
  )
}

export default React.memo(WormDetail)