import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import styled from "styled-components";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const request = await axios.get(requests.fetchNowPlaying);

    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };

  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          {/* Title */}
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          {/* DIV > 2 BUTTONS */}
          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="banner__button info">
              <div className="space"></div>More Information
            </button>
          </div>
          {/* Description */}
          <h1 className="banner__description">{movie?.overview}</h1>
        </div>
        <div className="banner--fadebottom"></div>
      </header>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <IFrame
            src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
            width="640"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen"
          ></IFrame>
        </HomeContainer>
      </Container>
    );
  }
};

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const IFrame = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
