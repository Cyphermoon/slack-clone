import React from 'react'
import styled from 'styled-components'

const LoadingScreen = () => {
    return (
        <StyledLoadingScreen>
            <div className='loading_content'>
                <img src="/images/slack_logo.png" alt='slack logo' />
            </div>
        </StyledLoadingScreen>
    )
}

const StyledLoadingScreen = styled.section`
    height:100vh;
    display:grid;
    place-items:center;

    img{
        aspect-ratio:1 / 1;
        width:200px;
        animation: rotate 5s linear infinite;
    }

    @keyframes rotate{
        from{
            transform:rotate(0deg);
        }

        to{
            transform:rotate(360deg);
        }
    }

`

export default LoadingScreen