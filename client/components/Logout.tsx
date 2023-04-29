import { useAuth0 } from "@auth0/auth0-react"

const logoutButton = () => {
    const { logout } = useAuth0()

    return (
        <button onClick={() => logout()}>Log Out</button>
    )
}

export default logoutButton;