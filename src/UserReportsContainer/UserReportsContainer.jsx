import { useParams, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './UserReportsContainer.css';
import ResultsContainer from '../ResultsContainer/ResultsContainer.jsx';
import SearchContainer from '../SearchContainer/SearchContainer.jsx';

const UserReportsContainer = ({ results, setResults }) => {
  const { user_id } = useParams();
  const location = useLocation();
  const [reports, setReports] = useState([]);

  const isSearchPage = location.pathname === `/user/${user_id}`;
  const isSavedPage = location.pathname === `/user/${user_id}/saved`;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${user_id}/reports`)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error('Error fetching reports:', err));
  }, [user_id]);

  const fetchReportInfo = (reportId) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/reports/${reportId}`)
      .then(res => res.json())
      .then(data => {
        console.log("fetchReportInfo data: ", data);
        if (data.length === 0) {
          setResults(null);
        } else {
          setResults(data);
        }
      });
  };

  return (
    <div className="user-reports">
      <nav>
        <NavLink to={`/user/${user_id}`} end className="nav">Search</NavLink>
        <NavLink to={`/user/${user_id}/saved`} className="nav">Saved Reports</NavLink>
        <NavLink to="/" className="nav">Log out</NavLink>
      </nav>

      <div className="user-content">
        {isSearchPage && (
          <>
            <SearchContainer user={user_id} setResults={setResults} />
            <ResultsContainer user={user_id} results={results} />
          </>
        )}

        {isSavedPage && (
          <div className='reportsContainer'>
            <h2>User ID {user_id}'s Reports</h2>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReportsContainer;