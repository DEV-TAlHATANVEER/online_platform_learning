import React from 'react';

function VideoDisplay({ videolink }) {
  // Convert normal YouTube link to embed format
  const getEmbedUrl = (url) => {
    if (!url) return '';
    return url.replace("watch?v=", "embed/");
  };

  const embedUrl = getEmbedUrl(videolink);

  return (
    <div className="flex justify-center my-4">
      <iframe
        width="1000"
        height="300"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-xl shadow-lg"
      ></iframe>
    </div>
  );
}

export default VideoDisplay;
