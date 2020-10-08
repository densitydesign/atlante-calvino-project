const express = require('express')
const fs = require('fs')
const path = require('path')
const set = require('lodash/set')
const get = require('lodash/get')
const lockFileLib = require('lockfile')
const util = require('util')
const app = express()
const port = 3023

app.use(express.json())
app.use(express.static('build'))

const lock = util.promisify(lockFileLib.lock)
const unlock = util.promisify(lockFileLib.unlock)

async function getLocalesFiles(dir = '') {
  const files = await fs.promises.readdir(
    path.join(__dirname, '../public/locales', dir),
    {
      withFileTypes: true,
    }
  )
  let fileList = []
  for (let file of files) {
    if (file.isDirectory()) {
      const fileListInDir = await getLocalesFiles(path.join(dir, file.name))
      fileList.push(...fileListInDir)
    } else {
      fileList.push(path.join(dir, file.name))
    }
  }
  return fileList
}

app.get('/api/ls', async (req, res) => {
  try {
    const localesFiles = await getLocalesFiles()
    res.json(localesFiles)
  } catch (e) {
    console.error('Error while `ls` locales', e)
    res.json([])
  }
})

app.post('/api/locales/:lang/:filePath(*)', async (req, res) => {
  const { lang, filePath } = req.params

  // const translation = mapValues(req.body, (v) => v.replace(/\s/g, ''))
  const translation = req.body

  await fs.promises.writeFile(
    path.join(__dirname, '../public/locales', lang, filePath),
    JSON.stringify(translation, null, 2)
  )

  res.json(translation)
})

app.get('/api/locales/:lang/:relativePath(*)', async (req, res) => {
  const { lang, relativePath } = req.params

  const filePath = path.join(__dirname, '../public/locales', lang, relativePath)

  try {
    const rawFile = await fs.promises.readFile(filePath)

    res.set({
      'Content-Type': 'application/json; charset=utf-8',
    })
    res.send(rawFile)
  } catch (e) {
    res.status(404).json({
      error: `${filePath} not found`,
      details: e,
    })
  }
})

app.post('/api/front/locales/add/:lang/:ns', async (req, res) => {
  const { lang, ns } = req.params

  const filePath = path.join(__dirname, '../public/locales', lang, `${ns}.json`)
  const lockFilePath = path.join(__dirname, `${lang}__${ns}.lock`)

  try {
    await lock(lockFilePath, {
      // Wait 10 seconds ...
      wait: 10 * 1000,
    })
  } catch (e) {
    return res.status(500).json({
      error: `${filePath} was locked by ${lockFilePath}, giving up...`,
      details: e,
    })
  }

  // Load exist translations (or empty object)
  let translations
  try {
    const rawFile = await fs.promises.readFile(filePath)
    translations = JSON.parse(rawFile)
  } catch (e) {
    translations = {}
  }

  // Set missing keys (deep)
  const missing = req.body
  Object.keys(missing).forEach((missingKey) => {
    if (get(translations, missingKey) === undefined) {
      const missingValue = missing[missingKey]
      let value
      if (missingValue === missingKey) {
        value = missingValue.split('.').slice(-1)[0]
      } else {
        value = missingValue
      }
      set(translations, missingKey, value)
    }
  })

  // Write file
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(translations, null, 2))
  } catch (e) {
    res.status(500).json({
      error: `Error while tring to write ${filePath}`,
      details: e,
    })
    return
  }

  try {
    await unlock(lockFilePath)
  } catch (e) {
    res.status(500).json({
      error: `Error while tring to unlock ${lockFilePath}`,
      details: e,
    })
    return
  }

  // OK My Boy
  res.status(204).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.listen(port, () => {
  console.log(`i18n Server listening at http://localhost:${port}`)
})
