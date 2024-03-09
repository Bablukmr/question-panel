import React, { useState } from "react";
import Header from "./header";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique IDs

function Dashboard() {
  const [boxes, setBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(null);

  const handleAddBox = () => {
    setBoxes([...boxes, { id: uuidv4() }]);
  };

  const handleDeleteBox = (id) => {
    setBoxes(boxes.filter((box) => box.id !== id));
    if (selectedBox === id) {
      setSelectedBox(null);
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectOption(null);
    }
  };

  const handleEditBox = (id) => {
    setSelectedBox(id);
    const selected = boxes.find((box) => box.id === id) || {};
    setQuestion(selected.question || "");
    setOptions([...(selected.options || ["", "", "", ""])]);
    setCorrectOption(selected.correctOption || null);
  };

  const handleSaveBox = () => {
    const updatedBoxes = boxes.map((box) => {
      if (box.id === selectedBox) {
        return {
          ...box,
          question,
          options,
          correctOption,
        };
      }
      return box;
    });
    setBoxes(updatedBoxes);
    setSelectedBox(null);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectOption(null);
  };

  return (
    <div className="m-0 p-0">
      <div>
        <Header />
      </div>

      <div className="w-[100vw] mt-[5px] h-[calc(100vh-70px)] flex items-center justify-center">
        <div className="w-[15%] h-full flex items-start flex-col overflow-y-auto border-r-2 gap-4 px-5 pt-4">
          {boxes.map((box) => (
            <div
              key={box.id}
              className="border-2 border-gray-400 text-gray-400 text-2xl  w-full min-h-[120px] hover:cursor-pointer flex items-center justify-center rounded-lg pt-2 relative"
              onClick={() => handleEditBox(box.id)}
            >
              <span className="absolute top-0 left-0 ml-2 mt-2 text-xs text-gray-500">
                Question {boxes.indexOf(box) + 1}
              </span>
              <div className="px-2 py-1">{box.question}</div>
              {selectedBox === box.id && (
                <button
                  className="absolute top-0 right-0 mr-2 mt-2 text-gray-500 hover:text-red-500"
                  onClick={() => handleDeleteBox(box.id)}
                >
                  <DeleteIcon />
                </button>
              )}
            </div>
          ))}

          <div
            className="border-2 border-gray-400 text-gray-400 text-2xl  w-full min-h-[120px] hover:cursor-pointer flex items-center justify-center rounded-lg py-2"
            onClick={handleAddBox}
          >
            <AddIcon />
          </div>
        </div>
        <div className="w-[85%] h-full flex items-center justify-center">
          {selectedBox !== null && (
            <div>
              <label className="block mb-2">Question</label>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="border border-gray-400 p-2 mb-4 w-full"
              />
              {options.map((option, index) => (
                <div key={index} className="mb-4">
                  <label className="block mb-2">{`Option ${index + 1}`}</label>
                  <div className="flex items-center mb-2">
                    <input
                      value={option}
                      onChange={(e) =>
                        setOptions((prevOptions) =>
                          prevOptions.map((o, i) =>
                            i === index ? e.target.value : o
                          )
                        )
                      }
                      className="border border-gray-400 p-2 flex-grow mr-2"
                    />
                    <input
                      type="radio"
                      name="correctOption"
                      checked={correctOption === index}
                      onChange={() => setCorrectOption(index)}
                    />
                    <label className="ml-2">Correct Option</label>
                  </div>
                </div>
              ))}
              <button
                onClick={handleSaveBox}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
