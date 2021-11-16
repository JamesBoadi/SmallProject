import React from "react";
import Select from "react-select";
type Args = { [argname: string]: boolean };
type Operation = any;

const actions = [
  { label: "Add", value: 1 },
  { label: "Edit", value: 2 },
  { label: "Delete", value: 3 }
];

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
