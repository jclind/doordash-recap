import React from 'react'
import CSVReader, { IFileInfo } from 'react-csv-reader'
import { DoorDashOrderType } from '../types'
import { AiOutlineCloudUpload } from 'react-icons/ai'

type CollectCSVProps = {
  setData: (data: DoorDashOrderType[] | null) => void
}

const CollectCSV = ({ setData }: CollectCSVProps) => {
  const handleCSV = (data: any[], fileInfo: IFileInfo, originalFile?: File) => {
    setData(data)
  }

  return (
    <>
      <label htmlFor='file-upload' className='file-upload-label'>
        <AiOutlineCloudUpload className='icon' />
        Upload
      </label>
      <CSVReader
        onFileLoaded={handleCSV}
        parserOptions={{
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        }}
        inputName='testing'
        inputStyle={{ display: 'none' }}
        cssClass='csv-input'
        cssLabelClass='testing'
        inputId='file-upload'
      />
    </>
  )
}

export default CollectCSV
