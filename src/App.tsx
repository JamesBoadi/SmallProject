import React from "react";
import Select from "react-select";
type Args = { [argname: string]: boolean };
type Operation = any;

interface IProps {}

interface IState {
  playOrPause?: string;
}

const actions = [
  { label: "Add", value: 4 },
  { label: "Edit", value: 2 },
  { label: "Delete", value: 3 }
];

function componentDidUpdate(nextProps: {}, nextState: IState, snapshot: any) {}

function shouldComponentUpdate(nextProps: {}, nextState: IState) {}

function evaluateOperation(operation: Operation, args: Args): boolean {
  /* ...todo: implement an evaluator for your operations, 
  given some args */
}

function OperationBuilder(props: {
  value: Operation;
  onChange: (value: Operation) => void;
}): JSX.Element {
  /* ...todo: an ugly gui for creating operations */
}

export default function App() {
  return (
    <div>
      {/* todo: use <OperationBuilder> and have an interface
      for entering arguments and seeing the result */}
      <Select options={actions} />
    </div>
  );
}
