import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";


class Row extends React.Component {



    constructor() {
        super();
        this.state = {
            radios: [
                { name: '+', value: '1' },
                { name: '-', value: '2' },
            ],
        };
    }

    render() {
        return (
            <InputGroup className="mb-3">
                <ButtonGroup>
                    {this.state.radios.map((radio, idx) => (
                        <ToggleButton disabled={this.props.row.disabled}
                            className="shadow-none"
                            key={idx + this.props.index}
                            id={'radio-' + idx + this.props.index}
                            type="radio"
                            variant={idx % 2 ? 'outline-primary' : 'outline-secondary'}
                            name={"radio" + idx + this.props.index}
                            value={radio.value}
                            checked={this.props.row.radioValue === radio.value}
                            onChange={(e) => this.props.handleToggleButton(e, this.props.index)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                <FormControl
                    disabled={this.props.row.disabled}
                    id={'input' + this.props.index}
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    pattern="[0-9]*"
                    value={this.props.row.val}
                    onChange={(e) =>
                        this.props.handleInputValue(e, this.props.index)
                    }
                />

                <Button style={{width:"120px"}} variant="danger" onClick={
                    (e) => this.props.deleteRow(this.props.index)}
                >
                    Delete Row
                </Button>

                <Button className="shadow-none" style={{width:"120px"}} variant={this.props.row.disabled ? "outline-primary" : "outline-secondary"} onClick={
                    (e) => this.props.disableRow(this.props.index)}
                >
                   {this.props.row.disabled ? "Enable Row" : "Disable Row"}
                </Button>

            </InputGroup>
        );
    }
}

export default Row;



