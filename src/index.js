import React, { Component } from "react";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";

import { calcGross, calcPurchase, calcMargin, calcNet } from "./utils";
import "./styles.css";

const cleanEmpty = obj => _.pickBy(obj, Boolean);
const isTrue = obj => Object.values(obj).filter(x => x === true).length;

const generateNewState = (newVal, field, state) => {
  // console.log('newVal', newVal)
  const newState = cleanEmpty({ ...state, [`${field}`]: newVal });
  const obj = {
    purchase: calcPurchase(newState, field),
    margin: calcMargin(newState, field),
    net: calcNet(newState, field),
    gross: calcGross(newState, field)
  };
  obj[field] = newVal;
  // console.log("newState", obj);
  return obj;
};

const handleChange = (e, field, state, changeState) => {
  const newVal =
    typeof Number(e.target.value) === "number" ? e.target.value : "";
  console.log("newVal", newVal);
  const newState = generateNewState(newVal, field, state);
  changeState(newState);
};

const NumberField = props => (
  <TextField type="text" style={{ width: 100 }} {...props} />
);

const Purchase = ({ fields, setState, focused, ...rest }) => {
  const newFields = cleanEmpty(fields);
  return (
    <NumberField
      value={fields.purchase}
      onChange={e => handleChange(e, "purchase", newFields, setState)}
      placeholder="Purchase"
      {...rest}
    />
  );
};

const fromPercent = v => _.divide(v, 100);
const toPercent = v => _.multiply(v, 100) || "";
const setMargin = e => ({
  target: {
    value: fromPercent(e.target.value)
  }
});

const Margin = ({ fields, setState, ...rest }) => {
  const newFields = cleanEmpty(fields);
  return (
    <TextField
      value={toPercent(fields.margin)}
      onChange={e => handleChange(setMargin(e), "margin", newFields, setState)}
      placeholder="Margin (%)"
      {...rest}
    />
  );
};

const Net = ({ fields, setState, ...rest }) => {
  const newFields = cleanEmpty(fields);
  return (
    <NumberField
      value={fields.net}
      onChange={e => handleChange(e, "net", newFields, setState)}
      placeholder="Net"
      {...rest}
    />
  );
};

const Tax = ({ fields, setState, ...rest }) => {
  return <NumberField value={fields.tax} placeholder="Tax (%)" {...rest} />;
};

const Gross = ({ fields, setState, ...rest }) => {
  const newFields = cleanEmpty(fields);
  return (
    <NumberField
      value={fields.gross}
      onChange={e => handleChange(e, "gross", newFields, setState)}
      placeholder="Gross"
      {...rest}
    />
  );
};

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  resetContainer: {
    display: "flex",
    justifyContent: "center"
  },
  reset: {
    backgroundColor: "lightcoral"
  },
  main: {
    height: "95vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  fields: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    height: 120,
    justifyContent: "space-evenly"
  }
};

class App extends Component {
  initialState = {
    purchase: "",
    margin: "",
    net: "",
    tax: "0.19",
    gross: ""
  };

  state = this.initialState;

  handleChange = field => (e, calculatedValue) => {
    // console.log("field", field);
    // console.log("e", e.target.value);
    this.setState({ [`${field}`]: e.target.value }, () => {
      console.log("state after", this.state);
    });
  };

  changeState = obj => {
    this.setState(
      state => ({ ...obj }),
      () => {
        console.log("state after", this.state);
      }
    );
  };

  reset = () => {
    this.setState(this.initialState);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <div className={classes.fields}>
          <div className={classes.root}>
            <Purchase
              data-testid="purchase"
              fields={this.state}
              setState={this.changeState}
            />
            <Margin
              data-testid="margin"
              fields={this.state}
              setState={this.changeState}
            />
            <Net
              data-testid="net"
              fields={this.state}
              setState={this.changeState}
            />
            <Tax
              data-testid="tax"
              fields={this.state}
              setState={this.changeState}
              disabled
            />
            <Gross
              data-testid="gross"
              fields={this.state}
              setState={this.changeState}
            />
          </div>
          <div className={classes.resetContainer}>
            <Button className={classes.reset} onClick={this.reset}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledApp = withStyles(styles)(App);
const rootElement = document.getElementById("root");
ReactDOM.render(<StyledApp />, rootElement);
