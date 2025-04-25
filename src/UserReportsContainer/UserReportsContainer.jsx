import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './UserReportsContainer.css'

const UserReportsContainer = () => {
  const { user_id } = useParams()
  const [reports, setReports] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/users/${user_id}/reports`)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error('Error fetching reports:', err))
  }, [user_id])

  return (
    <div className="user-reports">
      <nav>
        <NavLink to={`/user/${user_id}`} className="nav">Search</NavLink>
        <NavLink to={`/user/${user_id}/saved`} className="nav">Saved Reports</NavLink>
        <NavLink to="/" className="nav">Log out</NavLink>
      </nav>

      <h2>User ID {user_id}'s Reports</h2>

      <ul>
        {reports.length > 0 ? (
          reports.map((report) => (
            <li key={report.id}>
              <strong>{report.nickname}</strong> — ${report.cost} / {report.energy_consumption} kWh
            </li>
          ))
        ) : (
          <p>No saved reports.</p>
        )}
      </ul>
    </div>
  )
}

export default UserReportsContainer