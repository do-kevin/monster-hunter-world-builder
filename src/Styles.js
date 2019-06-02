import { grey2, grey3, darkBlue0 } from "Colors";

const gridAreaTop = "Topbar";

export const topbar = {
  gridArea: gridAreaTop,
  height: "70px",
  background: grey3,
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
  boxShadow: `0px 4px 10px ${grey2}`,
});

const textColor = "hsl(0, 0%, 77%)";

export const rTable = {
  width: "100%",
  background: "hsl(206, 12%, 17%)",
  color: textColor,
  height: "calc(95vh - 70px)",
  borderRadius: "5px",
};

export const slidingModalStyles = () => ({
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
    height: "100%",
    width: "100%",
    outline: "none",
  },
  media: {
    height: "200px",
    background: "linear-gradient(to bottom right, hsl(161, 100%, 61%), hsl(219, 61%, 53%), hsl(235, 100%, 50%))",
  },
});

export const dashboardStyles = () => ({
  smallAvatar: {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
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
    background: darkBlue0,
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
      height: "453px",
    });
  },
  get overallStatsBlock() {
    return Object.assign({}, this.armorsBlock, {
      width: "100%",
    });
  },
  overallStatsElems: {
    display: "flex",
    flexWrap: "wrap",
    margin: "auto",
    justifyContent: "center",
    padding: "15px",
    boxSizing: "border-box",
  },
});

export const modalStyles = () => ({
  imagePanel: {
    width: "100px",
    height: "100px",
    margin: "auto",
  },
  betterTooltip: {
    fontSize: "16px",
    backgroundColor: "black",
  },
  select: {
    top: "626px",
    background: "red",
  },
  newTitle: {
    color: "hsl(205,11%,80%)",
    fontWeight: 600,
  },
  footer: {
    padding: "5px 10px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  submitBtn: {
    margin: "10.5px 0 0 10px",
    textTransform: "none",
    color: "hsl(0, 0%, 100%)",
    fontWeight: 600,
  },
  selectField: {
    width: "200px",
    background: "hsl(205, 11%, 42%)",
    borderRadius: "5px",
  },
  loadoutWarning: {
    color: "hsl(0, 0%, 0%)",
    padding: "12px 20px",
    borderRadius: "5px",
    backgroundColor: "hsl(48, 100%, 50%)",
  },
  customCard: {
    outline: "none",
    background: "hsl(0, 0%, 41%)",
  },
  closeModalBtn: {
    background: "hsl(207, 11%, 25%)",
    color: "hsl(205,11%,80%)",
    height: "50px",
  },
  centerContent: {
    display: "flex",
    flexWrap: "wrap",
  },
});
