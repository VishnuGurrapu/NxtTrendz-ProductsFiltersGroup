import './index.css'
const CategoryItem = props => {
  const {changeCategoryby, activeCategoryId, categoryData} = props
  const {name, categoryId} = categoryData
  const changeCategoryBy = () => {
    changeCategoryby(categoryId)
  }
  const activeClass = activeCategoryId === categoryId ? 'activeCategory' : ''
  return (
    <li className="categoryItem">
      <button
        onClick={changeCategoryBy}
        className={`categoryBtn ${activeClass}`}
      >
        <p className="cateText"> {name}</p>
      </button>
    </li>
  )
}
export default CategoryItem
