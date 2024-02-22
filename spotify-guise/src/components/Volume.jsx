import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/constants";

export default function PlayerControls() {
    const [{ token }] = useStateProvider();
    const isAccountPremium = async () => {
        const response = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: "Bearer " + token,
                "Content-type": "application/json",
            }
        });
        return response.data.product === "premium";
    }
    const setVolume = async (e) =>  {
        if (await isAccountPremium()) {
            await axios.put(`https://api.spotify.com/v1/me/player/volume?volume_percent=${e.target.value}`, {}, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-type": "application/json",
                }
            });
        } else {
            alert("Spotify premium required.");
        }
    }
    return (
        <Container>
            <input type="range" min={0} max={100} onMouseUp={(e => setVolume(e))} />
        </Container>
    )
}

const Container = styled.div`
display: flex;
justify-content: flex-end;
align-content: center;
margin-right: 2rem;
input {
    border-radius: 2rem;
    width: 15rem;
    height: 0.5rem;  
}
`;