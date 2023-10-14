'use client'

import { useEffect, useState } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import Button from '../Button'
import { metaData } from '@/constant/title'
const ffmpeg = createFFmpeg({ log: true })

const GifMaker = () => {
  const [file, setFile] = useState<any>('')
  const [fileName, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>('')

  function handleFileUpload(e: any) {
    if (!fileName) {
      setFileName(e.target.files[0].name)
    }
    setFile(e.target.files?.item(0))
  }

  const load = async () => {
    await ffmpeg.load()
    setIsLoading(false)
  }

  useEffect(() => {
    if (file) {
      setIsLoading(true)
      load()
    }
  }, [file])

  const convertToGif = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    ffmpeg.FS('writeFile', 'text.mp4', await fetchFile(file))

    await ffmpeg.run(
      '-i',
      'text.mp4',
      '-t',
      '2.5',
      '-ss',
      '2.0',
      '-f',
      'gif',
      'out.gif'
    )

    const data = ffmpeg.FS('readFile', 'out.gif')

    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: 'image/gif' })
    )

    setIsLoading(false)
    setResult(url)
  }

  const download = (e: any) => {
    fetch(e.target.href, {
      method: 'GET',
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'image.png') //or any other extension
          document.body.appendChild(link)
          link.click()
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <section className='w-full pt-8 lg:p-8'>
      <form onSubmit={convertToGif}>
        <div className='p-4'>
          <div className=''>
            <input
              required
              className='w-full border-dashed border-2 border-[#1de9b6] rounded-lg p-4'
              type='file'
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <small className='mb-4'>File Size Limit : 50mb</small>

          <div className='flex justify-center items-center mt-4'>
            <Button
              className='w-full'
              type='submit'
              isLoading={!!isLoading}
              disabled={false}
            >
              Convert
            </Button>
          </div>

          {!!result && (
          <div className="mt-8">
            <h4 className='underline mb-4'>Result: </h4>
            <div className="text-center flex justify-center">
              <img src={result} width='90%' />
            </div>

            <div className="mt-4">
              <Button
                type='button'
                isLoading={false}
                disabled={false}
                onClick={() => {}}
                className='w-full'
              >
                <a
                  href={result}
                  onClick={(e: any) => {
                    download(e)
                  }}
                  download
                >
                  Download
                </a>
              </Button>
            </div>
          </div>
        )}

          <div className='mt-8'>
            <h3 className='underline'>About GifMaker:</h3>
            <p>{metaData.content}</p>
          </div>
        </div>
      </form>
    </section>
  )
}

export default GifMaker
