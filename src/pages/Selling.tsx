import React, { useState } from "react";
import { Input, Modal } from "antd";
import { formatNumberWithCommas } from "../Utils";

const Selling: React.FC = () => {
  const [isSmallModalVisible, setSmallModalVisible] = useState(false);
  const [isBigModalVisible, setBigModalVisible] = useState(false);

  const [smallQuantity, setSmallQuantity] = useState(""); // State for small modal input
  const [bigQuantity, setBigQuantity] = useState(""); // State for big modal input

  const pricePerKgSmall = 2; // Example price per kg for Small
  const pricePerKgBig = 2; // Example price per kg for Big

  const handleOpenModal = (type: "small" | "big") => {
    if (type === "small") setSmallModalVisible(true);
    if (type === "big") setBigModalVisible(true);
  };

  const handleCloseModal = (type: "small" | "big") => {
    if (type === "small") setSmallModalVisible(false);
    if (type === "big") setBigModalVisible(false);
  };

  const handleNumericInput = (key: string, type: "small" | "big") => {
    if (type === "small") {
      setSmallQuantity((prev) => (key === "." && prev.includes(".") ? prev : prev + key));
    } else {
      setBigQuantity((prev) => (key === "." && prev.includes(".") ? prev : prev + key));
    }
  };

  const handleDeleteInput = (type: "small" | "big") => {
    if (type === "small") {
      setSmallQuantity((prev) => prev.slice(0, -1));
    } else {
      setBigQuantity((prev) => prev.slice(0, -1));
    }
  };

  const totalSmall = smallQuantity ? parseFloat(smallQuantity) * pricePerKgSmall : 0;
  const totalBig = bigQuantity ? parseFloat(bigQuantity) * pricePerKgBig : 0;
  const grandTotal = totalSmall + totalBig;

  return (
    <div className="text-black">
      <div className="grid grid-cols-2 gap-4 mt-4 mb-2">
        <div className="flex flex-col items-center" onClick={() => handleOpenModal("small")}>
          <div className="p-10 w-full text-center rounded-lg bg-green-400 cursor-pointer">
            image
          </div>
          <p>Small</p>
        </div>

        <div className="flex flex-col items-center" onClick={() => handleOpenModal("big")}>
          <div className="p-10 w-full text-center rounded-lg bg-green-400 cursor-pointer">
            image
          </div>
          <p>Big</p>
        </div>
      </div>

      <label htmlFor="">ឈ្មោះអតិថិជន</label>
      <Input size="large" placeholder="ឈ្មោះអតិថិជន" className="border-gray-400 mt-1" />

      {/* table */}
      <table className="w-full mt-5">
        <tr className="border border-gray-400">
          <th className="py-2 border border-gray-400">ទំហំ</th>
          <th>បរិមាណ</th>
        </tr>
        <tr className="border border-gray-400">
          <td className="p-2 border border-gray-400">Small</td>
          <td className="text-center">{formatNumberWithCommas(600)}kg</td>
        </tr>
        <tr className="border border-gray-400">
          <td className="p-2 border border-gray-400">Big</td>
          <td className="text-center">{formatNumberWithCommas(60)}kg</td>
        </tr>
      </table>

      <div className="mt-2">
        <div></div>
        <div className="flex flex-col">
          <div>ពុទ្រាតូច : {formatNumberWithCommas(totalSmall)}$</div>
          <div>ពុទ្រាធំ : {formatNumberWithCommas(totalBig)}$</div>
          <div>លុយសរុប : {formatNumberWithCommas(grandTotal)}$</div>
        </div>
      </div>
      <div>
        <button className="bg-blue-600 text-white w-full p-2 mt-4 text-lg rounded-lg">Submit</button>
      </div>

      {/* Small Modal */}
      <Modal
        title="ពុទ្រាតូច"
        open={isSmallModalVisible}
        onOk={() => handleCloseModal("small")}
        onCancel={() => handleCloseModal("small")}
      >
        <Input size="large" value={smallQuantity} className="border-gray-400 text-lg" readOnly />
        <div className="bg-white rounded-lg grid grid-cols-3 gap-2 w-full mt-4">
          {[..."7894561230."].map((key) => (
            <button
              key={key}
              onClick={() => handleNumericInput(key, "small")}
              className="text-lg p-4 border rounded-md bg-gray-200 hover:bg-gray-300"
            >
              {key}
            </button>
          ))}
          <button
            onClick={() => handleDeleteInput("small")}
            className="text-lg p-2 border rounded-md bg-orange-500 text-white font-[500] hover:bg-gray-400"
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Big Modal */}
      <Modal
        title="ពុទ្រាធំ"
        open={isBigModalVisible}
        onOk={() => handleCloseModal("big")}
        onCancel={() => handleCloseModal("big")}
      >
        <Input size="large" value={bigQuantity} className="border-gray-400 text-lg" readOnly />
        <div className="bg-white rounded-lg grid grid-cols-3 gap-2 w-full mt-4">
          {[..."7894561230."].map((key) => (
            <button
              key={key}
              onClick={() => handleNumericInput(key, "big")}
              className="text-lg p-4 border rounded-md bg-gray-200 hover:bg-gray-300"
            >
              {key}
            </button>
          ))}
          <button
            onClick={() => handleDeleteInput("big")}
            className="text-lg p-2 border rounded-md bg-orange-500 text-white font-[500] hover:bg-gray-400"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Selling;
