import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  word-break: break-all;
  th{
    text-align: left;
    text-transform: uppercase;
    color: inherit;
    font-weight: 600;
    font-size: .7rem;
  }
  td{
    border-top: 1px solid rgba(0,0,0,.1);
    color: var(--dark-text-color);
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />
}