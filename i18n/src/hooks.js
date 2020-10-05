import { useEffect, useState } from 'react'

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

  useEffect(() => {
    if (!path) {
      setData(null)
      return
    }
    let canceled = false
    fetch(`/api/locales/${path}`)
      .then(
        (r) => r.json(),
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

  return [data, setData, saveData]
}
