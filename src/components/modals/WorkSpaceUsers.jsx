import React from 'react'
import styled from 'styled-components'

const WorkSpaceUsers = ({ l }) => {
    return (
        <StyledUserListSection>
            <h2>Users on this workspace</h2>
            <StyledUserList>
                <div className='users'>
                    <h5>julia roberts</h5>
                    <figure>
                        <img src="/images/cypher_moon.png" alt="profile" />
                    </figure>
                    <button>message</button>
                </div>

                <div className='users'>
                    <h5>julia roberts</h5>
                    <figure>
                        <img src="/images/cypher_moon.png" alt="profile" />
                    </figure>
                    <button>message</button>
                </div>

                <div className='users'>
                    <h5>julia roberts</h5>
                    <figure>
                        <img src="/images/cypher_moon.png" alt="profile" />
                    </figure>
                    <button>message</button>
                </div>

            </StyledUserList>
        </StyledUserListSection>
    )
}

const StyledUserListSection = styled.section`
    background-color:white;
    width:90%;
    max-width:600px;
    border-radius: 20px;
    padding: 1em;
    
    & > * + * {
        margin-top:1.75em;
    }

    h2{
        color: #222;
        font-weight:500;
        text-transform: capitalize;
    }
`

const StyledUserList = styled.div`
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-auto-rows:1fr;
    gap:1.2em;

    div.users{
        padding:.5em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items:center;
        border:1px solid #eee;
        border-radius:15px;
        box-shadow: 0px 1px 1px rgba(0,0,0,0.2);

        /*spacing between children*/
        & > * + *{
            margin-top: .9em;
        }    

        h5{
            font-size:1.1rem;
            font-weight:500;
            text-align:center;
        }

        img{
            width:50px;
            height:auto;
            object-fit:contain;
        }

        button{
            background-color: #C58DC3;
            border-radius:8px;
            color: white;
            padding:.3em .5em;
            font-size:.8rem;
            font-weight:500;
            width:100%;
            cursor:pointer;
        }
    }
`

export default WorkSpaceUsers