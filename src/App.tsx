import React from "react";
import Select, { ActionMeta } from "react-select";
import { LinkedList } from "linked-list-typescript";

type Args = { [argname: string]: boolean };
type Operation = any;
type OptionType = { label: string; value: string };
type ArgType = { key: string; value: { text: string; select: boolean } };
type ArgTypeOp = [{ label: string; value: number }];

interface IProps {}

interface IState {
  /* For  Arguments */
  appendElement: boolean;
  operation: string;
  arguments: any[];
  arrayOfElements: JSX.Element[];
  unmountAddArg: boolean[];
  counter: number;
  updateArguments: boolean;
  argumentsList: LinkedList<ArgType>;

  /* For operatons */
  updateMenu: boolean;
  listOfArguments_op: ArgTypeOp;
  selectedArgumentOption: number;
  menu: JSX.Element;
  tempMenu: JSX.Element;
}

interface Array<OptionType> {
  (arg: OptionType): OptionType;
}

interface ArgArray<ArgTypeOp> {
  (arg: ArgTypeOp): ArgTypeOp;
}

const booleanValues = [
  { label: "True", value: true },
  { label: "False", value: false }
];

const menu = [
  { label: "Constant", value: 0 },
  { label: "Argument", value: 1 },
  { label: "And", value: 2 },
  { label: "Or", value: 3 },
  { label: "Xor", value: 4 }
];

export default class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.setSelectedValue = this.setSelectedValue.bind(this);
    this.setSelectedMenuValue = this.setSelectedMenuValue.bind(this);
  }

  state: IState = {
    /* For  Arguments */
    appendElement: false,
    operation: "",
    arguments: [],
    arrayOfElements: [],
    unmountAddArg: [true, false],
    counter: 0,
    updateArguments: false,
    argumentsList: new LinkedList<ArgType>(),

    /* For operatons */

    selectedArgumentOption: 5,

    // Arguments
    listOfArguments_op: [{ label: "", value: 0 }],

    // And Operator

    // Not Operator

    menu: this.createMenu(),
    tempMenu: this.createMenu(),
    updateMenu: false
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
    if (this.state.updateMenu) {
      this.setState({ menu: this.state.tempMenu });
      this.setState({ updateMenu: false });
    }
    if (this.state.updateArguments) {
      this.setState({ updateArguments: !this.state.updateArguments });
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    if (
      this.state.appendElement !== nextState.appendElement ||
      this.state.updateMenu !== nextState.updateMenu ||
      this.state.updateArguments !== nextState.updateArguments
    ) {
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
    // Read all of the values of the arguments
    const arrayOfArguments = this.arrayOfArguments();

    for (let index = 0; index < arrayOfArguments.length; index++) {
      const element = arrayOfArguments[index];
      const getValues = (element: Element) => {
        const element_ = JSON.parse(JSON.stringify(element))[0];
        const id = element_.props.id;
        return id;
      };

      const id = getValues(element);
      const res = this.state.argumentsList.toArray()
      .find(function(e) {
        return e.key === id
      });

      const is
   

    }

    
    for (let index = 0; index < list.length; index++) {
      
      
    }


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
      <div id={"0"} style={{ display: "inline-block" }}>
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
      <div id={"0"} style={{ position: "relative" }}>
        {this.state.unmountAddArg[1] && (
          <div>
            <button
              id={"0"}
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

  setSelectedMenuValue(
    value: ArgArray<ArgTypeOp>,
    meta: ActionMeta<ArgTypeOp>
  ) {
    const val = JSON.parse(JSON.stringify(value));
    this.setState({ selectedArgumentOption: val.label });

    this.setState({ menu: this.state.tempMenu });

    this.setState({ updateMenu: true });
  }

  resetButton() {
    const resetButton = (
      <div style={{ position: "relative" }}>
        <button type="button" onClick={() => {}}>
          Reset
        </button>
      </div>
    );

    return resetButton;
  }

  createMenu() {
    const select = (
      <div
        style={{
          width: "15ex",
          float: "left",
          zIndex: 999,
          display: "inline-block"
        }}
      >
        <Select options={menu} onChange={this.setSelectedMenuValue} />
      </div>
    );

    return select;
  }

  menuInterface(key: number) {
    switch (key) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;

      default:
        this.setState({ tempMenu: this.createMenu() });
        break;
    }
  }

  /* ----------------------- */

  arrayOfArguments() {
    var arguments_ = this.state.arguments;
    return arguments_.map((element) => element);
  }

  render() {
    return (
      <div>
        {/* todo: use <OperationBuilder> and have an interface
            for entering arguments and seeing the result */}
        <div id={"0"} style={{ float: "left", height: "70" }}>
          <input type="text" size="5" />
        </div>

        <div id={"0"} style={{ width: "15ex", display: "inline-block" }}>
          <Select options={booleanValues} onChange={this.setSelectedValue} />
        </div>

        <div id={"0"} style={{ position: "relative" }}>
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

        <div style={{ transform: "translateY(30px)" }}>
          {this.state.menu}
          {this.resetButton()}
        </div>
      </div>
    );
  }
}

