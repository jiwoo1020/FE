import styled from '@emotion/styled'
import { FaArrowLeftLong } from 'react-icons/fa6'
import MainHeader from '../components/nav/Header'
import FreshnessLoadingModal from '../components/modal/FreshnessLoadingModal'
import FreshnessResultModal from '../components/modal/FreshnessResultModal'
import { useNavigate, useLocation } from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react'

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  max-width: 393px;
  margin: 0 auto;
  background: #ffffff;
  overflow-y: auto;
`

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding-left: 17px;
  box-sizing: border-box;
`

const CameraContainer = styled.div`
  width: 280px;
  height: 280px;
  background-color: aliceblue;
  margin: 0 auto;
`

const CameraButton = styled.div`
  width: 39px;
  height: 39px;
  border-radius: 50px;
  border: 4px solid #1f3906;
  margin: 11px auto 100px;
  cursor: pointer;
`

const NextButton = styled.div`
  display: flex;
  width: 352px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #1f3906;
  color: white;
  cursor: pointer;
`

const CameraWraaper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: -17px;
  margin-top: 19px;
`

export default function ProductRegisterImage() {
  const navigate = useNavigate()
  const location = useLocation()
  const productId = location.state?.productId

  const videoRef = useRef(null)
  const fileInputRef = useRef(null)
  const streamRef = useRef(null)

  const [capturedBlob, setCapturedBlob] = useState(null)
  const [previewURL, setPreviewURL] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [resultLabel, setResultLabel] = useState('')

  const qs = new URLSearchParams({ is_main: 'true', run_ai: 'true' }).toString()
  const API_UPLOAD_URL = `${import.meta.env.VITE_API_URL}/api/seller/product/${productId}/images?${qs}`

  useEffect(() => {
    if (!productId) {
      alert('상품 등록 정보가 없습니다.')
      navigate('/product/register/text')
    }
  }, [productId])

  useEffect(() => {
    let stopped = false
    ;(async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        })
        if (stopped) {
          s.getTracks().forEach(t => t.stop())
          return
        }
        streamRef.current = s
        if (videoRef.current) {
          videoRef.current.srcObject = s
          await videoRef.current.play()
        }
      } catch (err) {
        console.warn('getUserMedia 실패 → 파일 인풋 폴백', err)
      }
    })()
    return () => {
      stopped = true
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
  }, [])

  const handleCaptureClick = async () => {
    const video = videoRef.current
    if (video && video.readyState >= 2) {
      const targetW = 1280
      const ratio = video.videoHeight / video.videoWidth || 1
      const canvas = document.createElement('canvas')
      canvas.width = targetW
      canvas.height = Math.round(targetW * ratio)
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const blob = await new Promise(resolve =>
        canvas.toBlob(resolve, 'image/jpeg', 0.7)
      )
      if (!blob) {
        alert('이미지 캡처 실패')
        return
      }

      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' })

      setCapturedBlob(file)
      setPreviewURL(URL.createObjectURL(file))

      streamRef.current?.getTracks().forEach(t => t.stop())
    } else {
      fileInputRef.current?.click()
    }
  }

  const onFileChange = e => {
    const f = e.target.files?.[0]
    if (!f) return
    setCapturedBlob(f)
    setPreviewURL(URL.createObjectURL(f))
  }

  async function uploadPlantPhoto(file, { endpoint, token }) {
    const safeFile =
      file instanceof File
        ? file
        : new File([file], 'photo.jpg', { type: 'image/jpeg' })

    const formData = new FormData()
    formData.append('file', safeFile, safeFile.name)


    console.log('⬆️ Uploading to:', endpoint)
    console.log('⬆️ File info:', {
      name: safeFile.name,
      type: safeFile.type,
      sizeMB: (safeFile.size / 1024 / 1024).toFixed(2),
    })
    console.log('⬆️ Headers:', {
      Accept: 'application/json',
      Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`,
    })

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`,
      },
      body: formData,
    })

    const json = await res.json().catch(() => null)

    if (!res.ok || !json?.success) {
      throw new Error(json?.message || `HTTP ${res.status}`)
    }

    return json
  }

  const handleNextClick = async () => {
    if (!capturedBlob) {
      alert('사진을 먼저 촬영해 주세요.')
      return
    }
    setIsLoading(true)
    try {
      const token = (localStorage.getItem('token') || '').trim()
      const json = await uploadPlantPhoto(capturedBlob, {
        endpoint: API_UPLOAD_URL,
        token,
        fileField: 'file',
      })

      if (!json?.success) throw new Error(json?.message || '업로드 실패')

      console.log('✅ 업로드 성공 응답:', json)

      const label =
        json?.data?.product?.freshness?.label ??
        json?.data?.product?.freshness?.grade ??
        '결과 없음'
      setResultLabel(label)
      setShowResultModal(true)
    } catch (e) {
      console.error(e)
      alert('이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <MainHeader />
      <MainContainer>
        <p style={{ fontSize: '12px', color: '#808080', margin: 0, paddingTop: '14px' }}>
          step.2
        </p>
        <p style={{ fontSize: '24px', letterSpacing: '-0.96px', margin: 0 }}>
          상품의 사진을 촬영해주세요
        </p>
        <p style={{ fontSize: '16px', color: '#808080', margin: 0 }}>
          촬영한 사진을 통해 신선도를 판별해드릴게요!
        </p>

        <CameraWraaper>
          <CameraContainer>
            {previewURL ? (
              <img
                src={previewURL}
                alt="preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <video
                ref={videoRef}
                playsInline
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </CameraContainer>
        </CameraWraaper>

        <CameraButton onClick={handleCaptureClick} aria-label="촬영" />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onFileChange}
          style={{ display: 'none' }}
        />

        <NextButton onClick={handleNextClick}>
          {isLoading ? '분석 중…' : '다음 단계'}
        </NextButton>
      </MainContainer>

      {isLoading && <FreshnessLoadingModal />}
      {showResultModal && (
        <FreshnessResultModal
          grade={resultLabel}
          onNext={() => navigate('/freshness')}
        />
      )}
    </Container>
  )
}
