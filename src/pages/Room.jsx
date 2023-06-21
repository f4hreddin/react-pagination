import { memo } from "react"

const Room = ({ params, Link }) => {
    return (
        <>
            <strong>Room Component</strong>
            <hr />
            <Link to="main">Main Page</Link>
            <br />
            <p>Room ID: {JSON.stringify(params)}</p>
        </>
    )
}

export default memo(Room)