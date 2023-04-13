import { useState } from "react";
import SchemaDropdown from "./SchemaDropdown";
import "../../App.css";
import { MdKeyboardArrowLeft } from "react-icons/md";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function PopUp({ popUp }) {
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [segmentName, setSegmentName] = useState();
  const [blueBox, setBlueBox] = useState(false);
  const [addedValues, setAddedValue] = useState([]);
  const [changeValue, setChangeValue] = useState();
  const [changeLabel, setChangeLabel] = useState();
  const [schemaConditions, setSchemaCondition] = useState(false);
  const [segmentError, setSegmentError] = useState(false);

  function handleAddSchema(schemaValue) {
    setSelectedSchemas((prevSelected) => [...prevSelected, schemaValue]);
    setChangeLabel();
    setChangeValue();
  }

  function handleRemoveSchema(schemaValue, addedValue) {
    setSelectedSchemas((prevSelected) =>
      prevSelected.filter((s) => s !== schemaValue)
    );
    const updatedItems = addedValue.filter(
      (item) => item.schemaValue !== schemaValue
    );
    setAddedValue(updatedItems);
  }
  const selectedSchemaOptions = schemaOptions.filter(
    (opt) => !selectedSchemas.includes(opt.label)
  );

  const handleServer = (schemaLabel, schemaValue) => {
    setAddedValue((prevSelected) => [
      ...prevSelected,
      { schemaValue, schemaLabel },
    ]);
  };

  /*getting events */

  function handleChanges(event) {
    const schemaLabel = event.target.options[event.target.selectedIndex].text;
    const schemaValue = event.target.value;
    setChangeLabel(schemaLabel);
    setChangeValue(schemaValue);
  }

  /*handling Values */

  function handleSchemaSelect() {
    const schemaLabel = changeLabel;
    const schemaValue = changeValue;
    if (schemaValue) {
      handleServer(schemaLabel, schemaValue);
      handleAddSchema(schemaLabel);
      setBlueBox(true);
      setSchemaCondition(false);
    } else {
      setSchemaCondition(true);
    }
  }

  /* Bluebox DropDown */

  const schemaDropdowns = selectedSchemas.map((schemaValue) => (
    <SchemaDropdown
      key={schemaValue}
      value={schemaValue}
      onRemove={handleRemoveSchema}
      options={selectedSchemaOptions}
      addedValue={addedValues}
    />
  ));

  /*Handling Server  */

  const handleSave = (e) => {
    if (segmentName) {
      setSegmentError(false);
      if (blueBox) {
        e.preventDefault();
        const segmentData = {
          segment_name: segmentName,
          schema: addedValues.map((obj) => ({
            [obj.schemaValue]: obj.schemaLabel,
          })),
        };
        const jsonData = JSON.stringify(segmentData);
        fetch("https://webhook.site/b6a0ae90-d3e8-4c37-9b74-efeec304c99a", {
          crossDomain: true,
          mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error sending segment data", error);
          });
        alert("Successfully Data Sent To Server");
      } else {
        setSchemaCondition(true);
      }
    } else {
      setSegmentError(true);
    }
  };

  return (
    <div className="popup-container">
      <div className="blue-box">
        <div className="dropdown-container">
          {/*title div */}

          <div className="popUp-title">
            <MdKeyboardArrowLeft
              onClick={() => popUp(false)}
              className="arrow"
            />
            <h3> Saving Segment</h3>
          </div>
          <div className="dropDown-menus">
            <div className="segment-Name">
              <p>Enter the Name of the Segment</p>
              <input
                type="text"
                placeholder="Name of the segment"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
              {segmentError && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  Please Enter the Segment Name
                </div>
              )}
              <p>
                To save your segment, you need to add the schemas to build the
                query
              </p>
            </div>
            <div className="Traits-div">
              <p className="User-Traits">
                <span></span>-User Traits
              </p>
              <p className="Group-Traits">
                <span></span>-Group Traits
              </p>
            </div>

            {/*Bluebox */}
            {blueBox && <div className="BlueBox-div">{schemaDropdowns}</div>}

            {/*Add schema */}
            {selectedSchemas.length < 7 && (
              <div className="AddSchema-div">
                <select value={changeValue} onChange={handleChanges}>
                  <option value="">Add schema to segment</option>
                  {selectedSchemaOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {schemaConditions && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    please Select Any option from Dropdown
                  </div>
                )}
                <button onClick={handleSchemaSelect}>+Add new schema</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/*Save Buttons */}
      <div className="Save-Button">
        <button className="saveButton" onClick={handleSave}>
          Save the Segment
        </button>
        <button className="cancelButton" onClick={() => popUp(false)}>
          {" "}
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PopUp;
