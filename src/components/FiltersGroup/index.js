import './index.css'

import CategoryItem from '../CategoryItem'
import RatingItem from '../RatingItem'
const FiltersGroup = props => {
  const {
    ratingsList,
    categoryOptions,
    activeCategoryId,
    activeRatingId,
    changeCategoryby,
    changeRatingby,
    changeSearchby,
    onClearFilters,
    titleSearch,
  } = props
  const changeSearchBy = event => {
    changeSearchby(event.target.value)
  }
  const onClearfilters = () => {
    onClearFilters()
  }
  return (
    <div className="filters-group-container">
      <div className="search-input-container">
        <input
          className="search-input"
          placeholder="Search"
          type="search"
          value={titleSearch}
          onChange={changeSearchBy}
        />
        <img
          className="icon"
          alt="search icon"
          src="https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png"
        />
      </div>
      <ul className="category-list">
        <h1 className="categoryHeading">Category</h1>
        {categoryOptions.map(category => (
          <CategoryItem
            changeCategoryby={changeCategoryby}
            activeCategoryId={activeCategoryId}
            categoryData={category}
            key={category.id}
          />
        ))}
      </ul>
      <ul className="category-list">
        <li className="categoryHeading">Rating</li>
        {ratingsList.map(rating => (
          <RatingItem
            changeRatingby={changeRatingby}
            activeRatingId={activeRatingId}
            ratingData={rating}
            key={rating.id}
          />
        ))}
      </ul>
      <button onClick={onClearfilters} className="clearfilterbtn">
        Clear Filters
      </button>
    </div>
  )
}
export default FiltersGroup
