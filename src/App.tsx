import React from "react";
import Select, { ActionMeta } from "react-select";

type Args = { [argname: string]: boolean };
type Operation = any;
type OptionType = { label: string; value: string };

interface IProps {}

interface IState {
  count: number;
  operation: string;
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
  constructor(props: IProps) {
    super(props);

    //this.setSelectedValue = this.setSelectedValue.bind(this);
  }

  componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {}

  evaluateOperation(operation: Operation, args: Args): boolean {
    /* ...todo: implement an evaluator for your operations, 
      given some args */
  }

  ev(event: React.MouseEvent<HTMLButtonElement>) {}

  setSelectedValue(
    value: ReadonlyArray<OptionType>,
    meta: ActionMeta<OptionType>
  ) {
    console.log(value);
    //this.setState({ operation: event.target.value });
  }

  // Call this function every time myArg or an operator is selected
  OperationBuilder(e: any) {
    console.log(55555555555);
    /*const val = e.currentTarget.value;
    
    // Render a new element based on what was selected
    switch (val) {
      case 1:
        console.log(1);
        break;

      case 2:
        console.log(2);
        break;

      default:
        break;
    }*/

    /* ...todo: an ugly gui for creating operations */
  }

  render() {
    return (
      <div>
        {/* todo: use <OperationBuilder> and have an interface
            for entering arguments and seeing the result */}

        <div style={{ width: "15ex", height: "10px", position: "relative", float: "left" }}>
          <Select options={actions} onChange={this.setSelectedValue} />
        </div>
        
        <div style={{ width: "15ex", height: "10px", display: "inline-block" }}>
          <Select options={actions} onChange={this.setSelectedValue} />
        </div>



      </div>
    );
  }
}
