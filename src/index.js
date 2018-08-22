import React, { Component } from "react";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";

import { calcGross, calcPurchase, calcMargin, calcNet } from "./utils";

const cleanEmpty = obj => _.pickBy(obj, Boolean);

const generateNewState = _.curry((field, state, newVal) => {
  const newState = cleanEmpty({ ...state, [`${field}`]: newVal });
  return {
    purchase: calcPurchase(newState, field),
    margin: calcMargin(newState, field),
    net: calcNet(newState, field),
    gross: calcGross(newState, field)
  };
});

const handleChange = (e, field, state, changeState) =>
  _.flow(
    v => (Number(v) ? v : ""),
    generateNewState(field, state),
    changeState
  )(e.target.value);

const Field = props => <TextField style={{ width: 100 }} {...props} />;

const Purchase = ({ fields, setState, focused, ...rest }) => {
  const newFields = cleanEmpty(fields);
  return (
    <Field
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
    <Field
      value={fields.net}
      onChange={e => handleChange(e, "net", newFields, setState)}
      placeholder="Net"
      {...rest}
    />
  );
};

const Tax = ({ fields, setState, ...rest }) => {
  return <Field value={fields.tax} placeholder="Tax (%)" {...rest} />;
};

const Gross = ({ fields, setState, ...rest }) => {
  const newFields = cleanEmpty(fields);
  return (
    <Field
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

  handleChange = obj => {
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
              setState={this.handleChange}
            />
            <Margin
              data-testid="margin"
              fields={this.state}
              setState={this.handleChange}
            />
            <Net
              data-testid="net"
              fields={this.state}
              setState={this.handleChange}
            />
            <Tax
              data-testid="tax"
              fields={this.state}
              setState={this.handleChange}
              disabled
            />
            <Gross
              data-testid="gross"
              fields={this.state}
              setState={this.handleChange}
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
