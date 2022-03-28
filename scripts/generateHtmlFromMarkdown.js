const fsPromise = require('fs/promises')
const path = require('path')
const marked = require('marked')

const inputDirPath = path.join(__dirname, '../src/articles')
const outputDirPath = path.join(__dirname, '../src/articlesHtml')

const convertArticle = async (fileName) => {
  const htmlContent = await fsPromise.readFile(path.join(inputDirPath, fileName), 'utf-8')
  await fsPromise.writeFile(path.join(outputDirPath, fileName.replace(/.md/, '.html')), marked.parse(htmlContent), 'utf-8')
}

!(async () => {
  const inputFileNameList = await fsPromise.readdir(inputDirPath)
  inputFileNameList.forEach(filename => {
    convertArticle(filename)
  })
})().then(r => {
  // console.log(r)
}).then(e => {
  console.log(e)
})

