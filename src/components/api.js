import React,{useState} from 'react'

export const Api = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
  
    const handleChange = (e) => {
      setUsername(e.target.value);
    };
  
    const fetchGitHubUser = async (username) => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUserData(data);
        setError(null);
      } catch (err) {
        setUserData(null);
        setError(err.message);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await fetchGitHubUser(username);
    };
  
    return (
      <div style={{ padding: '16px', maxWidth: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
            <h2>GitHub User Information</h2>
          <input
            type="text"
            value={username}
            onChange={handleChange}
            placeholder="Enter GitHub username"
            style={{
              padding: '8px',
              marginBottom: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '8px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Search
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {userData && (
          <div
            style={{
              border: '1px solid #ccc',
              padding: '16px',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                marginBottom: '16px',
              }}
            />
            <p><strong>Username:</strong> {userData.login}</p>
            <p><strong>Id:</strong> {userData.id}</p>
            <p><strong>URL:</strong> {userData.url}</p>
            <p><strong>Public repos:</strong> {userData.public_repos}</p>
          </div>
        )}
      </div>
      
    );
}