import React from "react";

type Args = { operator: string; argument: string };
type Operation = { id: string; argument: string; operation: string };

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
  selectOptionsArray: JSX.Element[];
  tempSelectOptionsArray: JSX.Element[];
  updateSelectOptions: boolean;

  // Store Operations in linked list
  operationArray: Operation[];
  boolArgsArray: Args[];
  appendOperationsArray: boolean;
  appendBoolArgsArray: boolean;

  // Options
  argumentOptions: JSX.Element[];
  optionsId: number;

  selectedArgumentOption: number;
  menu: JSX.Element;
  tempMenu: JSX.Element;
  hideMenu: boolean;

  updateResult: boolean;
  tempResult: boolean;
  operationResult: boolean;
  currentOperation: any;
}

const menu = [
  { label: "Constant", value: 0 },
  { label: "Argument", value: 1 },
  { label: "And", value: 2 },
  { label: "Or", value: 3 },
  { label: "Xor", value: 4 }
];

var storeOperators = [];

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
    value: "",
    idArr: [],
    id: 0,
    keyCounter: 0,

    /* -------------- */
    /* For operatons */
    /* -------------- */

    // Arguments
    arrayOfOperators: [],
    tempOperatorArr: [],
    operationId: 0,
    operationIdArr: [],
    updateOperation: false,
    selectOptionsArray: [],
    updateSelectOptions: false,
    tempSelectOptionsArray: [],
    selectedArgumentOption: 5,

    // Store Operations in linked list
    operationArray: [],
    boolArgsArray: [],
    appendOperationsArray: false,
    appendBoolArgsArray: false,

    // Options
    argumentOptions: [],
    optionsId: 0,

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

    this.menuOptions(0, 0, "");

    let res = {
      id: "0",
      argument: "true"
    };

    localStorage.setItem("arg", JSON.stringify(res));

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
    if (this.state.appendBoolArgsArray) {
      let boolArgsArray = [...this.state.boolArgsArray];
      let val = localStorage.getItem("op");
      let res = false;

      if (val !== null || val !== undefined) {
        const op_json = JSON.parse(JSON.stringify(val));
        const id = JSON.parse(op_json).id;
        let storage = "";
        let arg = "";
        if (id !== "") {
          storage = JSON.parse(JSON.stringify(localStorage.getItem(id)));
          arg = JSON.parse(storage).value.text;
        }

        const op = JSON.parse(op_json).argument;
        //if (id === "") storeOperators.push(op);
        // Call evaluators here
        boolArgsArray[id] = { operator: op, argument: arg };
        this.setState({ boolArgsArray: boolArgsArray });
        res = this.evaluateOperation(boolArgsArray);
        //console.log(boolArgsArray[id]);
      }
      this.setState({ operationResult: res });
      this.setState({ appendBoolArgsArray: false });
    }

    if (this.state.updateResult) {
      const opArr = [...this.state.operationArray];

      let res = false;

      for (let index = 0; index < localStorage.length; index++) {
        const key = index.toString();
        let val = localStorage.getItem(key);
        if (val !== null || val !== undefined) {
          let json = JSON.parse(JSON.stringify(val));
          if (json !== null) {
            const id = JSON.parse(json).id;
            const op = JSON.parse(json).value.select;
            const arg = JSON.parse(json).value.text;

            opArr[index] = { id: id, argument: arg, operation: op };
          }
        }
      }
      this.setState({ operationResult: res });
      this.setState({ updateResult: false });
    }
    if (this.state.updateOperation) {
      let arr = this.state.tempOperatorArr;

      this.setState({ arrayOfOperators: arr });
      this.setState({ updateOperation: false });
    }
    if (this.state.updateSelectOptions) {
      //console.log(this.state.arrayOfOperators)
      this.setState({ selectOptionsArray: this.state.tempSelectOptionsArray });
      //  this.forceUpdate();
      this.setState({ updateSelectOptions: false });
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
      this.state.updateOperation !== nextState.updateOperation ||
      this.state.updateSelectOptions !== nextState.updateSelectOptions ||
      this.state.tempSelectOptionsArray.length !==
        nextState.tempSelectOptionsArray.length ||
      this.state.appendOperationsArray !== nextState.appendOperationsArray ||
      this.state.appendBoolArgsArray !== nextState.appendBoolArgsArray
    ) {
      return true;
    }
    return false;
  }

  evaluateOperation(args: Args[]): boolean {
  /*  console.log(args);
    const iterate = (item: any) => {
      if (item !== null || item !== undefined) {
        const json = JSON.parse(JSON.stringify(item));
        console.log("who we are");
        console.log(json.operator + " " + json.argument);
      }
    };
    args.forEach(iterate);*/

    var array: JSX.Element[] = [];
    let arrayOfOperations = this.arrayOfOperations();

    for (let index = 0; index < arrayOfOperations.length; index++) {
      const element = arrayOfOperations[index];
      const getValues = (element: Element) => {
        if(element !== undefined)
        {
          console.log(index);
          console.log(JSON.stringify(element))
       //   const element_ = JSON.parse(JSON.stringify(element))[0];

        }
       
      //  console.log(element_);
     /*   let id = element_.props.id;
        return parseInt(id, 0);*/
      }

      getValues(element);
    
    }







    return true;

  }

  setTextValue(e: React.FormEvent<HTMLInputElement>) {
    let text = e.currentTarget.value;
    let id = e.currentTarget.id;
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
    this.setState({ updateResult: true });
  }

  setSelectedValue(e: React.FormEvent<HTMLSelectElement>) {
    let select = e.currentTarget.value;
    let id = e.currentTarget.id;
    let flag = false;
    let res;
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

        res = {
          id: id.toString(),
          argument: select
        };

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

      res = {
        id: id.toString(),
        argument: select
      };
    }

    const val_ = !localStorage.getItem("arg");

    if (val_ !== null || val_ !== undefined)
      localStorage.setItem("arg", JSON.stringify(res));
    else localStorage.setItem("arg", JSON.stringify(res));

    if (this.state.currentOperation === "Arguments") {
      var boolValue = select === "true";
      this.setState({ tempResult: boolValue });
      this.setState({ updateResult: true });
    }

    this.setState({ updateResult: true });
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

  OperationBuilder(e: React.FormEvent<HTMLSelectElement>) {
    const val = e.currentTarget.value;
    const id = parseInt(e.currentTarget.id, 0);

    let res = {};
    const val_ = !localStorage.getItem("op");

    console.log(id);
    switch (val) {
      case "arguments":
        this.menuOptions(1, id, val);
        this.MenuInterface(1, id.toString());
        break;
      case "constant":
        this.menuOptions(2, id, val);
        this.MenuInterface(2, id.toString());
        break;
      case "not-operator":
        let arr = this.state.operationIdArr;
        let id_ = this.state.operationId + 1;
        this.setState({ operationId: id_ });
        arr[this.state.operationId] = id_;
        this.setState({ operationIdArr: arr });
        this.MenuInterface(3, id_.toString());

       
        break;
    }
  }

  MenuInterface(key: number, id: string) {
    let id_ = parseInt(id, 0);
    let res = {};
    const val_ = !localStorage.getItem("op");
    switch (key) {
      case 1:
        this.setState({ currentOperation: "Arguments" });
        if (id !== "0") {
          this.setState({ updateOperation: true });
          break;
        }
        this.setState({ tempMenu: this.createArgumentsMenu(parseInt(id, 0)) });
        break;
      case 2:
        this.setState({ currentOperation: "Constant" });
        if (id !== "0") {
          this.setState({ updateOperation: true });
        }
        this.setState({ tempMenu: this.createConstantMenu(parseInt(id, 0)) });

        break;
      case 3:
        // operations arr
        this.createArgumentParameters(this.state.operationId);

        res = {
          id: '',
          argument: "not"
        };

        if (val_ !== null || val_ !== undefined)
          localStorage.setItem("op", JSON.stringify(res));
        else localStorage.setItem("op", JSON.stringify(res));

        this.setState({ appendBoolArgsArray: true });
        
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
  }

  getArgumentsValue(
    e: React.FormEvent<HTMLSelectElement> | React.FormEvent<HTMLOptionElement>
  ) {
    const result = JSON.parse(e.currentTarget.value);
    const val = JSON.parse(result).value.select;
    const argsId = JSON.parse(result).id;

    let res = {
      id: argsId,
      argument: val
    };
    const val_ = !localStorage.getItem("op");

    if (val_ !== null || val_ !== undefined)
      localStorage.setItem("op", JSON.stringify(res));
    else localStorage.setItem("op", JSON.stringify(res));

    this.setState({ appendBoolArgsArray: true });
    this.setState({ updateResult: true });
  }

  getConstantValue(e: React.FormEvent<HTMLSelectElement>) {
    const select = e.currentTarget.value;
    var boolValue = select === "true";
    this.setState({ tempResult: boolValue });
    this.setState({ updateResult: true });
  }

  storeArguments(): void {
    var arguments_ = [...this.state.argumentsArr];
    for (var i = 0; i < localStorage.length; i++) {
      arguments_[i] = localStorage.getItem(i.toString());
    }
    this.setState({ argumentsArr: arguments_ });
  }

  /* ----------------------------- */
  /* ----- Menu JSX Elements ----- */
  /* ----------------------------- */
  // Call every time a default menu is created
  menuOptions(key: number, id: number, val: string) {
    let tempArr = [...this.state.tempOperatorArr];
    let defaultMenu = this.createDefaultMenu(id);
    let argumentsMenu = this.createArgumentsMenu(id);
    let constantMenu = this.createConstantMenu(id);

    switch (key) {
      case 0:
        tempArr[id] = defaultMenu;
        break;
      case 1:
        tempArr[id] = argumentsMenu;
        break;
      case 2:
        tempArr[id] = constantMenu;
        break;
    }
    this.setState({ tempOperatorArr: tempArr });
    this.setState({ updateOperation: true });
  }

  createArgumentParameters(key: number): void {
    let arr = this.state.operationIdArr;
    let id = arr[this.state.operationId];
    if (id === undefined) id = 1;
    else id = id + 1;

    this.menuOptions(0, id, "");
  }

  createConstantMenu(id: number): JSX.Element {
    let select = (
      <div id={"0"} style={{ width: "15ex", display: "inline-block" }}>
        <select onChange={this.getConstantValue} id={id.toString()}>
          <option value="true"> true </option>
          <option value="false"> false</option>
        </select>
      </div>
    );

    return select;
  }

  createArgumentsMenu(id: number): JSX.Element {
    var arguments_ = JSON.parse(JSON.stringify(this.state.argumentsArr));
    // console.log(arguments_);

    let id_ = id.toString();
    let args = (
      <div
        style={{
          width: "15ex",
          float: "left",
          position: "relative",
          zIndex: 999
        }}
      >
        <select
          onChange={this.getArgumentsValue}
          id={id_}
          style={{
            zIndex: 999
          }}
        >
          {arguments_.map((_arguments: any) => {
            if (_arguments === null || _arguments === undefined) return <></>;
            const json = JSON.stringify(_arguments);
            const val = JSON.parse(_arguments).value.text;

            // Bug: array contains a null value
            return <option value={json}>{val}</option>;
          })}
        </select>
      </div>
    );

    return args;
  }

  createDefaultMenu(id: number): JSX.Element {
    let id_ = id.toString();
    let select = (
      <div
        id={id_.toString()}
        style={{
          width: "15ex",
          position: "relative",
          zIndex: 1
        }}
      >
        <select id={id.toString()} onChange={this.OperationBuilder}>
          <option value="none" selected disabled hidden>
            Select...
          </option>
          <option value="arguments">Arguments</option>
          <option value="constant">Constant</option>
          <option value="not-operator">Not</option>
        </select>
      </div>
    );
    return select;
  }

  /* ------------------------ */
  /* ----- JSX Elements ----- */
  /* ------------------------ */

  resetButton(): JSX.Element {
    let arr = [...this.state.tempOperatorArr];
    let newRes = {
      id: "0",
      found: true,
      value: { text: "undefined", select: "true" }
    };
    arr = [this.createDefaultMenu(0)];

    const resetButton = (
      <div style={{ position: "relative", display: "inline-block" }}>
        <button
          type="button"
          onClick={() => {
            this.setState({ tempOperatorArr: [] });
            this.setState({ updateOperation: true });
            this.menuOptions(0, 0, "");
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

    this.setState({ updateResult: true });

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
    // console.log(operations_);
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
          {/*this.state.menu*/}
          {this.arrayOfOperations()}
          {this.resetButton()}

          <div style={{ position: "relative", transform: "translateY(50px)" }}>
            Result:
            {"   " + this.state.operationResult}
          </div>
        </div>
      </div>
    );
  }
}
