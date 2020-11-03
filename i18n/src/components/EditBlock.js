import React from 'react'

function EditBlock({ value, localKey, dataKey, setDataAt }) {
  return (
    <div>
      <div>
        <b>
          {localKey}
        </b>
      </div>
      <textarea
        style={{ width: '100%', resize: 'vertical' }}
        rows={3}
        onChange={(e) => setDataAt(dataKey, e.target.value)}
        value={value}
      />
    </div>
  )
}

export default React.memo(EditBlock)
