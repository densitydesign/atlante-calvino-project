import { useCallback, useEffect, useReducer, useState } from 'react'
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

const InitialTranslationState = {
  lastPathFetched: null,
  data: null,
}

function translationReducer(state, action) {
  const [type, ...args] = action
  if (type === 'CLEAR') {
    return InitialTranslationState
  }
  if (type === 'END') {
    const [lastPathFetched, data] = args
    return {
      lastPathFetched,
      data,
    }
  }
  if (type === 'SET') {
    const [key, value] = args
    return {
      ...state,
      data: set(state.data, key, value),
    }
  }
  throw new Error('Bad translate action')
}

export function useIOTranslation(path) {
  const [state, dispatch] = useReducer(
    translationReducer,
    InitialTranslationState
  )
  const { data, lastPathFetched } = state
  const [reloadTrigger, setReloadTrigger] = useState({})

  const reload = useCallback(() => setReloadTrigger({}), [])

  const setDataAt = useCallback((key, value) => {
    dispatch(['SET', key, value])
  }, [])

  useEffect(() => {
    if (!path) {
      dispatch(['CLEAR'])
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
        () => dispatch(['END', path, null])
      )
      .then(
        (data) => {
          if (!canceled) {
            dispatch(['END', path, data])
          }
        },
        () => dispatch(['END', path, null])
      )
    return () => {
      canceled = true
    }
  }, [path, reloadTrigger])

  function saveData() {
    fetch(`/api/locales/${path}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return [data, lastPathFetched, setDataAt, saveData, reload]
}
