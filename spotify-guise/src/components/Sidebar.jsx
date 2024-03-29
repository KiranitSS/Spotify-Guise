import React from "react";
import styled from "styled-components";
import logo from "../assets/Spotify_Logo_White.png"
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "./Playlists";

export default function Sidebar() {
    return (
        <Container>
            <div className="top_links">
                <div className="logo">
                    <img src={logo} alt="spotify" />
                </div>
                <ul>
                    <li>
                        <MdHomeFilled />
                        <span>Home</span>
                    </li>
                    <li>
                        <MdSearch />
                        <span>Search</span>
                    </li>
                    <li>
                        <IoLibrary />
                        <span>Your library</span>
                    </li>
                </ul>
            </div>
            <Playlists/>
        </Container>
    );
}

const Container = styled.div`
background-color: black;
color: grey;
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
    .top_links{
        display: flex;
        flex-direction: column;
        .logo {
            text-align: center;
            margin: 1rem 0;
            img {
                max-inline-size: 80%;
                block-size: auto;
            }
        }
        ul {
            list-style-type: none;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
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
    }
`;