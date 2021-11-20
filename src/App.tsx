import React from "react";
import Select, { ActionMeta } from "react-select";

type Args = { [argname: string]: boolean };
type Operation = any;
type OptionType = { label: string; value: string };

interface IProps {}

interface IState {
  appendElement: boolean;
  operation: number[];
  arguments: any[];
  arrayOfElements: JSX.Element[];
  unmountAddArg: boolean[];
  counter: number;
}

interface Array<OptionType> {
  (arg: OptionType): OptionType;
}

const actions = [
  { label: "Add", value: 1 },
  { label: "Edit", value: 2 },
  { label: "Delete", value: 3 }
];

const booleanValues = [
  { label: "True", value: true },
  { label: "False", value: false }
];

export default class App extends React.Component<IProps, IState> {
  state: IState = {
    appendElement: false,
    operation: [],
    arguments: [],
    arrayOfElements: [],
    unmountAddArg: [true],
    counter: 0
  };

  componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {
    if (this.state.appendElement) {
      let arguments_ = this.state.arguments;
      let counter_ = this.state.counter + 1;
      let arrayOfElements = this.state.arrayOfElements;

      let unmountAddArg_ = this.state.unmountAddArg;
      if (counter_ <= 1) unmountAddArg_[0] = false;

      arrayOfElements.pop(); // Remove button
      arrayOfElements.push(this.createButton(counter_))
      arguments_.push(this.state.arrayOfElements);

      this.setState({ counter: counter_ });
      this.setState({ arguments: arguments_ });
      this.setState({ appendElement: false });
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    if (this.state.appendElement !== nextState.appendElement) {
      return true;
    }
    return false;
  }

  evaluateOperation(operation: Operation, args: Args): boolean {
    /* ...todo: implement an evaluator for your operations, 
      given some args */
  }

  setSelectedValue(value: Array<OptionType>, meta: ActionMeta<OptionType>) {
    const val = JSON.parse(JSON.stringify(value));
    console.log(val.label);
    this.setState({ operation: val });
  }

  // Call this function every time myArg or an operator is selected
  OperationBuilder(key: number): JSX.Element[] {
    // Render a new element based on what was selected
    switch (key) {
      case 1:
        console.log(1);
        break;
      case 2:
        console.log(2);
        break;
    }

    return this.addArgument();
  }

  addArgument(): JSX.Element[] {
    var array = [];
    const counter_ = this.state.counter;
    var unmountAddArg_ = this.state.unmountAddArg;
    unmountAddArg_[counter_] = false;

    const button = this.createButton(counter_);
    const select = this.createSelect();
    const textField = this.createTextField();

    this.setState({ unmountAddArg: unmountAddArg_ });

    array.push(button, select, textField);

    return array;
  }

  createTextField(): JSX.Element {
    const textfield = (
      <div style={{ float: "left", height: "70" }}>
        <input type="text" size="5" />
      </div>
    );

    return textfield;
  }

  createSelect(): JSX.Element {
    const select = (
      <div style={{ width: "15ex", display: "inline-block" }}>
        <Select options={actions} onChange={this.setSelectedValue} />
      </div>
    );

    return select;
  }

  createButton(counter: number): JSX.Element {
    const button = (
      <div style={{ position: "relative" }}>
        {this.state.unmountAddArg[counter] && (
          <div>
            <button
              type="button"
              onClick={() => {
                
                const arrayOfElements = this.OperationBuilder(0);
            
                this.setState(
                  {
                    arrayOfElements: arrayOfElements
                  },
                  () => {
                    this.setState({ appendElement: true });
                  }
                );
              }}
            >
              New Button
            </button>
          </div>
        )}
      </div>
    );

    return button;
  }

  arrayOfArguments() {
    var arguments_ = this.state.arguments;
    return arguments_.map((element) => element);
  }

  render() {
    const counter_ = 0;
    return (
      <div>
        {/* todo: use <OperationBuilder> and have an interface
            for entering arguments and seeing the result */}
        <div style={{ float: "left", height: "70" }}>
          <input type="text" size="5" />
        </div>

        <div style={{ width: "15ex", display: "inline-block" }}>
          <Select options={actions} onChange={this.setSelectedValue} />
        </div>

        <div style={{ position: "relative" }}>
          {this.state.unmountAddArg[counter_] && (
            <button
              type="button"
              onClick={() => {
                const arrayOfElements = this.OperationBuilder(0);
                this.setState(
                  {
                    arrayOfElements: arrayOfElements
                  },
                  () => {
                    this.setState({ appendElement: true });
                  }
                );
              }}
            >
              Add Arg
            </button>
          )}
        </div>

        {this.arrayOfArguments()}
      </div>
    );
  }
}


