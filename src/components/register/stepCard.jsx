import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const RegisterBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 352px;
  height: 78px;
  border-radius: 24px;
  background: #f0f0f0;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 13px;
  box-sizing: border-box;
  gap: 23px;
  cursor: pointer;
`

const StepIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: cover;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
`

const StepTitle = styled.div`
  color: #000;
  font-size: 16px;
`

const StepDescription = styled.div`
  color: #000;
  font-size: 11px;
  display: -webkit-box; /* 고정 높이 대응 */
  -webkit-line-clamp: 2; /* 2줄까지 보이고 말줄임 */
  -webkit-box-orient: vertical;
  overflow: visible;
  white-space: normal;
`

export default function StepCard({ iconSrc, title, description, onClick }) {
  return (
    <RegisterBox onClick={onClick}>
      <StepIcon src={iconSrc} alt={`${title} 아이콘`} />
      <Content>
        <StepTitle>{title}</StepTitle>
        <StepDescription>{description}</StepDescription>
      </Content>
    </RegisterBox>
  )
}

StepCard.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
