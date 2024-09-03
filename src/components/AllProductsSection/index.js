import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: '',
    titleSearch: '',
    activeRatingId: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
   this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, activeCategoryId, titleSearch, activeRatingId} =
      this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${titleSearch}&rating=${activeRatingId}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }
  onClearFilters = () => {
    this.setState(
      {
        activeCategoryId: '',
        titleSearch: '',
        activeRatingId: '',
      },
      this.getProducts,
    )
  }
  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }
  changeCategoryby = activeCategoryId => {
    this.setState({activeCategoryId}, this.getProducts)
  }
  changeRatingby = activeRatingId => {
    this.setState({activeRatingId}, this.getProducts)
  }
  changeSearchby = titleSearch => {
    this.setState({titleSearch}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        {productsList.length === 0 ? (
          <div className="no-products-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
              alt="no products"
              className="no-products-image"
            />
            <h1 className="noProductHeading">No Products Found</h1>
            <p className="noProductdesp">
              We could not find any products.Try other filters
            </p>
          </div>
        ) : (
          <>
            <ProductsHeader
              activeOptionId={activeOptionId}
              sortbyOptions={sortbyOptions}
              changeSortby={this.changeSortby}
            />
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
renderFailureView=()=>{
  <div className="no-products-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
              alt="products failure"
              className="no-products-image"
            />
            <h1 className="noProductHeading">Oops! Something Went Wrong</h1>
            <p className="noProductdesp">
              We are having some trouble processing your request.Please try again
            </p>
          </div>
}
  render() {
    const {isLoading, activeRatingId, titleSearch, activeCategoryId,apiStatus} =
      this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeCategoryby={this.changeCategoryby}
          changeRatingby={this.changeRatingby}
          changeSearchby={this.changeSearchby}
          onClearFilters={this.onClearFilters}
          titleSearch={titleSearch}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          titleSearch={titleSearch}
        />

        {(() => {
          switch (apiStatus) {
            case apiStatusConstants.success:
              return this.renderProductsList()
            case apiStatusConstants.failure:
              return this.renderFailureView()
            case apiStatusConstants.inProgress:
              return this.renderLoader()
            default:
              return null
          }
        })()}
      </div>
    )
  }
}

export default AllProductsSection
