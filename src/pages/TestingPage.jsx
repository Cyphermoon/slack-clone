import React from 'react'
import WorkSpaceUserList from '../components/modals/WorkSpaceUserList'

const workSpaceUsers = [
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
    {
        data() {
            return {
                name: "kelvin",
                photoUrl: "#",
                email: "kelvin@scale.com"
            }
        }
    },
]

const TestingPage = () => {
    return (
        <div>
            <WorkSpaceUserList
                loading={false}
                workSpaceUsers={workSpaceUsers}
                handleUserClicked={() => 1} />
        </div>
    )
}


export default TestingPage