import { readFileSync } from 'fs'

/**
 * @param filepath
 * @returns graph
 */
const importCsvFile = (filePath: string) => {
  try {
    const fileContent = readFileSync(filePath, 'utf-8')
    // checking if the file is empty
    if (!fileContent) {
      throw new Error('File is empty')
    }

    const graph = fileContent
      .split('\n')
      .slice(1)
      .map((line) => {
        const [from, to, weight] = line.split(';')
        return [from, to, weight]
      })
    return graph
  } catch (error) {
    throw new Error(
      'Could not read file. Please check the file path and check if the file is of type .csv with the correct format.',
    )
  }
}

export default importCsvFile
