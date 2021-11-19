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
  element: JSX.Element[];
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
    element: [],
    unmountAddArg: [true],
    counter: 0
  };

  componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {
    if (this.state.appendElement) {
      let arguments_ = this.state.arguments;
      let counter_ = this.state.counter;
      arguments_.push(this.state.element);

      var unmountAddArg_ = this.state.unmountAddArg;

      if(counter_ <= 1)
        unmountAddArg_[0] = false;

      this.setState({ counter: counter_ + 1});
   

    

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



    console.log(counter_);
    
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
      <div  style={{ position: "relative"}}>
        {this.state.unmountAddArg[counter_] && (
          <div>
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
        )}
      </div>
    );

    var unmountAddArg_ = this.state.unmountAddArg;
    unmountAddArg_[counter_] = false;
    this.setState({ unmountAddArg: unmountAddArg_ });

    array.push(textfield, select, button);
    return array;
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
        </button>)}
        </div>

        {this.arrayOfArguments()}
      </div>
    );
  }
}

