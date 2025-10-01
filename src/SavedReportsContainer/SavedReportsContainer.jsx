import './SavedReportsContainer.css'
import SavedReportContainer from '../SavedReportContainer/SavedReportContainer'
import { useState, useEffect } from 'react'

const SavedReportsContainer = ({ user, results, setResults, isNewSearch, setIsNewSearch }) => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${user.id}/reports`)
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
        <div className='user-reports'>
            <h2>{user.name}'s Reports</h2>
            <div className='button-list'>
              {reports.length > 0 ? (
                reports.map((report) => (
                    <SavedReportContainer key={report.id} report={report} fetchReportInfo={fetchReportInfo} />
                ))
              ) : (
                <p>No saved reports.</p>
              )}
            </div>
        </div>
    )
}
 
export default SavedReportsContainer
