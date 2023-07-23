import { useState } from "react"
import { styled } from "styled-components"

const Image = styled.img`
    max-width: 100%;
    height: 100%;
    max-height: 100%;
`
const MainImage = styled.img`
    max-width: 100%;
    max-height: 350px;
    width: fit-content;
`
const MainImageWrapper = styled.div`
  text-align: center;
`
const ImageButtons = styled.div`
    display: flex;
    gap: .25rem;
    flex-grow: 0;
`
const ImageButton = styled.div`
    border: 1px solid var(--text-color);
    ${props => props.active ? `
        border-color: var(--dark-text-color);
    ` : `
        opacity: .8;
        border: transparent;
    `}
    cursor: pointer;
`
const ProductImages = ({ images }) => {
    const [activeImage, setActiveImage] = useState(images?.[0])
    return (
        <>
            <MainImageWrapper>
                <MainImage src={activeImage} alt="Product image" />
            </MainImageWrapper>
            <ImageButtons>
                {images.map(item => (
                    <ImageButton active={item === activeImage} onClick={() => setActiveImage(item)} key={item}>
                        <Image src={item} alt="Product image miniature" />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}

export default ProductImages
