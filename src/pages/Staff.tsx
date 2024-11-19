import React, { useReducer } from "react";
import { Input, message, Select } from "antd";
import { Staffs, Size } from "../data";
import { formatNumberWithCommas } from "../Utils";
import { InitialStateCalculation } from "../Intereface";


const { Option } = Select;

type Action =
  | { type: "UPDATE", field: "staff_name" | "size" | "quantityRaw", value: string }
  | { type: "UPDATE", field: "quantity", value: number }
  | { type: "RESET" };

const Staff: React.FC = () => {
  const initialState: InitialStateCalculation = {
    staff_name: "",
    size: "small",
    quantity: 0,
    quantityRaw: "",
    total: 0,
  };

  function reducer(state: InitialStateCalculation, action: Action): InitialStateCalculation {
    switch (action.type) {
      case "UPDATE":
        if (action.field === "size") {
          const sizeMultiplier = action.value === "small" ? 800 : action.value === "big" ? 500 : 1;
          const newTotal = state.quantity * sizeMultiplier;
          return { ...state, [action.field]: action.value, total: newTotal };
        }
        if (action.field === "quantity") {
          const sizeMultiplier = state.size === "small" ? 800 : state.size === "big" ? 500 : 1;
          const newTotal = action.value * sizeMultiplier;
          return { ...state, quantity: action.value, total: newTotal };
        }
        if (action.field === "quantityRaw") {
          return { ...state, quantityRaw: action.value };
        }
        return { ...state, [action.field]: action.value };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  // const [showKeyboard, setShowKeyboard] = useState(false);

  const handleStaffChange = (value: number) => {
    dispatch({
      type: "UPDATE",
      field: "staff_name",
      value: Staffs.find((staff) => staff.id === value)?.name || "",
    });
  };

  const handleSizeChange = (value: number) => {
    const sizeName = Size.find((size) => size.id === value)?.name || "";
    dispatch({ type: "UPDATE", field: "size", value: sizeName });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*\.?\d*$/.test(value)) {
      dispatch({ type: "UPDATE", field: "quantityRaw", value });
      dispatch({ type: "UPDATE", field: "quantity", value: parseFloat(value) || 0 });
    }
  };

  const handleKeyboardInput = (value: string) => {
    if (value === "DELETE") {
      // Remove the last character
      const newValue = state.quantityRaw.slice(0, -1);
      dispatch({ type: "UPDATE", field: "quantityRaw", value: newValue });
      dispatch({ type: "UPDATE", field: "quantity", value: parseFloat(newValue) || 0 });
    } else {
      // Append new character
      const newValue = state.quantityRaw + value;
      if (/^\d*\.?\d*$/.test(newValue)) {
        dispatch({ type: "UPDATE", field: "quantityRaw", value: newValue });
        dispatch({ type: "UPDATE", field: "quantity", value: parseFloat(newValue) || 0 });
      }
    }
  };

  const handleSubmit = () => {
    message.success("Submit successful!")
    console.log(state);
  };

  return (
    <div className="text-black relative h-[90vh]">
      <h1 className="text-center text-2xl font-[500] mt-3">បុគ្គលិក</h1>
      <div>
        <Select
          value={Staffs.find((staff) => staff.name === state.staff_name)?.id || 0}
          onChange={handleStaffChange}
          size="large"
          className="w-full mt-4 border rounded-[0.55rem] border-gray-400"
        >
          <Option key="0" value={0}>
            Select Staff
          </Option>
          {Staffs.map((staff) => (
            <Option key={staff.id} value={staff.id}>
              {staff.name}
            </Option>
          ))}
        </Select>

        <Select
          value={Size.find((size) => size.name === state.size)?.id || 1}
          onChange={handleSizeChange}
          size="large"
          className="w-full mt-4 border rounded-[0.55rem] border-gray-400 capitalize"
        >
          {Size.map((size) => (
            <Option key={size.id} value={size.id}>
              {size.name1}
            </Option>
          ))}
        </Select>

        <Input
          value={state.quantityRaw}
          onChange={handleQuantityChange}
          // onFocus={() => setShowKeyboard(true)}
          placeholder="00.00"
          size="large"
          className="mt-4 border rounded-[0.55rem] border-gray-400"
        />

        <div className="mt-4 flex justify-between">
          <div className="capitalize text-lg">Name: {state.staff_name || "Name"}</div>
          <div className="flex flex-col gap-2 items-end text-lg leading-5">
            <div className="tracking-wide">{state.quantity}kg</div>
            <div>{state.size === "big" ? "ពុទ្រាធំ" : "ពុទ្រាតូច"}</div>
            <div className="font-[500] italic">{formatNumberWithCommas(state.total)}៛</div>
          </div>
        </div>

      </div>
      {/* Popup Keyboard */}
      

      <div className="bg-white rounded-lg grid grid-cols-3 gap-2 w-full mt-4">
        {[..."7894561230."].map((key) => (
          <button
            key={key}
            onClick={() => handleKeyboardInput(key)}
            className="text-lg p-4 border rounded-md bg-gray-200 hover:bg-gray-300"
          >
            {key}
          </button>
        ))}
        <button
          onClick={() => handleKeyboardInput("DELETE")}
          className=" text-lg p-2 border rounded-md bg-orange-500 text-white font-[500] hover:bg-gray-400"
        >
          Delete
        </button>
      </div>

      <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="text-center text-lg w-full p-3 rounded-md bg-blue-600 mt-4 text-white"
          >
            Submit
          </button>
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="text-center text-lg w-full p-3 rounded-md bg-red-600 mt-4 text-white"
          >
            Reset
          </button>
        </div>
    </div>
  );
};

export default Staff;
