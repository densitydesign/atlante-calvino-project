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
  const [data, lastPathFetched, setDataAt, saveData, reload] = useIOTranslation(
    path
  )
  const [hiddenKeys, setHiddenKeys] = useState({})
  const toggle = useCallback((key) => {
    setHiddenKeys((all) => ({
      ...all,
      [key]: !all[key],
    }))
  }, [])

  // Clear hidden keys when last fetched path changes
  const [prevPath, setPrevPath] = useState(lastPathFetched)
  if (prevPath !== lastPathFetched) {
    setPrevPath(lastPathFetched)
    setHiddenKeys((all) => (Object.keys(all).length === 0 ? all : {}))
  }

  function renderData(data, parentKey = '') {
    const depth = parentKey.split('.').length
    return Object.keys(data).map((key) => {
      const value = data[key]
      const dataKey = [parentKey, key].filter(Boolean).join('.')
      const show = !hiddenKeys[dataKey]
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
          {data && (
            <>
              <button onClick={() => reload()}>Ricarica</button>
              <button onClick={() => saveData()}>Salva</button>
            </>
          )}
        </div>
      )}
      {data && <div className="content">{renderData(data)}</div>}
    </div>
  )
}
