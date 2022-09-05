import React from 'react'
import styled from 'styled-components'
import logo from '../tribe_market_logo.png'


const Container = styled.div`
    height: 80px;
    background-color: black;


`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex; 
    justify-content: center;
`
const Logo = styled.img`
        height: 100px;
        width: 150px;
`

const Navbar = () => {
  return (
    <Container>
        <Wrapper>
            <Logo src={logo} />
        </Wrapper>
    </Container>
  )
}

export default Navbar