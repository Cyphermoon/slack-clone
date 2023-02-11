import { Close } from '@mui/icons-material'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import BackgroundOverlay from '../common/BackgroundOverlay'


const WorkSpaceUserList = ({ loading, workSpaceUsers, handleUserClicked, closeModal }) => {
    // This component displays a list of user in the current workspace


    if (!workSpaceUsers) return <p>WorkSpace is empty</p>

    return ReactDOM.createPortal(
        <>
            <BackgroundOverlay >
                <StyledUserListSection>
                    <StyledUserListHeader>
                        <h2>Users on this app</h2>
                        <button onClick={closeModal}>
                            <Close />
                        </button>
                    </StyledUserListHeader>
                    <StyledUserList>

                        {loading && <p>Loading....</p>}

                        {!loading &&
                            workSpaceUsers.map((workSpaceUser, idx) => {
                                let workSpaceUserData = workSpaceUser.data()
                                return <div className='users' key={`workspace-user-${idx}`}>
                                    <h5>{workSpaceUserData.name}</h5>
                                    <figure>
                                        <img src={workSpaceUserData.photoUrl} alt="profile" />
                                    </figure>
                                    <button onClick={() => handleUserClicked(workSpaceUserData.email)}>message</button>
                                </div>
                            }
                            )
                        }

                    </StyledUserList>
                </StyledUserListSection>
            </BackgroundOverlay>
        </>
        , document.getElementById("portal"))
}


const StyledUserListHeader = styled.div`
    display:flex;
    justify-content:space-between;
    align-items: center;

    h2{
        color: #222;
        font-weight:500;
        text-transform: capitalize;
    }

    button {
        color:red;
        background-color:transparent;
        cursor:pointer;
    }
`

const StyledUserListSection = styled.section`
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    z-index:2;
    background-color:white;
    width:90%;
    max-width:600px;
    border-radius: 20px;
    padding: 1em;
    
    & > * + * {
        margin-top:1.75em;
    }
`

const StyledUserList = styled.div`
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-auto-rows:1fr;
    gap:1.2em;
    max-height:400px;
    overflow-y: scroll;

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
            font-weight:400;
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

export default WorkSpaceUserList