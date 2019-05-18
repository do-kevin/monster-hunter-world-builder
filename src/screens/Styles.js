import styled from "styled-components";

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

export const topbar = {
  gridArea: gridAreaTop,
  height: "70px",
  background: "hsl(205, 11%, 31%)",
  width: "100%",
  position: "absolute",
};

export const extendedTopbar = Object.assign({}, topbar, {
  height: "120px",
});

export const toolbar = {
  paddingLeft: "120px",
  display: "flex",
  flexDirection: "row-reverse",
};

export const extendedToolbar = Object.assign({}, toolbar, {
  zIndex: "4",
  boxShadow: "0px 4px 10px hsl(204, 12%, 15%)",
});

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

export const rTable = {
  width: "100%",
  background: "hsl(206, 12%, 17%)",
  color: textColor,
  height: "calc(95vh - 70px)",
  borderRadius: "5px",
};

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

export const dashboardStyles = () => ({
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
  refreshBtn: {
    textTransform: "none",
    color: "white",
  },
});

export const cellStyles = {
  fontWeight: 600,
  padding: "14px",
  color: textColor,
};

export const armorCells = Object.assign({}, cellStyles, {
  padding: "3px",
});

export const armorsStyles = () => ({
  inventoryPanel: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  inventoryImg: {
    height: "60px",
    width: "60px",
  },
  get loadoutInventoryBlock() {
    return Object.assign({}, this.inventoryPanel, {
      flexWrap: "wrap",
    });
  },
  searchfield: {
    borderRadius: "4px",
    height: "53px",
    color: "hsl(204, 5%, 69%)",
    fontWeight: 600,
    marginRight: "10px",
    fontSize: "22px",
    padding: "0 5px",
  },
  loadoutField: {
    height: "40px",
    color: "hsl(0, 100%, 100%)",
    backgroundColor: "hsl(205, 11%, 42%)",
    borderRadius: "5px",
    fontWeight: 600,
  },
  panel: {
    padding: "9px 18px",
    borderBottom: "1px solid hsl(206,12%,15%)",
    display: "flex",
    justifyContent: "space-between",
  },
  panelHeader: {
    textAlign: "center",
    borderBottom: "2px solid hsl(206,12%,15%)",
    boxShadow: "0px 4px 10px hsl(204, 12%, 15%)",
    padding: "18px 36px",
    fontWeight: 600,
    color: "hsl(0, 0%, 100%)",
  },
  armorsBlock: {
    minWidth: "600px",
    margin: "auto auto 18px auto",
    background: "hsl(207, 13%, 17%)",
    borderRadius: "5px",
    boxSizing: "border-box",
    boxShadow: "0px 4px 10px hsl(204, 12%, 15%)",
  },
  get loadoutElements() {
    return Object.assign({}, this.armorsBlock, {
      height: "328px",
      overflowY: "auto",
      color: "hsl(205,11%,80%)",
    });
  },
  get loadoutBlock() {
    return Object.assign({}, this.armorsBlock, {
      height: "400px",
    });
  },
});

export const StyledRecharts = styled.div`
  .recharts-wrapper {
    padding: 7px;
    box-sizing: border-box;
  }
`;
