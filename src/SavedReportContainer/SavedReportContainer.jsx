import './SavedReportContainer.css'

const SavedReportContainer = ({ report, fetchReportInfo }) => {

    const deleteReport = () => {
        console.log("This would delete a report")
    }
    const editReport = () => {
        console.log("This would edit a report")
    }

    return (
        <div className="saved-report-item">
            <button key={report.id} className="report-button" onClick={() => fetchReportInfo(report.id)}>
                <span className="report-button-text">
                    {report.nickname}
                </span>
            </button>
            <button key={`delete${report.id}`} className="icon-button" onClick={() => deleteReport()}>
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
            <button key={`edit${report.id}`} className="icon-button" onClick={() => editReport()}>
                <span className="material-symbols-outlined">
                    edit
                </span>
            </button>
        </div>
    )
}

export default SavedReportContainer
