import styled from "styled-components";

const textColor = "hsl(0, 0%, 77%)";
const avatarFlex = "16.5 !important";
const avatarPadding = "9px 8px";

const StyledTable = styled.main`
  .rt-tbody {
    text-align: center;
  }
  .rt-resizable-header-content {
    color: hsl(0, 0%, 100%);
    font-size: 18px;
  }
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
  .rt-td {
    border-bottom: 1px solid hsl(206, 12%, 15%);
  }
`;

const TextButton = styled.div`
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

const bigStyles = () => ({
  topbar: {
    gridArea: "Topbar",
    height: "70px",
    background: "hsl(205, 11%, 31%)",
    width: "100%",
    position: "absolute",
  },
  toolbar: {
    paddingLeft: "120px",
    display: "flex",
    flexDirection: "row-reverse",
  },
  rtWrapper: {
    gridArea: "List",
    width: "calc(97.5vw - 110px)",
    padding: "18px 18px 18px 17px",
  },
  table: {
    width: "100%",
    background: "hsl(206, 12%, 17%)",
    color: textColor,
    height: "calc(95vh - 70px)",
    borderRadius: "5px",
  },
  smallAvatar: {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
  },
  innerAvatar: {
    position: "relative",
    height: "130px",
    width: "130px",
    left: "83px",
    top: "34px",
    borderRadius: "50%",
    boxShadow: "0 2px 10px hsl(219, 61%, 26%)",
  },
  card: {
    width: "300px",
    outline: "none",
  },
  media: {
    height: "200px",
    background: "linear-gradient(to bottom right, hsl(161, 100%, 61%), hsl(219, 61%, 53%), hsl(235, 100%, 50%))",
  },
  fullNameFilter: {
    background: "hsl(205, 11%, 42%)",
    borderRadius: "4px",
    height: "33px",
    color: "hsl(0, 100%, 100%)",
    fontWeight: 600,
    marginRight: "10px",
  },
  cellStyles: {
    fontWeight: 600,
    padding: "14px",
    color: textColor,
  },
  refreshBtn: {
    textTransform: "none",
    color: "white",
  },
});

export {
  bigStyles,
  StyledTable,
  TextButton,
};
