import styled from '@emotion/styled'
import { FaArrowLeftLong } from 'react-icons/fa6'
import MainHeader from '../components/nav/Header'
import FreshnessLoadingModal from '../components/modal/FreshnessLoadingModal'
import FreshnessResultModal from '../components/modal/FreshnessResultModal'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from "react-router-dom"

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  max-width: 393px; /* 모바일 최대 폭 */
  margin: 0 auto;
  background: #ffffff;
  min-height: 100vh;
  height: auto;
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
  margin-top: 19px;
  margin: 0 auto;
`

const CameraButton = styled.div`
  margin-top: 11px;
  margin: 0 auto;
  width: 39px;
  height: 39px;
  border-radius: 50px;
  border: 4px solid #1f3906;
  margin-bottom: 100px;
`

const NextButton = styled.div`
  display: flex;
  width: 352px;
  height: 50px;
  box-sizing: border-box;
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

  const videoRef = useRef(null)
  const fileInputRef = useRef(null)
  const streamRef = useRef(null)

  const [capturedBlob, setCapturedBlob] = useState(null)
  const [previewURL, setPreviewURL] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [resultLabel, setResultLabel] = useState('')

  const location = useLocation()
  const productId = location.state?.productId

  const qs = new URLSearchParams({ is_main: 'true', run_ai: 'true' }).toString()
  const API_UPLOAD_URL = `${import.meta.env.VITE_API_URL}/api/seller/product/${productId}/images?${qs}`

  async function uploadPlantPhoto(file, { endpoint, token }) {
    const safeFile =
      file instanceof File
        ? file
        : new File([file], "photo.jpg", { type: "image/jpeg" })
  
    const formData = new FormData()
    formData.append("file", safeFile, safeFile.name) // 세 번째 인자로 파일명 강제
  
    // 디버깅 로그
    for (let [key, val] of formData.entries()) {
      console.log(`FormData key=${key}, name=${val.name}, type=${val.type}`)
    }
  
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
      },
      body: formData,
    })
  
    const json = await res.json().catch(() => null)
  
    if (!res.ok || !json?.success) {
      throw new Error(json?.message || `HTTP ${res.status}`)
    }
  
    return json
  }
  
  


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
        // 실패 시 파일 인풋 폴백
        console.warn('getUserMedia 실패 → 파일 인풋 폴백', err)
      }
    })()
    return () => {
      stopped = true
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
  }, [])


  /* 촬영 (가능하면 비디오 캡처, 아니면 파일 인풋 오픈) */
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
        canvas.toBlob(resolve, 'image/jpeg', 0.9) // JPEG으로 추출
      )
      if (!blob) {
        alert('이미지 캡처 실패')
        return
      }
  
      // 👇 File 객체로 변환 (확장자/타입 지정)
      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' })
  
      setCapturedBlob(file)
      setPreviewURL(URL.createObjectURL(file))
  
      // 발열/배터리 고려해 정지(계속 미리보기 유지하려면 주석 처리)
      streamRef.current?.getTracks().forEach(t => t.stop())
    } else {
      // 폴백: 기본 파일 선택(카메라/앨범) 열기
      fileInputRef.current?.click()
    }
  }
  

    /* 파일 인풋 폴백 */
    const onFileChange = (e) => {
      const f = e.target.files?.[0]
      if (!f) return
      setCapturedBlob(f)
      setPreviewURL(URL.createObjectURL(f))
    }



  /* 업로드 + 결과 모달 */
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
        fileField: 'file', // 스웨거 스펙
      })

      if (!json?.success) throw new Error(json?.message || '업로드 실패')
      
        console.log('✅ 업로드 성공 응답:', json)

      // 신선도 라벨 추출 (예시 응답 구조)
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
        <p
          style={{
            fontSize: '12px',
            color: '#808080',
            margin: '0',
            paddingTop: '14px',
          }}
        >
          step.2
        </p>
        <p
          style={{
            fontSize: '24px',
            letterSpacing: '-0.96px',
            margin: '0',
          }}
        >
          상품의 사진을 촬영해주세요
        </p>
        <p
          style={{
            fontSize: '16px',
            color: '#808080',
            margin: 0,
          }}
        >
          촬영한 사진을 통해 신선도를 판별해드릴게요!
        </p>
        <CameraWraaper>
          <CameraContainer>
            {previewURL ? (
                <img
                src={previewURL}
                alt="preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <video
                ref={videoRef}
                playsInline
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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

       {/* 모달들 조건부 렌더링 */}
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
