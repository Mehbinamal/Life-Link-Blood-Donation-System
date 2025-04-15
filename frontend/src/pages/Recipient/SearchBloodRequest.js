import React, { useState } from 'react';
import axios from 'axios';
import './SearchBloodRequest.css';
import SearchResult from './SearchResult'; // make sure the path is correct

function SearchBloodRequest() {
    const [id, setId] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/recipient/searchBloodRequest', { id });
            setResult(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setId('');
        setResult(null);
        setError('');
    };

    return (
        <div className="update-container">
            {!result ? (
                <div className="update-form">
                    <h2 className="title">Search Blood Request</h2>
                    <label htmlFor="requestId">Enter Request ID</label>
                    <input
                        id="requestId"
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="Enter Blood Request ID"
                    />
                    <button
                        className="update-btn"
                        onClick={handleSearch}
                        disabled={loading || id.trim() === ''}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            ) : (
                <SearchResult data={result} onGoBack={handleBack} />
            )}
        </div>
    );
}

export default SearchBloodRequest;
