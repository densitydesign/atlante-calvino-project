import React, { useCallback, useState } from 'react'
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
  const [hideKeys, setHideKeys] = useState({})
  const toggle = useCallback((key) => {
    setHideKeys((all) => ({
      ...all,
      [key]: !all[key],
    }))
  }, [])

  function renderData(data, parentKey = '') {
    const depth = parentKey.split('.').length
    return Object.keys(data).map((key) => {
      const value = data[key]
      const dataKey = [parentKey, key].filter(Boolean).join('.')
      const show = !hideKeys[dataKey]

      if (naiveIsObject(value)) {
        return (
          <div key={key}>
            <h4 className="group-key">
              <button onClick={() => toggle(dataKey)}>
                {show ? '-' : '+'}
              </button>{' '}
              {key}
            </h4>
            {show && (
              <div style={{ paddingLeft: 10 * depth }}>
                {renderData(value, dataKey)}
              </div>
            )}
          </div>
        )
      } else {
        return (
          <EditBlock
            setDataAt={setDataAt}
            value={data[key]}
            key={key}
            localKey={key}
            dataKey={dataKey}
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
