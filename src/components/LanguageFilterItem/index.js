// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isSelected, languageFiltersDetails, selectedFilteredLanguage} = props
  const languageStyle = isSelected ? 'selected-language' : 'unselected-language'

  const onClickSelectedLanguage = () => {
    selectedFilteredLanguage(languageFiltersDetails.id)
  }
  return (
    <li>
      <button
        type="button"
        className={languageStyle}
        onClick={onClickSelectedLanguage}
      >
        {languageFiltersDetails.language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
