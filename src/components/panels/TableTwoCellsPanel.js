import React from "react";
import { Panel } from "components/panels";
import {
  withStyles, Table, TableHead, TableRow, TableCell, TableBody,
} from "@material-ui/core";

const styles = () => ({});

function TableTwoCellsPanel(props) {
  const {
    title = "", firstCellName = "", secondCellName = "", children, classes,
  } = props;

  return (
    <Panel
      title={title}
    >
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">{firstCellName}</TableCell>
            <TableCell align="center">{secondCellName}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </Panel>
  );
}

export default withStyles(styles)(TableTwoCellsPanel);
