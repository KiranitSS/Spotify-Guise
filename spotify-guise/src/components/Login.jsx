import React from "react";
import styled from "styled-components";
import logo from "../assets/Spotify_Logo_Black.png";

export default function Login() {
    const handleClick = () => {
        const clientId = "d77ecfc01a254ddfb96b8926c37e859c";
        const redirectUrl = "http://localhost:3001/";
        const apiUrl = "http://accounts.spotify.com/authorize";
        const scope = [
            "user-read-email",
            "user-read-private",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "user-read-playback-state",
            "user-read-playback-position",
            "playlist-read-private",
            "user-top-read",
            "user-read-recently-played",            
        ];
        alert(`${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
            " "
        )}&response_type=token&show_dialog=true`);
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
            " "
        )}&response_type=token&show_dialog=true`;
    }

    return (
        <Container>
            <img src={logo} alt="spotify" />
            <button onClick={handleClick}>Connect Spotify</button>
            <a href="https://www.spotify.com/us/legal/privacy-policy/">Spotify privacy policy</a>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #1ed760;
    gap: 5rem;
    img {
        height: 20vh;
    }
    button {
        padding: 1rem 5rem;
        border-radius: 5rem;
        border: none;
        background-color: black;
        color: #30e771;
        cursor: pointer;
        font-size: 1.5rem;
    }

    a {
        color: black;
    }
`;