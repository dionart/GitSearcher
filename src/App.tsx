import React, { useState } from "react";
import "./App.css";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER } from "./services/queries";
import {
  ADD_STAR,
  FOLLOW_USER,
  REMOVE_STAR,
  UNFOLLOW_USER,
} from "./services/mutations";
import { UserDataResponse, UserDataVariables } from "./types";

function App() {
  const [getUser, { loading, error, data, refetch: refetchUser }] =
    useLazyQuery<UserDataResponse, UserDataVariables>(GET_USER);
  const [addStar] = useMutation(ADD_STAR);
  const [removeStar] = useMutation(REMOVE_STAR);
  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  const [user, setUser] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getUser({ variables: { login: user, isFork: false } }).then(() =>
      setUser("")
    );
  };

  const handleStarSubmit = (id: string, index: number) => {
    data?.user.repositories.nodes[index].viewerHasStarred
      ? removeStar({ variables: { input: { starrableId: id } } }).then(() =>
          refetchUser()
        )
      : addStar({ variables: { input: { starrableId: id } } }).then(() =>
          refetchUser()
        );
  };

  const handleFollowSubmit = () => {
    data?.user.viewerIsFollowing
      ? unfollowUser({ variables: { input: { userId: data.user.id } } }).then(
          () => refetchUser()
        )
      : followUser({ variables: { input: { userId: data?.user.id } } }).then(
          () => refetchUser()
        );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          className="github-icon"
          src="https://www.nicepng.com/png/full/52-520535_free-files-github-github-icon-png-white.png"
          alt="github-icon"
        />
        <h1 className="title">GitSearcher</h1>

        <form className="row" onSubmit={handleSubmit}>
          <input
            value={user}
            className="search-input"
            onChange={(e) => setUser(e.target.value)}
            placeholder="Search Github User"
          />
          <button className="search-button" type="submit">
            Enter
          </button>
        </form>
        {loading && <p>Loading...</p>}
        {data && (
          <div className="user-info-container">
            <div className="user-info">
              <img
                className="user-image"
                src={data.user.avatarUrl}
                alt="avatar"
              />
              <h2>{data.user.name}</h2>
              <h3>{data.user.bio}</h3>
              <h4>{data.user.email}</h4>
              <h5>{data.user.location}</h5>
              <button onClick={handleFollowSubmit} className="action-button">
                {data.user.viewerIsFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
            <div className="repository-container">
              <h4 className="repository-title">{`Repositories (${data.user.repositories.nodes.length})`}</h4>
              <div className="center">
                <div className="repo-info-container">
                  {data.user.repositories.nodes.map((repo, index) => (
                    <div className="repo-info">
                      <div>
                        <h4>{repo.name}</h4>
                        <a target="_blank" href={repo.url} rel="noreferrer">
                          {repo.url}
                        </a>
                        <p>{repo.description}</p>
                      </div>
                      <button
                        className="action-button"
                        onClick={() => handleStarSubmit(repo.id, index)}
                      >
                        {repo.viewerHasStarred
                          ? "Unstar Project"
                          : "Star Project"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
