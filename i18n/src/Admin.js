import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useFileList, useIOTranslation } from './hooks'
import { naiveIsObject } from './utils'
import EditBlock from './components/EditBlock'
import './Admin.css'

export default function Admin() {
  const { path } = useParams()
  const history = useHistory()
  const fileList = useFileList()
  const [data, setDataAt, saveData] = useIOTranslation(path)

  function renderData(data, parentKey = '') {
    const depth = parentKey.split('.').length
    const joinKey = key => [parentKey, key].filter(Boolean).join('.')

    return Object.keys(data).map((key) => {
      const value = data[key]
      if (naiveIsObject(value)) {
        return (
          <div key={key}>
            <h4>{key}</h4>
            <div style={{ paddingLeft: 10 * depth }}>
              {renderData(value, joinKey(key))}
            </div>
          </div>
        )
      } else {
        return (
          <EditBlock
            setDataAt={setDataAt}
            value={data[key]}
            key={key}
            localKey={key}
            dataKey={joinKey(key)}
          />
        )
      }
    })
  }

  return (
    <div className="i18n-admin">
      {fileList && (
        <div className="navbar">
          <select
            value={path}
            onChange={(e) => history.push(`/${e.target.value}`)}
          >
            <option value="">Cosa traduci?</option>
            {fileList.map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </select>
          {data && <button onClick={() => saveData()}>Salva</button>}
        </div>
      )}
      {data && <div className="content">{renderData(data)}</div>}
    </div>
  )
}
