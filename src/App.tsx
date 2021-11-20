import React from "react";
import Select, { ActionMeta } from "react-select";

type Args = { [argname: string]: boolean };
type Operation = any;
type OptionType = { label: string; value: string };

interface IProps {}

interface IState {
  appendElement: boolean;
  operation: string;
  arguments: any[];
  arrayOfElements: JSX.Element[];
  unmountAddArg: boolean[];
  counter: number;
}

interface Array<OptionType> {
  (arg: OptionType): OptionType;
}

const booleanValues = [
  { label: "True", value: true },
  { label: "False", value: false }
];

const menu = [
  { label: "Constant", value: "Constant" },
  { label: "Argument", value: "Argument" },
  { label: "And", value: "And" },
  { label: "Or", value: "Or" },
  { label: "Xor", value: "Xor" }
];

export default class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.setSelectedValue = this.setSelectedValue.bind(this);
  }

  state: IState = {
    appendElement: false,
    operation: "",
    arguments: [],
    arrayOfElements: [],
    unmountAddArg: [true, false],
    counter: 0
  };

  componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {
    if (this.state.appendElement) {
      let arguments_ = this.state.arguments;
      let counter_ = this.state.counter;
      let arrayOfElements = this.state.arrayOfElements;
      let unmountAddArg_ = this.state.unmountAddArg;

      if (counter_ === 0) unmountAddArg_[0] = false;
      else unmountAddArg_[1] = true;

      arguments_.push(arrayOfElements);

      this.setState({ unmountAddArg: unmountAddArg_ });
      this.setState({ counter: counter_ + 1 });
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
    this.setState({ operation: val.label });
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
    const select = this.createSelect();
    const textField = this.createTextField();

    const html = (
      <div style={{ display: "inline-block" }}>
        {select}
        {textField}
      </div>
    );

    array.push(html);
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
        <Select options={booleanValues} onChange={this.setSelectedValue} />
      </div>
    );

    return select;
  }

  createButton(): JSX.Element {
    const button = (
      <div style={{ position: "relative" }}>
        {this.state.unmountAddArg[1] && (
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
              Add Arg
            </button>
          </div>
        )}
      </div>
    );

    return button;
  }



  /* ----- For Operations ----- */

  resetButton() {
    const resetButton = (
      <div style={{ position: "relative"}}>
      <button
        type="button"
        onClick={() => {
          
        }}
      >
        Reset
      </button>
      </div>
    );

    return resetButton;
  }

  createMenu()
  {
    const select = (
      <div style={{ width: "15ex", float: "left", 
      zIndex:999, display: "inline-block" }}>
        <Select options={menu} onChange={this.setSelectedValue} />
      </div>
    );

    return select;
  }

  /* ----------------------- */

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
          <Select options={booleanValues} onChange={this.setSelectedValue} />
        </div>

        <div style={{ position: "relative" }}>
          {this.state.unmountAddArg[0] && (
            <button
              type="button"
              onClick={() => {
                const arrayOfElements = this.OperationBuilder(0);
                this.setState(
                  {
                    arrayOfElements: arrayOfElements
                  },
                  () => {
                    let unmountAddArg_ = this.state.unmountAddArg;
                    unmountAddArg_[1] = true;
                    this.setState({ unmountAddArg: unmountAddArg_ });
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
        {this.createButton()}

        <div style={{transform: "translateY(30px)"}}>
          {this.createMenu()}
          {this.resetButton()}

        </div>
        

      </div>
    );
  }
}

