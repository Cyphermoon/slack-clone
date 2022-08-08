import { Add, Apps, BookmarkBorder, Chat, Drafts, ExpandLess, ExpandMore, FileCopy, Inbox, PeopleAlt } from '@mui/icons-material'
import { collection, doc, setDoc } from 'firebase/firestore'
import styled from 'styled-components'
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from '../firebase'
import SideBarHeader from './SideBarHeader'
import SideBarOption from './SideBarOption'
import { useDispatch } from 'react-redux'
import { roomActions } from '../store/room_slice'

const SideBar = () => {
    const [data, loading] = useCollection(collection(db, "rooms"))
    const dispatch = useDispatch()

    const addChannels = async () => {
        const channelName = prompt("What is the channel name");

        if (channelName) {
            const roomsRef = collection(db, "rooms");

            await setDoc(doc(roomsRef), {
                name: channelName
            })
        }
    }

    const selectChannel = (id) => {
        dispatch(roomActions.selectChannel({ id }))
    }


    if (loading) return <h1>Loading</h1>

    return (
        <StyledSideBar>
            <SideBarHeader />
            <SideBarOption title={"Threads"} Icon={Chat} />
            <SideBarOption title={"Saved Items"} Icon={Drafts} />
            <SideBarOption title={"Mentions & Reactions"} Icon={Inbox} />
            <SideBarOption title={"Channel Browser"} Icon={BookmarkBorder} />
            <SideBarOption title={"People & user groups"} Icon={PeopleAlt} />
            <SideBarOption title={"Apps"} Icon={Apps} />
            <SideBarOption title={"File browser"} Icon={FileCopy} />
            <SideBarOption title={"Show More"} Icon={ExpandLess} />
            <hr />
            <SideBarOption title={"Channels"} Icon={ExpandMore} />
            <hr />
            <SideBarOption title={"Add Channel"} Icon={Add} handleClick={addChannels} />

            <div className='channels_group'>
                {
                    data.docs.map((doc) =>
                        <SideBarOption
                            key={doc.id}
                            id={doc.id}
                            title={doc.data().name}
                            handleClick={(docId) => selectChannel(docId)} />)
                }
            </div>

        </StyledSideBar>
    )
}

const StyledSideBar = styled.section`
    width:100%;
    max-width:250px;
    padding-top:80px;
    padding-left:15px;
    padding-right:10px;
    padding-bottom:50px;
    background-color:var(--slack-color);
    height:100%;
    overflow-y:scroll;

    hr{
       border:1px solid #49274b;
        outline:none
      }

    & > * + * {
        margin-top:2em;
    }

    .channels_group{
        margin-top:1em;
        // padding-left:.7em;

        & > * + *{
            margin-top:.75em;
        }
    }
`

export default SideBar