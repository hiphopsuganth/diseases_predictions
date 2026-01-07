import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchWikipediaInfo = ({ disease }) => {
  const [info, setInfo] = useState({ description: '', urls: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.post('http://localhost:5000/fetch-info', { disease });
        setInfo(response.data);
      } catch (error) {
        setError('Failed to fetch information');
        console.error('Error fetching information:', error);
      }
    };

    if (disease) {
      fetchInfo();
    }
  }, [disease]);

  return (
    <div>
      {error && <p>{error}</p>}
      {info.description ? <p><strong>Description:</strong> {info.description}</p> : <p>Fetching description...</p>}
      {info.urls.length > 0 ? (
        info.urls.map((url, index) => <img key={index} src={url} alt={`Disease ${index}`} />)
      ) : (
        <p>Fetching images...</p>
      )}
    </div>
  );
};

export default FetchWikipediaInfo;
