import React from "react";

const Main = ({ Link }) => {
    return (
        <>
            <strong>Main Component</strong>
            <hr />
            <Link to="main">Current Page</Link>
            <br />
            <Link to="room/1">Room 1 Page</Link>
        </>
    );
};

export default React.memo(Main);