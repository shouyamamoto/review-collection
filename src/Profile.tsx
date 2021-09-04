import React from 'react'
import { selectUser } from "./features/users/userSlice"
import { useSelector } from "react-redux"
import { IconContext } from 'react-icons'
import { AiFillGithub, AiOutlineLink } from "react-icons/ai"
import { FaTwitter } from "react-icons/fa"
import styled from "styled-components"
import { COLOR } from "./Themes/Color"

export const Profile = () => {
  const user = useSelector(selectUser)

  return (
    <>
    <StyledProfile>
      <StyledProfileInner>
      <StyledIcon src={user.photoUrl} alt="" width="120" height="120"/>
      <div>
        <StyledName>{user.displayName}</StyledName>
        <StyledIntro>{user.intro ? user.intro : "私はこんなものです。私はこんなものです。私はこんなものです。私はこんなものです。"}</StyledIntro>
        <StyledLinkLists>
          <StyledLinkItems><IconContext.Provider value={{ color: '#ccc', size: '24px' }}><AiFillGithub /></IconContext.Provider></StyledLinkItems>
          <StyledLinkItems><IconContext.Provider value={{ color: '#ccc', size: '24px' }}><FaTwitter /></IconContext.Provider></StyledLinkItems>
          <StyledLinkItems><IconContext.Provider value={{ color: '#ccc', size: '24px' }}><AiOutlineLink /></IconContext.Provider></StyledLinkItems>
        </StyledLinkLists>
      </div>
      </StyledProfileInner>
    </StyledProfile>

    <StyledPosts>

    </StyledPosts>
    </>
  )
}

const StyledIcon = styled.img`
  border-radius: 50%;
  margin-right: 40px;
`

const StyledProfile = styled.div`
  display: flex;
  align-items: center;
`

const StyledProfileInner = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  height: 280px;
`

const StyledIntro = styled.p`
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 14px;
`

const StyledName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`

const StyledLinkLists = styled.ul`
  display: flex;
`

const StyledLinkItems = styled.li`
  margin-right: 10px;
`

const StyledPosts = styled.div`
  background-color: ${COLOR.BACKGROUND};
  height: 1000px;
`