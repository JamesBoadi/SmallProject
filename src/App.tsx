import React from "react";
import { LinkedList } from "linked-list-typescript";

type Args = { [argname: string]: boolean };
type Operation = any;
type OptionType = { id: string; label: string; value: string };
type ArgType = {
  id: string;
  found: boolean;
  value: { text: any; select: string };
};
type ArgTypeOp = [{ label: string; value: number }];

interface IProps {}

interface IState {
  /* For  Arguments */
  appendElement: boolean;
  operation: string;
  elements: any[];
  arrayOfElements: JSX.Element[];
  unmountAddArg: boolean[];
  counter: number;
  updateArguments: boolean;
  argumentsArr: ArgType[];
  argumentsList: LinkedList<number>;
  value: string;
  id: string[];
  keyCounter: number;

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
    elements: [],
    arrayOfElements: [],
    unmountAddArg: [true, false],
    counter: 0,
    updateArguments: false,
    argumentsArr: [],
    argumentsList: new LinkedList<number>(),
    value: '',
    id: ["0"],
    keyCounter: 0,
    
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

  componentDidMount()
  {
    
  }

  componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {
    if (this.state.appendElement) {
      let elements_ = this.state.elements;
      let counter_ = this.state.counter;
      let arrayOfElements = this.state.arrayOfElements;
      let unmountAddArg_ = this.state.unmountAddArg;

      if (counter_ === 0) unmountAddArg_[0] = false;
      else unmountAddArg_[1] = true;

      elements_.push(arrayOfElements);

      this.setState({ unmountAddArg: unmountAddArg_ });
      this.setState({ counter: counter_ + 1 });
      this.setState({ elements: elements_ });
      this.setState({ appendElement: false });
    }
    if (this.state.updateMenu) {
      this.setState({ menu: this.state.tempMenu });
      this.setState({ updateMenu: false });
    }
    if (this.state.updateArguments) {

     
      for (var i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(i.toString());
       //  console.log("--->  " + item);
      }

      this.setState({ updateArguments: !this.state.updateArguments });
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    if (
      this.state.appendElement !== nextState.appendElement ||
      this.state.updateMenu !== nextState.updateMenu ||
      this.state.updateArguments !== nextState.updateArguments ||
      this.state.id !== nextState.id ||
      this.state.keyCounter !== nextState.keyCounter
    ) {
      return true;
    }
    return false;
  }

  evaluateOperation(operation: Operation, args: Args): boolean {
    /* ...todo: implement an evaluator for your operations, 
      given some args */
  }

  setSelectedValue(e: React.FormEvent<HTMLSelectElement>) {
    const val = e.currentTarget.value;
    this.setState({value: val});

    
    const id = this.state.id;
    console.log("coun " + id);
    console.log("key " + this.state.keyCounter);
    
    let flag = false;

    // Read all of the values of the arguments
    for (let i = 0; i < localStorage.length; i++) {
      const key: any = localStorage.key(i);
      //console.log(key);
      if (key === id) {
        
        // Replace values
        let item = localStorage.getItem(key);
        const json = JSON.parse(JSON.stringify(item));

        let newRes = {
          id: id,
          found: true,
          value:
            json.value === undefined
              ? { text: "", select: val }
              : { text: json.value.text, select: val }
        };

        localStorage.setItem(id, JSON.stringify(newRes));
        flag = true;
        break;
      }
    }

    if (!flag) {
      // New entry
      let newRes = {
        id: id,
        found: true,
        value: { text: "", select: val }
      };

      localStorage.setItem(id, JSON.stringify(newRes));
    }

    this.setState({ updateArguments: !this.state.updateArguments });
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
    var array: JSX.Element[] = [];
    const select = this.createSelect();
    const textField = this.createTextField();

    let arrayOfElements = this.arrayOfElements();
    let min = Number.MIN_VALUE;
    let id_ = 0;

    for (let index = 0; index < arrayOfElements.length; index++) {
      const element = arrayOfElements[index];
      const getValues = (element: Element) => {
        const element_ = JSON.parse(JSON.stringify(element))[0];
        let id = element_.props.id;
        return parseInt(id, 0);
      };

      id_ = getValues(element) > min ? getValues(element) : min;
      min = getValues(element) > min ? getValues(element) : min;
    }

    if (id_ === Number.MIN_VALUE) return array;

    const finalID = (id_ + 1).toString();
    this.setState({ id: finalID });
    this.setState({ keyCounter: this.state.keyCounter + 1 });

    const html = (
      <div id={finalID} style={{ display: "inline-block" }}>
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
        <input type="text" size="5" id={this.state.id} />
      </div>
    );

    return textfield;
  }

  createSelect(): JSX.Element {
    const select = (
      <div style={{ width: "15ex", display: "inline-block" }}>
        <select
          name="boolean"
          id={this.state.id}
          onChange={this.setSelectedValue}
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
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
    value: ArgArray<ArgTypeOp>
    //meta: ActionMeta<ArgTypeOp>
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
        <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
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

  arrayOfElements() {
    var elements_ = this.state.elements;
    return elements_.map((element) => element);
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
          <select id="0" onChange={this.setSelectedValue}>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
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

        {this.arrayOfElements()}
        {this.createButton()}

        <div style={{ transform: "translateY(30px)" }}>
          {this.state.menu}
          {this.resetButton()}
        </div>
      </div>
    );
  }
}



