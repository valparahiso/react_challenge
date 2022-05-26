import React from "react";
import { Button } from "react-bootstrap";
import Row from "./Row";
import { Card } from "react-bootstrap";

class Calculator extends React.Component {

    constructor() {
        super();
        this.state = {
            rows: [
                { radioValue: '1', val: '', disabled: false },
            ],
            total: 0,
            tutorial: true
        };

    }

    addRow() {
        let rows = this.state.rows;
        rows.push({
            radioValue: '1',
            val: '',
            disabled: false
        })
        this.setState({
            rows: rows
        })
    }

    deleteRow(index) {
        let rows = this.state.rows;
        let total = this.state.total;

        if (!rows[index].disabled) {
            if (rows[index].radioValue === '1') { //+
                total -= rows[index].val;
            } else { //-
                total += rows[index].val;
            }
        }

        rows.splice(index, 1);

        this.setState({
            rows: rows,
            total: total
        })
    }

    disableRow(index) {
        let rows = this.state.rows;
        let total = this.state.total;

        if (rows[index].disabled) {
            if (rows[index].radioValue === '1') { //+
                total += rows[index].val;
            } else { //-
                total -= rows[index].val;
            }
        } else {
            if (rows[index].radioValue === '1') { //+
                total -= rows[index].val;
            } else { //-
                total += rows[index].val;
            }
        }

        rows[index].disabled = !rows[index].disabled;

        this.setState({
            rows: rows,
            total: total
        })
    }

    handleToggleButton(event, index) {
        let rows = this.state.rows;
        let total = this.state.total;
        rows[index].radioValue = event.currentTarget.value;

        if (rows[index].radioValue === '1') { //+
            total += 2 * rows[index].val;
        } else { //-
            total -= 2 * rows[index].val;
        }

        this.setState({
            rows: rows,
            total: total
        })
    }

    handleInputValue(event, index) {
        if (!event.target.validity.valid || Number(event.currentTarget.value) > 999999999) { //input is not valid
            return;
        }

        let rows = this.state.rows;
        let total = this.state.total;

        if (rows[index].radioValue === '1') { //+

            total -= Number(rows[index].val);
            total += rows[index].val = Number(event.currentTarget.value);
        } else { //-
            total += Number(rows[index].val);
            total -= rows[index].val = Number(event.currentTarget.value);
        }

        rows[index].val = (rows[index].val === 0) ? '' : rows[index].val;

        this.setState({
            rows: rows,
            total: total
        })


    }

    render() {
        return (

            <Card style={{ margin: "10%", padding: "5%", backgroundColor: "#FCF6F5", borderRadius: "30px", boxShadow: "0 30px 40px rgba(0,0,0,.3)" }}>



                <div style={{ width: "100%" }}>
                    <p style={{ textAlign: "center", fontSize: "230%", marginBottom: "0" }}>Welcome to React Challenge!</p>
                    <p style={{ textAlign: "center", marginBottom: "5%" }}><b>The Calculator!</b></p>

                    <div style={{ width: "50%", float: "right" }}>
                        <p>
                            <b>- Enable a row</b> with the <b style={{color:"#0d6efd"}}>'Enable Row'</b> button
                        </p>
                        <p>
                            <b>- Chose plus or minus</b> with the <b>+/-</b> switch button
                        </p>
                        <p>
                            <b>- Insert a number</b> and check the <b>result</b>
                        </p>
                    </div>


                    <div style={{ width: "50%", float: "left" }}>
                        <p>
                            <b>- Add a row</b> with the <b style={{color:"#157347"}}>'Add Row'</b> button
                        </p>
                        <p>
                            <b>- Delete a row</b> with the <b style={{color:"#bb2d3b"}}>'Delete Row'</b> button
                        </p>
                        <p>
                            <b>- Disable a row</b> with the <b style={{color:"#6c757d"}}>'Disable Row'</b> button
                        </p>

                    </div>
                </div>


                <Button style={{ width: "fit-content", display: "block", margin: "auto", marginBottom: "5%", marginTop: "5%" }} variant="success" onClick={this.addRow.bind(this)}>Add Row</Button>
                <Card.Text>
                    {this.state.rows.map((row, index) => (
                        <Row
                            key={index}
                            row={row}
                            index={index}
                            handleToggleButton={this.handleToggleButton.bind(this)}
                            handleInputValue={this.handleInputValue.bind(this)}
                            deleteRow={this.deleteRow.bind(this)}
                            disableRow={this.disableRow.bind(this)}
                        />
                    ))}

                    <Card.Text style={{ textAlign: "center", marginTop: "5%", marginBottom: "1%", fontSize: "140%" }}>
                        Result:
                    </Card.Text>

                    <Card.Text style={{ textAlign: "center", fontSize: "170%" }}>
                        {String(this.state.total).replace(/(.)(?=(\d{3})+$)/g,'$1.')}
                        
                    </Card.Text>
                </Card.Text>
            </Card >


        );
    }
}

export default Calculator;



