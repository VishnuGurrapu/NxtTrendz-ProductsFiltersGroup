import './index.css'
const RatingItem = props => {
  const {changeRatingby, activeRatingId, ratingData} = props
  const {ratingId, imageUrl} = ratingData
  const changeRatingBy = () => {
    changeRatingby(ratingId)
  }
  const activeClass = activeRatingId === ratingId ? 'activeRating' : ''
  return (
    <li className="categoryItem">
      <button onClick={changeRatingBy} className={`ratingBtn ${activeClass}`}>
        <img className="ratingicon" src={imageUrl} alt={`rating ${ratingId}`} />
        <p>&up</p>
      </button>
    </li>
  )
}
export default RatingItem
