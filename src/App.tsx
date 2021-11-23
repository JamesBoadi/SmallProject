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
  argumentsArr: any[];
  argumentsList: LinkedList<number>;
  value: string;
  idArr: string[];
  id: string;
  keyCounter: number;

  /* For operatons */
  updateMenu: boolean;
  listOfArguments_op: ArgTypeOp;
  selectedArgumentOption: number;
  menu: JSX.Element;
  tempMenu: JSX.Element;
  hideMenu: boolean;
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
    this.MenuInterface = this.MenuInterface.bind(this);
    this.setSelectedValue = this.setSelectedValue.bind(this);
    this.OperationBuilder = this.OperationBuilder.bind(this);
    this.createDefaultMenu = this.createDefaultMenu.bind(this);
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
    value: "",
    idArr: ["1"],
    id: "0",
    keyCounter: 0,

    /* For operatons */

    selectedArgumentOption: 5,

    // Arguments
    listOfArguments_op: [{ label: "", value: 0 }],

    // And Operator

    // Not Operator
    hideMenu: false,
    menu: <></>,
    tempMenu: <></>,
    updateMenu: false
  };

  componentDidMount() {
    if (localStorage.length !== this.state.keyCounter) localStorage.clear();

    let newRes = {
      id: "0",
      found: true,
      value: { text: "undefined", select: "undefined" }
    };

    localStorage.setItem("0", JSON.stringify(newRes));
    this.storeArguments();
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
      let arr = this.state.tempMenu;
      this.setState({ menu: arr });
      this.setState({ updateMenu: false });
    }
    if (this.state.updateArguments) {
      // When arguments is selected from list
      this.storeArguments();
      this.setState({ updateArguments: !this.state.updateArguments });
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    if (
      this.state.appendElement !== nextState.appendElement ||
      this.state.updateMenu !== nextState.updateMenu ||
      this.state.updateArguments !== nextState.updateArguments ||
      this.state.id !== nextState.id ||
      this.state.idArr.length !== nextState.idArr.length ||
      this.state.keyCounter !== nextState.keyCounter ||
      this.state.argumentsArr.length !== nextState.argumentsArr.length ||
      this.state.hideMenu !== nextState.hideMenu
    ) {
      return true;
    }
    return false;
  }

  evaluateOperation(operation: Operation, args: Args): boolean {
    /* ...todo: implement an evaluator for your operations, 
      given some args */
  }

  setTextValue(e: React.FormEvent<HTMLSelectElement>) {
    let val = e.currentTarget.value;
    let id = e.currentTarget.id;

    this.setState({ value: val });

    //console.log("coun " + id);
    let flag = false;

    // Read all of the values of the arguments
    for (let i = 0; i < localStorage.length; i++) {
      const key: any = localStorage.key(i);
      //console.log(key);
      if (key === id) {
        // Replace values
        let item = localStorage.getItem(key);
        const json = JSON.parse(JSON.stringify(item));
        const val = JSON.parse(json).value;
        let newRes = {
          id: id,
          found: true,
          value:
            val.select === undefined
              ? { text: val , select: "undefined" }
              : { text: val, select: val.select }
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
        value: { text: val, select: "undefined" }
      };
      localStorage.setItem(id, JSON.stringify(newRes));
    }

    this.setState({ updateArguments: !this.state.updateArguments });
  }

  setSelectedValue(e: React.FormEvent<HTMLSelectElement>) {
    let val = e.currentTarget.value;
    let id = e.currentTarget.id;

    this.setState({ value: val });

    //console.log("coun " + id);
    let flag = false;

    // Read all of the values of the arguments
    for (let i = 0; i < localStorage.length; i++) {
      const key: any = localStorage.key(i);
      //console.log(key);
      if (key === id) {
        // Replace values
        let item = localStorage.getItem(key);
        const json = JSON.parse(JSON.stringify(item));
        const val = JSON.parse(json).value;
        let newRes = {
          id: id,
          found: true,
          value:
            val.text === undefined
              ? { text: "undefined", select: val }
              : { text: val.text, select: val }
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
        value: { text: "undefined", select: val }
      };
      localStorage.setItem(id, JSON.stringify(newRes));
    }

    this.setState({ updateArguments: !this.state.updateArguments });
  }

  // Call this function every time myArg or an operator is selected
  ArgumentsBuilder(key: number): JSX.Element[] {
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

  /* ----- For Operations ----- */

  OperationsEvaluator(): void {}

  OperationBuilder(e: React.FormEvent<HTMLSelectElement>) {
    const val = e.currentTarget.value;

    switch (val) {
      case "arguments":
        this.MenuInterface(1);
        break;
      case "constant":
        break;

      default:
        break;
    }
  }

  storeArguments(): void {
    var arguments_ = this.state.argumentsArr;

    for (var i = 0; i < localStorage.length; i++) {
      // console.log("item " + item);
      arguments_[i] = localStorage.getItem(i.toString());
    }
    this.setState({ argumentsArr: arguments_ });
  }

  MenuInterface(key: number) {
    switch (key) {
      case 1:
        this.setState({ tempMenu: this.createArgumentsMenu() });
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;

      default:
        this.setState({ tempMenu: this.createDefaultMenu() });
        break;
    }

    this.setState({ updateMenu: true });
  }

  /* ----- JSX Elements ----- */

  resetButton(): JSX.Element {
    const resetButton = (
      <div style={{ position: "relative", display: "inline-block" }}>
        <button
          type="button"
          onClick={() => {
            this.MenuInterface(0);
          }}
        >
          Reset
        </button>
      </div>
    );

    return resetButton;
  }

  createArgumentsMenu(): JSX.Element {
    var arguments_ = JSON.parse(JSON.stringify(this.state.argumentsArr));
    const args = (
      <div
        style={{
          width: "15ex",
          float: "left"
        }}
      >
        <select name="arguments">
        {arguments_.map((_arguments: any) => {
            const val = JSON.parse(_arguments).value.select;
            return <option value="arguments">{val}</option>
        })}
          </select>
      </div>
    );

    return args;
  }

  createDefaultMenu(): JSX.Element {
    const select = (
      <div
        style={{
          width: "15ex",
          float: "left"
        }}
      >
        {!this.state.hideMenu && (
          <select onChange={this.OperationBuilder} >
            <option value="none" selected disabled hidden>
              Select...
            </option>
            <option value="arguments" >Arguments</option>
            <option value="constant">Constant</option>
          </select>
        )}
      </div>
    );

    return select;
  }

  addArgument(): JSX.Element[] {
    var array: JSX.Element[] = [];
    const select = this.createSelect();
    const textField = this.createTextField();

    let arrayOfElements = this.arrayOfElements();
    let min = Number.MIN_VALUE;
    let id_ = 0;
    let idArr = this.state.idArr;

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

    if (id_ === Number.MIN_VALUE) id_ = 0;

    const finalID = (id_ + 1).toString();
    idArr[parseInt(finalID, 0)] = finalID;

    this.setState({ id: finalID });
    this.setState({ idArr: idArr });
    this.setState({ keyCounter: this.state.keyCounter + 1 });

    // Create New Entry
    let newRes = {
      id: finalID,
      found: true,
      value: { text: "undefined", select: "undefined" }
    };

    localStorage.setItem(finalID, JSON.stringify(newRes));

    this.storeArguments();

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
        <input
          type="text"
          size="5"
          id={this.state.idArr[parseInt(this.state.id, 0)]}
        />
      </div>
    );
    return textfield;
  }

  createSelect(): JSX.Element {
    const select = (
      <div style={{ width: "15ex", display: "inline-block" }}>
        <select
          name="boolean"
          id={this.state.idArr[parseInt(this.state.id, 0)]}
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
                const arrayOfElements = this.ArgumentsBuilder(0);

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
  /* ---------------------- */
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
                const arrayOfElements = this.ArgumentsBuilder(0);
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
          {this.createDefaultMenu()}
          {this.state.menu}
          {this.resetButton()}
        </div>
      </div>
    );
  }
}


