import React from 'react'
import styled from 'styled-components/macro'
import { Link as UnstyledLink, RouteComponentProps } from '@reach/router'

const Header: React.FC<RouteComponentProps> = () => (
  <HeaderContainer>
    <Heading className="heading">The Wendtes</Heading>
    <Links className="links">
      <Link to="/">Home</Link>
      <Link to="/about-us">About Us</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/photos">Photos</Link>
    </Links>
  </HeaderContainer>
)
export default Header

const Heading = styled.h1`
  display: inline-block;
  color: ${props => props.theme.white};
`
const HeaderContainer = styled.header`
  background: ${props => props.theme.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
`
const Links = styled.div`
  display: inline-block;
  font-size: 2.4rem;
`
const Link = styled(UnstyledLink)`
  display: inline-block;
  padding-left: 2rem;
  font-size: 2.4rem;
  font-weight: 500;
  color: ${props => props.theme.white};
`
