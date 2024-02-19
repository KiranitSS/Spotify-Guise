import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/constants";

export default function CurrentTrack() {
    const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-type": "application/json",
                }
            });
            console.log(response);
            if (response.data !== "") {
                const { item } = response.data;
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url,
                };
                console.log(currentlyPlaying);
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
            }
        }
        if (token) {
            getCurrentTrack();
        }
    }, [token, dispatch]);

    return (
        <Container>
            {
                currentlyPlaying && (
                    <div className="track">
                        <div className="track_img">
                            <img src={currentlyPlaying.image} alt="currentlyplaying" />
                        </div>
                        <div className="track_info">
                            <h4>{currentlyPlaying.name}</h4>
                            <h6>{currentlyPlaying.artists.join(", ")}</h6>
                        </div>
                    </div>
                )
            }
        </Container>
    )
}

const Container = styled.div`
    .track {
        display: flex;
        align-items: center;
        gap: 1rem;
        &_info {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            h4, h6 {
                color: white;
            }
        }
    }
`; 