import { device } from "@/utils/devices";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    font-size: .6rem;
    text-transform: uppercase;
    color: inherit;
    font-weight: 600;
    font-size: .7rem;
    @media ${device.tablet} {
      font-size: .8rem
    }
  }
  td {
    border-top: 1px solid rgba(0,0,0,.1);
    color: var(--dark-text-color);
    padding: 10px;
  }
  td:nth-child(2) {
    text-align: center;
  }
  tr:last-child {
    font-weight: 600;
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />
}