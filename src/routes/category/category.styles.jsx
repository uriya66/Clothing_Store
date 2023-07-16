import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: grid;
  // the columns to be in 4 equal sizes repeat 4 times 1 evenly distributed and equidistant size
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`;

export const CategoryTitle = styled.h2`
  font-size: 38px;
  margin-bottom: 25px;
  text-align: center;
`;
