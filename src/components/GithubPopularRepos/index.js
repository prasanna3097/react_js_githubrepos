import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}
// Write your code here
class GithubPopularRepos extends Component {
  state = {
    selectedLanguageFilter: 'ALL',

    repositoriesData: [],
    apiStatus: '',
  }

  componentDidMount() {
    this.getRepositories(languageFiltersData[0].id)
  }

  getRepositories = async () => {
    const {selectedLanguageFilter} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${selectedLanguageFilter}`,
    )
    const data = await response.json()
    const updatedData = data.popular_repos.map(eachRepo => ({
      id: eachRepo.id,
      name: eachRepo.name,
      issuesCount: eachRepo.issues_count,
      stars: eachRepo.stars_count,
      imageUrl: eachRepo.avatar_url,
      forks: eachRepo.forks_count,
    }))
    this.setState({
      repositoriesData: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderRepositoryItems = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="repo-list-items">
        {repositoriesData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryData={eachRepo} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  selectedFilteredLanguage = newFilterId => {
    this.setState({selectedLanguageFilter: newFilterId})
    this.getRepositories(newFilterId)
  }

  renderLanguageFilterItems = () => {
    const {selectedLanguageFilter} = this.state
    return (
      <ul className="filteredLanguagesList">
        {languageFiltersData.map(eachFilter => (
          <LanguageFilterItem
            key={eachFilter.id}
            languageFiltersDetails={eachFilter}
            isSelected={eachFilter.id === selectedLanguageFilter}
            selectedFilteredLanguage={this.selectedFilteredLanguage}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderAllLanguages = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItems()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="repo-container">
        <h1 className="main-headinG">Popular</h1>
        {this.renderLanguageFilterItems()}
        {this.renderAllLanguages()}
      </div>
    )
  }
}
export default GithubPopularRepos
