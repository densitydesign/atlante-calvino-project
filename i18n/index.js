const express = require('express')
const fs = require('fs')
const path = require('path')
const set = require('lodash/set')
const app = express()
const port = 3023

app.use(express.json())
app.use(express.static('build'))

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
    res.status(404).json({ error: `${filePath} not found` })
  }
})

app.post('/api/front/locales/add/:lang/:ns', async (req, res) => {
  const { lang, ns } = req.params

  const filePath = path.join(__dirname, '../public/locales', lang, `${ns}.json`)

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
    const value = missing[missingKey].split('.').slice(-1)[0]
    set(translations, missingKey, value)
  })

  // Write file
  await fs.promises.writeFile(filePath, JSON.stringify(translations, null, 2))

  // OK My Boy
  res.status(204).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.listen(port, () => {
  console.log(`i18n Server listening at http://localhost:${port}`)
})
