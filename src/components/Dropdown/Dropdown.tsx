import React, {
  useState,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import Select from "react-select";

// This defines the props that the Dropdown component expects to receive.

interface DropdownProps {
  setInitialSearchQuery: Dispatch<SetStateAction<string>>;
}

// These are the options that will be displayed in the dropdown.

const options = [
  { value: "trending", label: "Trending" },
  { value: "new", label: "New" },
];

// This is the actual Dropdown component.

const Dropdown: FC<DropdownProps> = ({ setInitialSearchQuery }) => {
  // This is the state for the currently selected option in the dropdown.
  const [selected, setSelected] = useState(options[0]);

  // This is the event handler that will be called when the user selects a new option.

  const handleChange = (option: any) => {
    setSelected(option);
    setInitialSearchQuery(option.value);
  };

  // This is the JSX that will be rendered to the DOM.
  return (
    <div className="flex justify-center">
      <div className="relative">
        <Select
          value={selected}
          onChange={handleChange}
          options={options}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </div>
    </div>
  );
};

export default Dropdown;
