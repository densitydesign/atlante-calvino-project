import React  from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useFileList, useIOTranslation } from './hooks'
import './Admin.css'

export default function Admin() {
  const { path } = useParams()
  const history = useHistory()
  const fileList = useFileList()
  const [data, setData, saveData] = useIOTranslation(path)

  return (
    <div className="i18n-admin">
      {fileList && (
        <div className='navbar'>
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
      {data && (
        <div className='content'>
          {Object.keys(data).map((key) => (
            <div key={key}>
              <div>
                <b>{key}</b>
              </div>
              <textarea
                style={{ width: '100%', resize: 'vertical' }}
                rows={3}
                onChange={(e) => setData({ ...data, [key]: e.target.value })}
                value={data[key]}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
