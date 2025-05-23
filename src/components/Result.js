import React, { useEffect, useState } from "react";
import axios from "axios";

function Result({ style, onRestart }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchYouTube = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              key: process.env.REACT_APP_YOUTUBE_KEY,
              q: `${style} dance tutorial`,
              part: "snippet",
              maxResults: 3,
            },
          }
        );
        setVideos(res.data.items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchYouTube();
  }, [style]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-green-600">
        Stil recomandat: {style}
      </h2>
      <h3 className="text-xl mb-4 text-center">Tutoriale YouTube:</h3>
      <div className="grid md:grid-cols-2 gap-6 justify-items-center">
        {videos.map((video) => (
          <div key={video.id.videoId} className="w-full max-w-md">
            <h4 className="text-md font-semibold mb-1">{video.snippet.title}</h4>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                title={video.snippet.title}
                width="100%"
                height="250"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                allowFullScreen
                className="rounded-md shadow"
              ></iframe>
            </div>
          </div>
        ))}
      </div>

      {/* Buton Reia Testul */}
      <button className="answer-button" onClick={onRestart}>
        Reia testul
      </button>
    </div>
  );
}

export default Result;
