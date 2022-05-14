import React from "react";
import ReactDataSheet from "react-datasheet";
import {connect} from "react-redux";
import "react-datasheet/lib/react-datasheet.css";

//Mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Box} from "@mui/system";
import {Button} from "@mui/material";

const InputGridHeaders = ["Name", "Sid", "Presentation", "Viva", "Implementation"];

class Sheet extends React.Component{
	constructor(props){
		super(props);
		// console.log(this.props, "RRRR");
		let midSemesterMarks = [];
		let endSemesterMarks = [];
		
		for(let studentsIndex = 0; studentsIndex < this.props.studentsData.length; studentsIndex++){
			let currentMid = [];
			let currentEnd = [];
			currentMid.push({value: this.props.studentsData[studentsIndex].name});
			currentMid.push({value: this.props.studentsData[studentsIndex].sid});
			currentMid.push({value: this.props.studentsData[studentsIndex].midSemesterMarks.evaluator.presentation});
			currentMid.push({value: this.props.studentsData[studentsIndex].midSemesterMarks.evaluator.viva});
			currentMid.push({value: this.props.studentsData[studentsIndex].midSemesterMarks.evaluator.implementation});
			midSemesterMarks.push(currentMid)
			
			currentEnd.push({value: this.props.studentsData[studentsIndex].name});
			currentEnd.push({value: this.props.studentsData[studentsIndex].sid});
			currentEnd.push({value: this.props.studentsData[studentsIndex].endSemesterMarks.evaluator.presentation});
			currentEnd.push({value: this.props.studentsData[studentsIndex].endSemesterMarks.evaluator.viva});
			currentEnd.push({value: this.props.studentsData[studentsIndex].endSemesterMarks.evaluator.implementation});
			endSemesterMarks.push(currentEnd);
		}
		this.state = {
			groupID: this.props.groupID,
			groupNumber: this.props.groupNumber,
			recordID: this.props.recordID,
			gridMid: midSemesterMarks,
			gridEnd: endSemesterMarks,
		};
		// console.log(this.state);
	}
	
	saveChanges = () => {
		let midSemesterMarks = {
			presentation: [],
			viva: [],
			implementation: [],
		}
		let endSemesterMarks = {
			presentation: [],
			viva: [],
			implementation: [],
		}
		for(let studentsIndex = 0; studentsIndex < this.props.studentsData.length; studentsIndex++){
			midSemesterMarks.presentation.push(parseFloat(this.state.gridMid[studentsIndex][2].value))
			midSemesterMarks.viva.push(parseFloat(this.state.gridMid[studentsIndex][3].value))
			midSemesterMarks.implementation.push(parseFloat(this.state.gridMid[studentsIndex][4].value))
			
			endSemesterMarks.presentation.push(parseFloat(this.state.gridEnd[studentsIndex][2].value))
			endSemesterMarks.viva.push(parseFloat(this.state.gridEnd[studentsIndex][3].value))
			endSemesterMarks.implementation.push(parseFloat(this.state.gridEnd[studentsIndex][4].value))
			
		}
		// console.log(endSemesterMarks, midSemesterMarks);
		fetch(`/data/evaluator/marksSave/${this.state.groupID}/${this.state.recordID}`, {
			method: "POST",
			headers: {
				
				Authorization: `Bearer ${localStorage.getItem('CodeZone2_Token')}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				midSemesterMarks: midSemesterMarks,
				endSemesterMarks: endSemesterMarks,
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if(data?.success){
					console.log("Saved");
				} else{
					console.log("Failed");
				}
			})
			.catch((err) => {
				console.log(err)
			});
	}
	onCellsChangedMid = (changes) => {
		// console.log(changes);
		const gridMid = this.state.gridMid.map((row) => [...row]);
		changes.forEach(({cell, row, col, value}) => {
			gridMid[row][col] = {...gridMid[row][col], value};
		});
		this.setState({gridMid: gridMid});
	};
	
	onCellsChangedEnd = (changes) => {
		// console.log(changes);
		const gridEnd = this.state.gridEnd.map((row) => [...row]);
		changes.forEach(({cell, row, col, value}) => {
			gridEnd[row][col] = {...gridEnd[row][col], value};
		});
		this.setState({gridEnd: gridEnd});
	};
	
	render(){
		return (
			<Box m={2}>
				<h1>Mid-Semester Evaluation</h1>
				<ReactDataSheet
					data={this.state.gridMid}
					valueRenderer={(cell) => cell.value}
					onCellsChanged={(e) => this.onCellsChangedMid(e)}
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
				<h1>End-Semester Evaluation</h1>
				<ReactDataSheet
					data={this.state.gridEnd}
					valueRenderer={(cell) => cell.value}
					onCellsChanged={(e) => this.onCellsChangedEnd(e)}
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
				<Button onClick={this.saveChanges}>Save</Button>
			</Box>
		);
	}
}

function mapStateToProps(){
	return {};
}

export default connect(mapStateToProps)(Sheet);