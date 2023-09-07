import { device } from "@/utils/devices"
import styled from "styled-components"

// StyledTable is a styled component for a table element
const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    font-size: 0.6rem;
    text-transform: uppercase;
    color: inherit;
    font-weight: 600;
    font-size: 0.7rem;
    @media ${device.tablet} {
      font-size: 0.8rem;
    }
  }
  td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: var(--dark-text-color);
    padding: 10px;
  }
  td:nth-child(2) {
    text-align: center;
  }
  tr:last-child {
    font-weight: 600;
  }
`

// Table component that uses the StyledTable component
export default function Table(props) {
  return <StyledTable {...props} />
}
