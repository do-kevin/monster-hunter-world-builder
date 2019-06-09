import styled from "styled-components";
import { Card } from "@material-ui/core";

const gridAreaTop = "Topbar";
const gridAreaContent = "View";

export const ParentGrid = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  grid-template-areas: "Menu Content";
`;

export const ChildGrid = styled(ParentGrid)`
  grid-template-rows: 70px 1fr;
  grid-template-areas: 
    "sidebar ${gridAreaTop}" 
    "sidebar ${gridAreaContent}";
  grid-gap: 0;
  z-index: 2;
  height: 100%;
`;

export const View = styled.main`
  grid-area: ${gridAreaContent};
  width: calc(97.5vw - 110px);
  padding: 18px 18px 18px 17px;
`;

export const ExtendedView = styled(View)`
  padding: 77px 18px 18px 17px;
`;

const textColor = "hsl(0, 0%, 77%)";
const avatarFlex = "16.5 !important";
const avatarPadding = "9px 8px";

const NewTable = styled.main`
  box-shadow: 0px 4px 10px hsl(204, 12%, 15%);
  border-radius: 5px;
  .rt-tbody {
    text-align: center;
  }
  .rt-resizable-header-content {
    color: hsl(0, 0%, 100%);
    font-size: 18px;
  }
  .rt-td {
    border-bottom: 1px solid hsl(206, 12%, 15%);
  }
`;

export const StyledTable = styled(NewTable)`
  .rt-tr-group {
    .rt-tr {
      .rt-td:first-child {
        padding: ${avatarPadding}
        flex: ${avatarFlex}
      }
      .rt-td:nth-child(2) {
        padding: 16px;
      }
      .rt-td {
        color: ${textColor};
      }
    }
  }
  .rt-thead {
    .rt-tr {
      .rt-th:first-child {
        padding: ${avatarPadding}
        flex: ${avatarFlex}
      }
      .rt-th:not(first-child) {
        text-align: center;
        div:first-child {
          padding: 3px 0 3px 13px;
        }
      }
    }
  }
`;

export const ArmorsTable = styled(NewTable)`
  margin-bottom: 18px;
  .rt-tr-group {
    .rt-tr {
      .rt-td {
        color: ${textColor};
        padding: 16px;
      }
    }
  }
  .rt-thead {
    .rt-tr {
      .rt-th {
        text-align: center;
        div:first-child {
          padding: 3px 0 3px;
        }
      }
    }
  }
`;

export const TextButton = styled.div`
  padding-top: 5px;
  p {
    cursor: pointer;
    color: hsl(205, 11%, 80%);
    font-weight: 600;
    width: min-content;
    margin: auto;
    &:hover {
      color: hsl(219, 61%, 53%);
    }
  }
`;
