import React, { useState, useEffect, useRef } from "react";
import Cart from "../Cart/Cart";
import gamesData from "../../../Assets/jsone/Search.json"; // مسیر فایل JSON
import "./GameList.scss"; // استایل مخصوص

const GameList = () => {
  const [displayedGames, setDisplayedGames] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [savedGames, setSavedGames] = useState({});
  const gamesPerLoad = 6;
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    setDisplayedGames(gamesData.slice(0, gamesPerLoad));
    setHasMore(gamesData.length > gamesPerLoad);
  }, []);

  const handleSave = (id) => {
    setSavedGames((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const loadMoreGames = () => {
    const nextGames = gamesData.slice(
      displayedGames.length,
      displayedGames.length + gamesPerLoad
    );
    setDisplayedGames((prev) => [...prev, ...nextGames]);
    setHasMore(displayedGames.length + nextGames.length < gamesData.length);
  };

  useEffect(() => {
    if (!hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreGames();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current && observerRef.current) {
        observerRef.current.unobserve(loadMoreRef.current);
      }
    };
  }, [displayedGames, hasMore]);

  return (
    <div className="game-list">
      <div className="cards-container">
        {displayedGames.map((game) => (
          <Cart
            key={game.id}
            id={game.id}
            name={game.Title}
            genre={game.Genre}
            poster={game.Poster}
            savegame={savedGames[game.id] || game.SaveGame}
            onSave={handleSave}
          />
        ))}
      </div>
      {hasMore && (
        <div ref={loadMoreRef} className="loading">
          در حال بارگذاری...
        </div>
      )}
    </div>
  );
};

export default GameList;
