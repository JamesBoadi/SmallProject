import React from "react";
import Select, { ActionMeta } from "react-select";

type Args = { [argname: string]: boolean };
type Operation = any;
type OptionType = { label: string; value: string };

interface IProps {}

interface IState {
  appendElement: boolean;
  count: number;
  operation: number[];
  arguments: any[];
  element: JSX.Element[];
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
    count: 0,
    operation: [],
    arguments: [],
    element: []
  };

  componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {
    if(this.state.appendElement)
    {
      console.log("EVENT TRIGGERED")
      var arguments_ = this.state.arguments;
      arguments_.push(this.state.element);
      this.setState({ arguments: arguments_ });
      this.forceUpdate();
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
    console.log(this.addArgument());
    return this.addArgument();
  }

  addArgument(): JSX.Element[] {
    var array = [];

    const textfield = (
      <div style={{ float: "left", height: "70" }}>
        <input type="text" size="5" />
      </div>
    );

    const select = (
      <div style={{ width: "15ex", display: "inline-block" }}>
        <Select options={actions} onChange={this.setSelectedValue} />
      </div>
    );

    const button = (
      <div style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => {
            this.OperationBuilder(0);
          }}
        >
          Add Arg
        </button>
      </div>
    );

    array.push(textfield, select, button);
    return array;
  }

  render() {
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
          <button
            type="button"
            onClick={() => {
              this.setState(
                {
                  element: this.OperationBuilder(0)
                },
                () => {
                  this.setState({ appendElement: true });
                }
              );
            }}
          >
            Add Arg
          </button>
        </div>

        {this.state.arguments[0]}
        {this.state.arguments[1]}
        {this.state.arguments[2]}
      </div>
    );
  }
}

