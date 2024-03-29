import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import styled from 'styled-components';

const MessageSkeletons = () => {
    const numOfTimes = [...Array(5)]
    return (
        <StyledMessageSkeletons>
            {
                numOfTimes.map((num, idx) => {
                    return (
                        <div key={idx}>
                            <div className='info_group' >
                                <Skeleton circle={true} width={40} height={40} />
                                <Skeleton width={115} height={20} />

                            </div>
                            <Skeleton width={`100%`} height={20} />
                        </div>
                    )
                })
            }



        </StyledMessageSkeletons>

    )
}

const StyledMessageSkeletons = styled.div`
    width:95%;
    max-width:160px;
    position:relative;
    z-index:-1;

    & > * + *{
        margin-top:2em;
    }

    .info_group{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:.2em;
    }

`

export default MessageSkeletons