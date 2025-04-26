import { useParams, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './UserReportsContainer.css';
import ResultsContainer from '../ResultsContainer/ResultsContainer.jsx';
import SearchContainer from '../SearchContainer/SearchContainer.jsx';

const UserReportsContainer = ({ user, results, setResults, isNewSearch, setIsNewSearch }) => {
  const { user_id } = useParams();
  const location = useLocation();
  const [reports, setReports] = useState([]);

  const isSearchPage = location.pathname === `/user/${user}`;
  const isSavedPage = location.pathname === `/user/${user}/saved`;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${user}/reports`)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error('Error fetching reports:', err));
  }, [user, isNewSearch]);

  const fetchReportInfo = (reportId) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/reports/${reportId}`)
      .then(res => res.json())
      .then(data => {
        console.log("fetchReportInfo data: ", data);
        if (data.length === 0) {
          setResults(null);
        } else {
          setResults(data);
          setIsNewSearch(false);
        }
      });
  };

  return (
    <div className="user-reports">
      <nav>
        <NavLink to={`/user/${user}`} end className="nav">Search</NavLink>
        <NavLink to={`/user/${user}/saved`} className="nav">Saved Reports</NavLink>
        <NavLink to="/" className="nav">Log out</NavLink>
      </nav>

      <div className="user-content">
        {isSearchPage && (
          <>
            <SearchContainer user={user} setResults={setResults} isNewSearch={isNewSearch} setIsNewSearch={setIsNewSearch} />
            <ResultsContainer user={user} results={results} isNewSearch={isNewSearch} setIsNewSearch={setIsNewSearch} />
          </>
        )}

        {isSavedPage && (
          <div className='reportsContainer'>
            <h2>User ID {user}'s Reports</h2>
            <div className='buttonList'>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <button key={report.id} onClick={() => fetchReportInfo(report.id)}>
                    {report.nickname}
                  </button>
                ))
              ) : (
                <p>No saved reports.</p>
              )}
            </div>
            <ResultsContainer user={user} results={results} isNewSearch={isNewSearch} setIsNewSearch={setIsNewSearch} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReportsContainer;
