import React from "react";
import Select from "react-select";
type Args = { [argname: string]: boolean };
type Operation = any;

interface IProps {}

interface IState {
  count: number;
}

const actions = [
  { label: "Add", value: 1 },
  { label: "Edit", value: 2 },
  { label: "Delete", value: 3 }
];

export default class App extends React.Component<IProps, IState> {
  componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {}

  evaluateOperation(operation: Operation, args: Args): boolean {
    /* ...todo: implement an evaluator for your operations, 
      given some args */
  }

  // Call this function every time myArg or an operator is selected
  OperationBuilder(props: {
    value: Operation;
    onChange: (value: Operation) => void;
  }): JSX.Element {
    // Render a new element based on what was selected
    switch (key) {
      case value:
        break;

      default:
        break;
    }

    /* ...todo: an ugly gui for creating operations */
  }

  render() {
    return (
      <div>
        {/* todo: use <OperationBuilder> and have an interface
            for entering arguments and seeing the result */}
        <Select options={actions} />
      </div>
    );
  }
}
