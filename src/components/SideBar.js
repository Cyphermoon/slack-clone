import { Add, Chat, Drafts, ExpandLess, ExpandMore, Inbox } from '@mui/icons-material'
import { collection, doc, setDoc } from 'firebase/firestore'
import styled from 'styled-components'
import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { db } from '../firebase'
import SideBarHeader from './SideBarHeader'
import SideBarOption from './SideBarOption'
import { useDispatch, useSelector } from 'react-redux'
import { roomActions } from '../store/room_slice'
import PromptModal from './modals/PromptModal'
import { useModal } from '../hooks/util.hook'
import ChannelLoaders from './loaders/ChannelLoaders'
import { chatContextActions } from '../store/chat_slice'
import DirectMessageList from './DirectMessageComponent/DirectMessageList'
import SideBarDropDown from './SideBarDropDown'

const SideBar = () => {
    const workSpaceId = useSelector((state) => state.workspace.activeId)
    const { modalDisplayed, closeModal, openModal } = useModal()
    const [workSpaceDetails, workSpaceLoading] = useDocument(doc(db, "workspace", workSpaceId))
    const [data, loading] = useCollection(collection(db, "workspace", workSpaceId, "rooms"))

    const navOpened = useSelector(state => state.navState.isOpen)


    const dispatch = useDispatch()

    const addChannels = async (channelName) => {
        if (channelName) {
            const roomsRef = collection(db, "workspace", workSpaceId, "rooms");

            await setDoc(doc(roomsRef), {
                name: channelName
            })
        }
    }

    const selectChannel = (id) => {
        dispatch(roomActions.selectChannel({ id }))
        dispatch(chatContextActions.selectChatContext({ chatContextMode: "roomChat" }))
    }

    return (
        <StyledSideBar className={navOpened && "opened"}>
            <SideBarHeader workSpaceName={!workSpaceLoading && workSpaceDetails.data().name} />
            <SideBarOption title={"Threads"} Icon={Chat} disabled={true} />
            <SideBarOption title={"Saved Items"} Icon={Drafts} disabled={true} />
            <SideBarOption title={"Mentions & Reactions"} Icon={Inbox} disabled={true} />

            <SideBarOption title={"Show More"} Icon={ExpandMore} disabled={true} />
            {/* <hr />
            <SideBarOption title={"Channels"} Icon={ExpandMore} disabled={true} />
            <hr /> */}

            <SideBarDropDown headerTitle={"Channels"} openIcon={ExpandLess} closeIcon={ExpandMore}>

                <div className='channels_group'>
                    {loading ? <ChannelLoaders /> :
                        (
                            data.docs.map((doc) =>
                                <SideBarOption
                                    small={true}
                                    key={doc.id}
                                    id={doc.id}
                                    title={doc.data().name}
                                    handleClick={(docId) => selectChannel(docId)} />)
                        )}
                    <SideBarOption small={true} title={"Add Channel"} Icon={Add} handleClick={() => openModal()} />
                </div>
            </SideBarDropDown>

            <DirectMessageList />

            {modalDisplayed &&
                <PromptModal
                    onClose={closeModal}
                    message={"What is the channel name"}
                    placeholder="Enter a channel name"
                    onSuccess={(workSpaceName) => addChannels(workSpaceName)} />}

        </StyledSideBar>
    )
}


const StyledSideBar = styled.section`
    padding-top:calc(${({ theme }) => theme.spacing_top_from_header} + 10px);
    padding-left:15px;
    padding-right:15px;
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
        & > * + *{
            margin-top:.75em;
        }
    }

    @media screen and (max-width:${({ theme }) => theme.breakpoint.sm}){
        background-color:var(--slack-color);
        transition: opacity 200ms linear; 
        width:68vw;
    }
`

export default SideBar