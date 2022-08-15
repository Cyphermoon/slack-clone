import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

const ChannelLoaders = () => {
    const numOfTimes = [...Array(3)]
    return (
        <StyledChannelLoaders>
            {
                numOfTimes.map(() => <Skeleton baseColor='#787878' width={`60%`} height={5} />)
            }
        </StyledChannelLoaders>
    )
}

const StyledChannelLoaders = styled.div`
    width:100%;

    & > * + *{
        margin-top:.5em;
    }

`

export default ChannelLoaders