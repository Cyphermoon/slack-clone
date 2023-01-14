import { Add, Apps, BookmarkBorder, Chat, Drafts, ExpandLess, ExpandMore, FileCopy, Inbox, PeopleAlt } from '@mui/icons-material'
import { collection, doc, setDoc } from 'firebase/firestore'
import styled from 'styled-components'
import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { db } from '../firebase'
import SideBarHeader from './SideBarHeader'
import SideBarOption from './SideBarOption'
import { useDispatch, useSelector } from 'react-redux'
import { roomActions } from '../store/room_slice'
import PromptModal from './modals/PromptModal'
import { usePromptModal } from '../hooks/util.hook'
import ChannelLoaders from './loaders/ChannelLoaders'
import { chatContextActions } from '../store/chat_slice'
import DirectMessageList from './DirectMessageComponent/DirectMessageList'
import { useNavContext } from '../context/NavProvider'

const SideBar = () => {
    const workSpaceId = useSelector((state) => state.workspace.activeId)
    const { promptModalDisplayed, closeModal, openPromptModal } = usePromptModal()
    const [workSpaceDetails, workSpaceLoading] = useDocument(doc(db, "workspace", workSpaceId))
    const [data, loading] = useCollection(collection(db, "workspace", workSpaceId, "rooms"))


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

    const { navOpened } = useNavContext()

    return (
        <StyledSideBar className={navOpened && "opened"}>
            <SideBarHeader workSpaceName={!workSpaceLoading && workSpaceDetails.data().name} />
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
            <SideBarOption title={"Add Channel"} Icon={Add} handleClick={() => openPromptModal()} />

            <div className='channels_group'>
                {loading ? <ChannelLoaders /> :
                    (
                        data.docs.map((doc) =>
                            <SideBarOption
                                key={doc.id}
                                id={doc.id}
                                title={doc.data().name}
                                handleClick={(docId) => selectChannel(docId)} />)
                    )}
            </div>

            <DirectMessageList />

            {promptModalDisplayed &&
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
        margin-top:1em;

        & > * + *{
            margin-top:.75em;
        }
    }

    @media screen and (max-width:${({ theme }) => theme.breakpoint.sm}){
       opacity:0;
       transition: opacity 200ms linear;

        &.opened{
           opacity:1;
        }
    }
`

export default SideBar