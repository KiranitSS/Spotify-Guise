import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/constants";
import styled from "styled-components";

export default function Playlists() {
    const [{ token, playlists }, dispatch] = useStateProvider();
    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-type": "application/json",
                }
            });
            const { items } = response.data;
            const playlists = items.map(({ name, id }) => {
                return { name, id };
            });

            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
        }
        if (token) {
            getPlaylistData();
        }
    }, [token, dispatch]);
    const changeCurrentPlaylist = async (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
    }
    return (
        <Container>
            <ul>
                {
                    playlists.map(({ name, id }) => {
                        return <li key={id} onClick={() => changeCurrentPlaylist(id)}>
                            {name}
                        </li>
                    })
                }
            </ul>
        </Container>
    );
}

const Container = styled.div`
height: 100%;
overflow: hidden;
ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto; 
    scrollbar-color: transparent transparent;
    &::-webkit-scrollbar{
        width: 0.7rem;
        &-thumb {
            background-color: transparent;
        }
    }
    &:hover {
        scrollbar-color: #b8b8b8 transparent;
        scrollbar-width: thin;
        &::-webkit-scrollbar{
            width: 0.7rem;
            &-thumb {
                background-color: #b8b8b8;
            }
        }
    }

    li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
            color: white;
        }
    }
}
`;