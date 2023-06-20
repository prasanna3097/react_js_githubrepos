// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props
  return (
    <li className="respository-container">
      <img
        src={repositoryData.imageUrl}
        alt={repositoryData.name}
        className="repository-img"
      />
      <h1 className="repo-name">{repositoryData.name}</h1>
      <div className="repo-icons">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="repo-text">{repositoryData.stars}</p>
      </div>
      <div className="repo-icons">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="repo-text">{repositoryData.forks}</p>
      </div>
      <div className="repo-icons">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="icon"
        />
        <p className="repo-text">{repositoryData.issuesCount}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
