import { useCallback, useEffect, useState } from 'react'
import { set } from 'object-path-immutable'

export function useFileList() {
  const [fileList, setFileList] = useState(null)
  useEffect(() => {
    fetch(`/api/ls`)
      .then((r) => r.json())
      .then((ls) => setFileList(ls))
  }, [])
  return fileList
}

export function useIOTranslation(path) {
  const [data, setData] = useState(null)

  const setDataAt = useCallback((key, value) => {
    setData((data) => set(data, key, value))
  }, [])

  useEffect(() => {
    if (!path) {
      setData(null)
      return
    }
    let canceled = false
    fetch(`/api/locales/${path}`)
      .then(
        (r) => {
          if (r.status === 200) {
            return r.json()
          } else {
            return Promise.reject()
          }
        },
        () => setData(null)
      )
      .then(
        (data) => {
          if (!canceled) {
            setData(data)
          }
        },
        () => setData(null)
      )
    return () => {
      canceled = true
    }
  }, [path])

  function saveData() {
    fetch(`/api/locales/${path}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return [data, setDataAt, saveData]
}
