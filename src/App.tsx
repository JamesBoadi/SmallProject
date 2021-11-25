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
  idArr: number[];
  id: number;
  keyCounter: number;

  /* For operatons */
  arrayOfOperators: any[];
  tempOperatorArr: JSX.Element[];

  operationId: number;
  operationIdArr: number[];

  updateOperation: boolean;
  updateMenu: boolean;
  listOfArguments_op: ArgTypeOp;
  selectedArgumentOption: number;
  menu: JSX.Element;
  tempMenu: JSX.Element;
  hideMenu: boolean;

  updateResult: boolean;
  tempResult: boolean;
  operationResult: boolean;
  currentOperation: any;
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
    this.setTextValue = this.setTextValue.bind(this);
    this.OperationBuilder = this.OperationBuilder.bind(this);
    this.createDefaultMenu = this.createDefaultMenu.bind(this);
    this.getArgumentsValue = this.getArgumentsValue.bind(this);
    this.getConstantValue = this.getConstantValue.bind(this);
    this.createArgumentParameters = this.createArgumentParameters.bind(this);
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
    idArr: [],
    id: 0,
    keyCounter: 0,

    /* -------------- */
    /* For operatons */
    /* -------------- */

    arrayOfOperators: [],
    tempOperatorArr: [],
    operationId: 0,
    operationIdArr: [],
    updateOperation: false,

    selectedArgumentOption: 5,

    // Arguments
    listOfArguments_op: [{ label: "", value: 0 }],

    // And Operator

    // Not Operator
    hideMenu: false,
    menu: <></>,
    tempMenu: <></>,
    updateMenu: false,

    updateResult: false,
    tempResult: false,
    operationResult: false,
    currentOperation: null
  };

  componentDidMount() {
    if (localStorage.length !== this.state.keyCounter) localStorage.clear();

    let newRes = {
      id: "0",
      found: true,
      value: { text: "undefined", select: "true" }
    };

    localStorage.setItem("0", JSON.stringify(newRes));
    this.storeArguments();

    this.setState({ tempMenu: this.createDefaultMenu(0) });
    this.setState({ operationId: this.state.operationId + 1 });
    this.setState({ updateMenu: true });
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
    if (this.state.updateResult) {
      this.setState({ operationResult: this.state.tempResult });
      this.setState({ updateResult: false });
    }
    if (this.state.updateOperation) {
      let arr = this.state.tempOperatorArr;
      // console.log(arr);
      this.setState({ arrayOfOperators: arr });
      this.setState({ updateOperation: false });
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
      this.state.hideMenu !== nextState.hideMenu ||
      this.state.updateResult !== nextState.updateResult ||
      this.state.currentOperation !== nextState.currentOperation ||
      this.state.tempResult !== nextState.tempResult ||
      this.state.operationId !== nextState.operationId ||
      this.state.operationIdArr.length !== nextState.operationIdArr.length ||
      this.state.updateOperation !== nextState.updateOperation
    ) {
      return true;
    }
    return false;
  }

  evaluateOperation(operation: Operation, args: Args): boolean {
    /* ...todo: implement an evaluator for your operations, 
      given some args */
  }

  setTextValue(e: React.FormEvent<HTMLInputElement>) {
    let text = e.currentTarget.value;
    let id = e.currentTarget.id;

    // this.setState({ value: val });

    console.log("coun " + id);
    let flag = false;

    // Read all of the values of the arguments
    for (let i = 0; i < localStorage.length; i++) {
      const key: any = localStorage.key(i);
      //console.log(key);
      if (key === id) {
        // Replace values
        let item = localStorage.getItem(key);
        const json = JSON.parse(JSON.stringify(item));
        let val = JSON.parse(json).value;
        let newRes = {
          id: id,
          found: true,
          value:
            val.select === undefined
              ? { text: text, select: "true" }
              : { text: text, select: val.select }
        };

        localStorage.removeItem(id);
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
        value: { text: text, select: "true" }
      };
      localStorage.setItem(id, JSON.stringify(newRes));
    }

    this.setState({ updateArguments: !this.state.updateArguments });
  }

  setSelectedValue(e: React.FormEvent<HTMLSelectElement>) {
    let select = e.currentTarget.value;
    let id = e.currentTarget.id;

    // this.setState({ value: val });
    // console.log("counter " + id);
    let flag = false;

    // Read all of the values of the arguments
    for (let i = 0; i < localStorage.length; i++) {
      const key: any = localStorage.key(i);

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
              ? { text: "undefined", select: select }
              : { text: val.text, select: select }
        };

        localStorage.removeItem(id);
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
        value: { text: "undefined", select: "true" }
      };
      localStorage.setItem(id, JSON.stringify(newRes));
    }

    if (this.state.currentOperation === "Arguments") {
      var boolValue = select === "true";
      this.setState({ tempResult: boolValue });
      this.setState({ updateResult: true });
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

  /* -------------------------- */
  /* ----- For Operations ----- */
  /* -------------------------- */

  OperationsEvaluator(): void {}

  OperationBuilder(e: React.FormEvent<HTMLSelectElement>) {
    const val = e.currentTarget.value;
    const id = e.currentTarget.id;

    console.log(id);

    switch (val) {
      case "arguments":
        this.MenuInterface(1, id);
        break;
      case "constant":
        this.MenuInterface(2, id);
        break;

      case "not-operator":
        let arr = this.state.operationIdArr;
        let id_ = this.state.operationId;
        this.setState({ operationId: id_ + 1 });
        arr[this.state.operationId] = id_ + 1;
        this.setState({ operationIdArr: arr });
        this.MenuInterface(3, id);
        break;
      default:
        break;
    }
  }

  MenuInterface(key: number, id: string) {
    switch (key) {
      case 1:
        this.setState({ tempMenu: this.createArgumentsMenu() });
        this.setState({ currentOperation: "Arguments" });
        this.setState({ updateMenu: true });
        break;
      case 2:
        this.setState({ tempMenu: this.createConstantMenu() });
        this.setState({ currentOperation: "Constant" });
        this.setState({ updateMenu: true });
        break;
      case 3:
        // operations arr
        var arr = this.createArgumentParameters(this.state.operationId);

        this.setState({ tempOperatorArr: arr });
        this.setState({ currentOperation: "Not-Operator" });
        this.setState({ updateOperation: true });
        break;
      case 4:
        break;
      case 5:
        break;

      default:
        this.setState({ tempMenu: this.createDefaultMenu(0) });
        this.setState({ currentOperation: null });
        this.setState({ updateMenu: true });
        break;
    }
    /*
    if (id === "0") {
      this.setState({ updateMenu: true });
      return;
    }

    this.setState({ updateOperation: true });*/
  }

  getArgumentsValue(
    e: React.FormEvent<HTMLSelectElement> | React.FormEvent<HTMLOptionElement>
  ) {
    const val = e.currentTarget.value;
    const json = JSON.parse(JSON.stringify(localStorage.getItem(val)));
    const item = JSON.parse(json);

    // console.log(item.value.select);

    this.setState({ tempResult: item.value.select });
    this.setState({ updateResult: true });
  }

  getConstantValue(e: React.FormEvent<HTMLSelectElement>) {
    const select = e.currentTarget.value;
    var boolValue = select === "true";
    this.setState({ tempResult: boolValue });
    this.setState({ updateResult: true });
  }

  storeArguments(): void {
    var arguments_ = this.state.argumentsArr;
    for (var i = 0; i < localStorage.length; i++) {
      arguments_[i] = localStorage.getItem(i.toString());
    }
    this.setState({ argumentsArr: arguments_ });
  }

  /* ----------------------------- */
  /* ----- Menu JSX Elements ----- */
  /* ----------------------------- */

  createArgumentParameters(key: number): JSX.Element[] {
    let array = this.state.tempOperatorArr;

    let arr = this.state.operationIdArr;
    let id = arr[this.state.operationId];
    if (id === undefined) id = 1;
    else id = id + 1;

    const menu1 = (
      <div
        style={{
          position: "absolute",
          top: "25px",
          left: "10px",
          display: "inline-block"
        }}
      >
        {this.createDefaultMenu(id)}
      </div>
    );

    const menu2 = (
      <div
        style={{
          position: "relative",
          top: "25px",
          left: "10px",
          display: "inline-block"
        }}
      >
        {this.createDefaultMenu(id + 1)}
      </div>
    );

    const css1 = {
      display: "flex"
      // verticalAlign: "middle"
    };

    const css2 = {
      position: "relative",
      display: "inline-block",
      transform: "translateY(10px)"
    };

    const html1 = (
      <div style={css1}>
        {menu1}
        {menu2}
      </div>
    );

    const html2 = <div style={css2}>{menu2}</div>;

    array.push(html1);
    // array.push(html2);

    return array;
  }

  createConstantMenu(): JSX.Element {
    const select = (
      <div id={"0"} style={{ width: "15ex", display: "inline-block" }}>
        <select onChange={this.getConstantValue} id="0">
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </div>
    );

    return select;
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
        <select onChange={this.getArgumentsValue} name="arguments">
          {arguments_.map((_arguments: any) => {
            const id = JSON.parse(_arguments).id;
            const val = JSON.parse(_arguments).value.text;
            // Bug: id attri does not return a value, but value does
            return <option value={id.toString()}>{val}</option>;
          })}
        </select>
      </div>
    );

    return args;
  }

  createDefaultMenu(key: number): JSX.Element {
    let id_ = key.toString();
    const select = (
      <div
        id={id_.toString()}
        style={{
          width: "15ex",
          float: "left"
        }}
      >
        {!this.state.hideMenu && (
          <select id={id_.toString()} onChange={this.OperationBuilder}>
            <option value="none" selected disabled hidden>
              Select...
            </option>
            <option value="arguments">Arguments</option>
            <option value="constant">Constant</option>
            <option value="not-operator">Not</option>
          </select>
        )}
      </div>
    );

    return select;
  }

  /* ------------------------ */
  /* ----- JSX Elements ----- */
  /* ------------------------ */

  addOperatorButton(): JSX.Element {
    const addOperatorButton = (
      <div style={{ position: "relative", display: "inline-block" }}>
        <button
          type="button"
          onClick={() => {
            this.MenuInterface(0, "");
          }}
        >
          Reset
        </button>
      </div>
    );

    return addOperatorButton;
  }

  resetButton(): JSX.Element {
    const resetButton = (
      <div style={{ position: "relative", display: "inline-block" }}>
        <button
          type="button"
          onClick={() => {
            this.MenuInterface(0, "");
          }}
        >
          Reset
        </button>
      </div>
    );

    return resetButton;
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

    if (id_ === Number.MIN_VALUE) id_ = 1;
    const finalID = id_ + 1;

    idArr.push(finalID);

    // console.log("arr "+idArr);

    this.setState({ id: finalID });
    this.setState({ idArr: idArr });
    this.setState({ keyCounter: this.state.keyCounter + 1 });

    // Create New Entry
    let newRes = {
      id: finalID,
      found: true,
      value: { text: "undefined", select: "true" }
    };

    localStorage.setItem(finalID.toString(), JSON.stringify(newRes));

    this.storeArguments();

    const html = (
      <div id={finalID.toString()} style={{ display: "inline-block" }}>
        {select}
        {textField}
      </div>
    );
    array.push(html);
    return array;
  }

  createTextField(): JSX.Element {
    // Temp work around, since react state is asynchronous
    let arr = this.state.idArr;
    let id = arr[this.state.id];
    if (id === undefined) id = this.state.id + 1;
    else id = this.state.id + 2;

    const textfield = (
      <div style={{ float: "left", height: "70" }}>
        <input
          type="text"
          size="5"
          id={id.toString()}
          onChange={this.setTextValue}
        />
      </div>
    );
    return textfield;
  }

  createSelect(): JSX.Element {
    // Temp work around, since react state is asynchronous
    let arr = this.state.idArr;
    let id = arr[this.state.id];
    if (id === undefined) id = this.state.id + 1;
    else id = this.state.id + 2;

    const select = (
      <div style={{ width: "15ex", display: "inline-block" }}>
        <select
          name="boolean"
          id={id.toString()}
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

  /* -------------------- */
  /* ---- Rendering ----- */
  /* -------------------- */
  arrayOfElements() {
    var elements_ = this.state.elements;
    return elements_.map((element) => element);
  }

  arrayOfOperations() {
    var operations_ = this.state.arrayOfOperators;
    return operations_.map((element) => element);
  }

  render() {
    return (
      <div>
        {/* todo: use <OperationBuilder> and have an interface
            for entering arguments and seeing the result */}
        <div id={"0"} style={{ float: "left", height: "70" }}>
          <input id="0" onChange={this.setTextValue} type="text" size="5" />
        </div>

        <div id={"0"} style={{ width: "15ex", display: "inline-block" }}>
          <select id="0" onChange={this.setSelectedValue}>
            <option onClick={this.getArgumentsValue} value="true">
              true
            </option>
            <option onClick={this.getArgumentsValue} value="false">
              false
            </option>
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
          {this.state.menu}
          {this.resetButton()}

          {this.arrayOfOperations()}

          <div style={{ position: "relative", transform: "translateY(50px)" }}>
            Result:
            {"   " + this.state.operationResult}
          </div>
        </div>
      </div>
    );
  }
}
