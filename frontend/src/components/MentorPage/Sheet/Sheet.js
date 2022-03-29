import React from "react";
import ReactDataSheet from "react-datasheet";
import { connect } from "react-redux";
import "react-datasheet/lib/react-datasheet.css";

//Mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";

const InputGridHeaders = ["Name", "Sid"];

class Sheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [
        [{ value: "Shayan" }, { value: "18103033" }],
        [{ value: "Gagan" }, { value: "18103032" }],
        [{ value: "Akshit" }, { value: "18103042" }],
      ],
    };
  }

  onCellsChanged = (changes) => {
    // console.log(changes);
    const grid = this.state.grid.map((row) => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
    });
    this.setState({ grid: grid });
  };

  render() {
    return (
      <Box>
        <h1>Mentor Group Sheet</h1>
        <ReactDataSheet
          data={this.state.grid}
          valueRenderer={(cell) => cell.value}
          onCellsChanged={(e) => this.onCellsChanged(e)}
          sheetRenderer={(props) => (
            <Table className={props.className + " my-awesome-extra-class"}>
              <TableHead>
                <TableRow>
                    {InputGridHeaders.map((col, index) => (
                      <TableCell key={index}>{col}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>{props.children}</TableBody>
            </Table>
          )}
        />
      </Box>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Sheet);