import { useState } from "react"
import { styled } from "styled-components"

// Styled component for displaying individual product images
const Image = styled.img`
    max-width: 100%;
    height: 100%;
    max-height: 100%;
`

// Styled component for displaying the main product image
const MainImage = styled.img`
    max-width: 100%;
    max-height: 350px;
    width: auto;
`

// Styled component for wrapping the main product image
const MainImageWrapper = styled.div`
    text-align: center;
`

// Styled component for displaying image selection buttons
const ImageButtons = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: .25rem;
    flex-grow: 1;
    width: 100%;
    height: auto;
`

// Styled component for individual image selection button
const ImageButton = styled.div`
    border: 1px solid var(--text-color);
    height: fit-content;
    img {
        max-height: 100%;
        height: auto;
    }


    /* Apply different styles based on whether the image is active or not */
    ${props => props.active ? `
        border-color: var(--dark-text-color);
    ` : `
        opacity: .8;
        border: transparent;
    `}
    cursor: pointer;
`

// ProductImages component
const ProductImages = ({ images }) => {
    const [activeImage, setActiveImage] = useState(images?.[0])

    return (
        <>
            <MainImageWrapper>
                <MainImage src={activeImage} alt="Product image" />
            </MainImageWrapper>
            <ImageButtons>
                {/* Map through the images to display image selection buttons */}
                {images.map(item => (
                    <ImageButton
                        // Check if the item is the active image and apply the active style
                        active={item === activeImage}
                        onClick={() => setActiveImage(item)}
                        key={item}
                    >
                        <Image src={item} alt="Product image miniature"/>
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}

export default ProductImages