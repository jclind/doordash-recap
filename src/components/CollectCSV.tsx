import React from 'react'
import CSVReader, { IFileInfo } from 'react-csv-reader'
import { DoorDashOrderType } from '../types'

type CollectCSVProps = {
  setData: (data: DoorDashOrderType[] | null) => void
}

const CollectCSV = ({ setData }: CollectCSVProps) => {
  const handleCSV = (data: any[], fileInfo: IFileInfo, originalFile?: File) => {
    // console.log(data)
    // console.log(fileInfo)
    setData(data)
  }

  return (
    <CSVReader
      onFileLoaded={handleCSV}
      parserOptions={{
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      }}
    />
  )
}

export default CollectCSV
