import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './UserReportsContainer.css'

const UserReportsContainer = () => {
  const { user_id: username } = useParams()
  const [reports, setReports] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/users/${username}/reports`)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error('Error fetching reports:', err))
  }, [username])

  return (
    <div>
      <nav>
        <NavLink to={`/${username}`} className="nav">Search</NavLink>
        <NavLink to={`/${username}/saved`} className="nav">Saved Reports</NavLink>
        <NavLink to="/" className="nav">Log out</NavLink>
      </nav>

      <h2>{username}'s Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <strong>{report.nickname}</strong> — ${report.cost} / {report.energy_consumption} kWh
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserReportsContainer