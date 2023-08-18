import Button from "@/components/Button"
import Centered from "@/components/Centered"
import Header from "@/components/Header"
import ProductsGrid from "@/components/ProductsGrid"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import { styled } from "styled-components"
import { BsSearch } from 'react-icons/bs'
import { useState } from "react"
import { Category } from "@/models/Category"
import { device } from "@/utils/devices"

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  @media ${device.mobileXL} {
    flex-direction: row;
  }
`
const SideBar = styled.div`
    display: ${props => (props.activeFilterButton ? 'block' : 'none')};
  @media ${device.mobileXL} {
    display: block;
    max-width: 35%;
    padding: 1rem;
    border-right: 1px solid var(--text-color);
    height: fit-content;
  }
`
const SideBarButton = styled.div`
      display: flex;
      button {
        width: 100%;
      }
  @media ${device.mobileXL} {
    display: none;
  }
`

const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  @media ${device.mobileXL} {
    flex-direction: row;
  }
  input {
    height: 2rem;
  }
`
const FiltersBar = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`

const ProductsPage = ({ products, categories }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [chosenCategory, setChosenCategory] = useState('')
  const [chosenColor, setChosenColor] = useState('')
  const [activeFilterButton, setActiveFilterButton] = useState(false)
  const uniqueColorsSet = new Set()

  categories.forEach((item) => {
    if (item.properties && Array.isArray(item.properties)) {
      item.properties.forEach(({ name, values }) => {
        if (name === 'Color' && Array.isArray(values)) {
          values.forEach((color) => {
            const trimmedColor = color.trim().toLowerCase()
            uniqueColorsSet.add(trimmedColor)
          })
        }
      })
    }
  })

  const uniqueColorsArray = Array.from(uniqueColorsSet).sort((a, b) =>
    a.localeCompare(b, 'en', { sensitivity: 'base' })
  )

  const searchProduct = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    setCurrentPage(1)
    setChosenCategory(searchTerm)

    // Apply category and color filtering simultaneously
    const filteredProducts = products.filter((item) => {
      const categoryMatches = searchTerm === '' || item.title.toLowerCase().includes(searchTerm)
      const colorMatches = chosenColor === '' || item.title.toLowerCase().includes(chosenColor)
      return categoryMatches && colorMatches
    })

    setFilteredProducts(filteredProducts)
  }

  const searchProductByColor = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    setCurrentPage(1)
    setChosenColor(searchTerm)

    // Apply category and color filtering simultaneously
    const filteredProducts = products.filter((item) => {
      const categoryMatches = chosenCategory === '' || item.title.toLowerCase().includes(chosenCategory)
      const colorMatches = searchTerm === '' || item.title.toLowerCase().includes(searchTerm)
      return categoryMatches && colorMatches
    })

    setFilteredProducts(filteredProducts)
  }
  return (
    <div>
      <>
        <Header />
        <Centered>
          <h1>All products</h1>
          <Wrapper>
            <SideBarButton>
              <Button onClick={() => setActiveFilterButton(prev => !prev)}>Filter</Button>
            </SideBarButton>
            <SideBar activeFilterButton={activeFilterButton}>
              <SearchBar>
                <input type="text" onChange={searchProduct} />
                <Button><BsSearch /></Button>
              </SearchBar>
              <FiltersBar>
                <h3>Category: </h3>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value=""
                    onChange={searchProduct}
                    checked={chosenCategory === ''}
                  />
                  All
                </label>
                {categories.map(({ name, parentCategory }) => (
                  !parentCategory &&
                  <label key={name}>
                    <input
                      type="radio"
                      name="category"
                      value={name}
                      onChange={searchProduct}
                      checked={chosenCategory === name.toLowerCase()}
                    />
                    {name}
                  </label>
                ))}
                <h3>Color: </h3>
                <label>
                  <input
                    type="radio"
                    name="color"
                    value=""
                    onChange={searchProductByColor}
                    checked={chosenColor === ''}
                  />
                  All
                </label>
                {uniqueColorsArray.map((color) => (
                  <label key={color}>
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      onChange={searchProductByColor}
                      checked={chosenColor === color}
                    />
                    {color}
                  </label>
                ))}
              </FiltersBar>
            </SideBar>
            <ProductsGrid products={filteredProducts} pagination={true} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </Wrapper>
        </Centered>
      </>
    </div>
  )
}

export default ProductsPage

export const getServerSideProps = async () => {
  await mongooseConnect()
  const products = await Product.find({}, null, { sort: { '_id': -1 } })
  const categories = await Category.find({}, null, { sort: { '_id': -1 } })
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  }
}