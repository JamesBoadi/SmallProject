import React from "react";
import Select, { ActionMeta } from "react-select";

type Args = { [argname: string]: boolean };
type Operation = any;
type OptionType = { label: string; value: string };

interface IProps {}

interface IState {
  count: number;
  operation: number[];
  arguments: string[];
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

const customStyles = {
  control: () => ({
    width: 250
  })
};

export default class App extends React.Component<IProps, IState> {
  state: IState = {
    count: 0,
    operation: [],
    arguments: []
  };

  componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {}

  evaluateOperation(operation: Operation, args: Args): boolean {
    /* ...todo: implement an evaluator for your operations, 
      given some args */
  }

  ev(event: React.MouseEvent<HTMLButtonElement>) {}

  setSelectedValue(value: Array<OptionType>, meta: ActionMeta<OptionType>) {
    const val = JSON.parse(JSON.stringify(value));
    console.log(val.label);
    this.setState({ operation: val });
  }

  // Call this function every time myArg or an operator is selected
  OperationBuilder(key: number): JSX.Element[] {
    // Render a new element based on what was selected
    switch (val) {
      case 1:
        console.log(1);
        break;
      case 2:
        console.log(2);
        break;
      default:
        // add arg
        return this.addArgument();
        break;
    }

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
              this.OperationBuilder(0);
            }}
          >
            Add Arg
          </button>
        </div>

        {this.state.arguments}
      </div>
    );
  }
}
