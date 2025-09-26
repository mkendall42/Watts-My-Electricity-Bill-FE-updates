import { useParams, NavLink, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './UserReportsContainer.css';
import ResultsContainer from '../ResultsContainer/ResultsContainer.jsx';
import SearchContainer from '../SearchContainer/SearchContainer.jsx';
import SavedReportsContainer from '../SavedReportsContainer/SavedReportsContainer.jsx';

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

  //NOTES: this could use some reorganizing.  Things to do:
  //(DONE) 1. Change to basic correct nav rending / consistency with other pages
  //(DONE) 2. Remove double-rendering (I think?) of ResultsContainer
  //3. Maybe - build a new component for ReportsContainer (since it's getting unwieldy already...)

  return (
    <div className="user-reports">
      <nav>
        <NavLink to={`/user/${user}`} end className="nav-item">Search</NavLink>
        <NavLink to={`/user/${user}/saved`} className="nav-item">Saved Reports</NavLink>
        <Link to="/" className="nav-item">Log out</Link>
      </nav>

      <div className="left-right-sides">
        {isSearchPage && (
          <>
            <SearchContainer user={user} setResults={setResults} isNewSearch={isNewSearch} setIsNewSearch={setIsNewSearch} />
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
          </div>
        )}

        {isSavedPage && <SavedReportsContainer user={user} results={results} />}

        <ResultsContainer user={user} results={results} isNewSearch={isNewSearch} setIsNewSearch={setIsNewSearch} />
      </div>
    </div>
  );
};

export default UserReportsContainer;
