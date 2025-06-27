import { useState } from 'react';
// import axios from 'axios';
import axios from 'axios';
function App() {
  const [detail, setdetail] = useState(null);
  const [repo, setrepo] = useState([]);
  const [user, setuser] = useState('');
  const [show, setshow] = useState(false);

  const handleSearch = () => {
    if (user.trim() === '') return;

    // Fetch user detail
    axios.get(`https://api.github.com/users/${user}`)
      .then(res => {
        setdetail(res.data);
        setshow(true);
      })
      .catch(err => {
        console.log(err);
        setshow(false); // hide old data if error
      });

    // Fetch repos
    axios.get(`https://api.github.com/users/${user}/repos`)
      .then(res => setrepo(res.data))
      .catch(err => console.log(err));

     setuser('') 
  };

  return (
    <div className='git'>
      <div className="top">
        <input
          type='text'
          value={user}
          placeholder="Enter GitHub username"
          onChange={(e) => setuser(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {show &&
        <div className='all'>
          <div className='first'>
            <img src={detail.avatar_url} alt="avatar" />
            <div className='left'>
              <p>{detail.login}</p>
              <p>{detail.bio ? detail.bio : 'No bio added'}</p>
            </div>
          </div>

          <div className="follow">
            <p>Followers: {detail.followers}</p>
            <p>Following: {detail.following}</p>
          </div>

          <h5>Repositories:</h5>
          {repo.map(m => (
            <div className='rep' key={m.id}>
              <ul>
                <li>
                  <a href={m.html_url} target='_blank' rel='noreferrer'>
                    {m.name}
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default App;
