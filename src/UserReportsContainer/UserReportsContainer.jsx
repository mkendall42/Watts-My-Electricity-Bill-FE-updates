import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './UserReportsContainer.css'
import ResultsContainer from '../ResultsContainer/ResultsContainer.jsx'

const UserReportsContainer = ({results, setResults}) => {
  const { user_id } = useParams()
  const [reports, setReports] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/users/${user_id}/reports`)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error('Error fetching reports:', err))
  }, [user_id])

  const fetchReportInfo = (reportId) => {
    fetch(`http://localhost:3000/api/v1/reports/${reportId}`)
    .then(res => res.json())
    .then(data => {
      console.log("fetchReportInfo data: ", data)
      if (data.length === 0) {
        setResults(null)
      } else {
        setResults(data)
      }
    })
  }

  return (
    <div className="user-reports">
      <nav>
        <NavLink to={`/user/${user_id}`} className="nav">Search</NavLink>
        <NavLink to={`/user/${user_id}/saved`} className="nav">Saved Reports</NavLink>
        <NavLink to="/" className="nav">Log out</NavLink>
      </nav>

      <div className='reportsContainer'>
        <h2>User ID {user_id}'s Reports</h2>
            <div className='buttonList'>
                {reports.length > 0 ? (
                reports.map((report) => (
                    <button key={report.id} onClick={() => fetchReportInfo(report.id)}>
                    {/* <strong>{report.nickname}</strong> — ${report.cost} / {report.energy_consumption} kWh */}
                    {report.nickname}
                    </button>
                ))
                ) : (
                <p>No saved reports.</p>
                )}
            </div>
      </div>
      <div className='user-results'>
        <ResultsContainer
        user={user_id}
        results={results}
        />
      </div>
    </div>
  )
}

export default UserReportsContainer