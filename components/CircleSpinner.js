import { styled } from "styled-components"

const StyledDiv = styled.div`
    display: flex;
    justify-items: center;
    z-index: 999;
`

const StyledSvg = styled.svg`
    fill: ${(props) => props.color};
    &:hover {
        fill: ${(props) => props.hovercolor};
    }
    
`

const CircleSpinner = ({size, color, hovercolor}) => (
    <StyledDiv>
<StyledSvg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      hovercolor={hovercolor}
    >
      <style>
        {`
          .spinner_7mtw {
            transform-origin: center;
            animation: spinner_jgYN 0.6s linear infinite;
          }

          @keyframes spinner_jgYN {
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <path
        className="spinner_7mtw"
        d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,.1-.05C6,23,2,17.74,2,12Z"
      />
    </StyledSvg>
    </StyledDiv>
)

export default CircleSpinner