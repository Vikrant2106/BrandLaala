import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { chatterType } from "../utils/enum";
import { v4 as uuidv4 } from "uuid";
import { debounce } from "../utils/global/global";

const timelineDebounce = debounce(500);

function useChatter({ initState = [] }) {
  const [state, setState] = useState(initState);
  const oldValue = useRef(initState);

  function getCurrentSection(sectionIdx, clonedState = state) {
    return clonedState.find((section) => section.id === sectionIdx);
  }

  function getSectionMatrix(sectionIdx, clonedState = state) {
    var selectedSection = getCurrentSection(sectionIdx, clonedState);
    return selectedSection.sectionMatrix;
  }

  useEffect(() => {
    if (!_.isEqual(initState, oldValue.current)) {
      oldValue.current = initState;
      setState(initState);
    }
  }, [initState]);

  function getTypeRow(sectionIdx) {
    const sectionMatrix = getSectionMatrix(sectionIdx);
    const result = [];
    sectionMatrix[0].forEach((section) => {
      result.push({ type: section.type, addRowExtra: section?.addRowExtra });
    });
    return result;
  }

  function addRow(sectionIdx, realtime, updateTimeline) {
    var clonedState = _.cloneDeep(state);
    var selectedSection = getCurrentSection(sectionIdx, clonedState);
    selectedSection.sectionMatrix.push(getTypeRow(sectionIdx));
    selectedSection.headerIds.push(uuidv4());
    if (realtime) {
      updateTimeline(clonedState);
    } else setState(clonedState);
  }

  function addColumn(sectionIdx, type, realtime, updateTimeline) {
    var clonedState = _.cloneDeep(state);
    var selectedSection = getCurrentSection(sectionIdx, clonedState);
    selectedSection.sectionMatrix.forEach((section) => {
      let colData = { type };
      if (type === chatterType.dropdown) {
        colData = { ...colData, choices: [], inUseChoices: [] };
      }
      section.push(colData);
    });
    if (realtime) {
      updateTimeline(clonedState);
    } else setState(clonedState);
  }

  function deleteRow(sectionIdx, rowIdx, realtime, updateTimeline) {
    var clonedState = _.cloneDeep(state);
    var selectedSection = getCurrentSection(sectionIdx, clonedState);
    var sectionMatrix = selectedSection.sectionMatrix;
    sectionMatrix.splice(rowIdx + 1, 1);
    selectedSection.headerIds.splice(rowIdx, 1);
    if (realtime) {
      updateTimeline(clonedState);
    } else setState(clonedState);
  }

  function deleteColumn(sectionIdx, colIdx, realtime, updateTimeline) {
    var clonedState = _.cloneDeep(state);
    var selectedSection = getCurrentSection(sectionIdx, clonedState);
    var sectionMatrix = selectedSection.sectionMatrix;
    sectionMatrix.forEach((section) => {
      section.splice(colIdx, 1);
    });
    if (realtime) {
      updateTimeline(clonedState);
    }
    setState(clonedState);
  }

  const updateRowData = (
    sectionIdx,
    rowIdx,
    colIdx,
    value,
    type,
    realtime,
    updateTimeline
  ) => {
    var clonedState = _.cloneDeep(state);
    var selectedSection = getCurrentSection(sectionIdx, clonedState);
    var sectionMatrix = selectedSection.sectionMatrix;

    if (type === chatterType.dropdown) {
      let selectedColumn = sectionMatrix[0][colIdx];
      if (!sectionMatrix[rowIdx][colIdx].value) {
        if (selectedColumn.inUseChoices) {
          selectedColumn.inUseChoices.push(value);
        } else {
          selectedColumn.inUseChoices = [value];
        }
      } else {
        const currentValue = sectionMatrix[rowIdx][colIdx].value;
        selectedColumn.inUseChoices = selectedColumn.inUseChoices.filter(
          (choice) => choice !== currentValue
        );
        selectedColumn.inUseChoices.push(value);
      }
    }

    sectionMatrix[rowIdx][colIdx].value = value;
    if (realtime) {
      timelineDebounce(() => updateTimeline(clonedState));
    }
    setState(clonedState);
  };

  const updateHeaderData = (
    sectionIdx,
    colIdx,
    value,
    realtime,
    updateTimeline
  ) => {
    const clonedState = _.cloneDeep(state);
    var selectedMatrix = getSectionMatrix(sectionIdx, clonedState);
    selectedMatrix[0][colIdx].value = value;
    if (realtime) {
      timelineDebounce(() => updateTimeline(clonedState));
    }
    setState(clonedState);
  };

  function addNewSection(realtime, updateTimeline) {
    const defaultState = {
      sectionName: "",
      sectionMatrix: [[{ type: chatterType.text, value: "Tasks" }]],
      permissionsMatrix: [],
      headerIds: [],
      id: uuidv4(),
    };
    if (realtime) {
      updateTimeline([...state, defaultState]);
    } else setState((state) => [...state, defaultState]);
  }

  function removeSection(sectionIdx, realtime, updateTimeline) {
    var clonedState = state.filter((section) => section.id !== sectionIdx);
    if (realtime) {
      updateTimeline(clonedState);
    } else setState(clonedState);
  }

  function handleSectionNameChange(
    sectionIdx,
    value,
    realtime,
    updateTimeline
  ) {
    var clonedState = _.cloneDeep(state);
    var selectedSection = getCurrentSection(sectionIdx, clonedState);
    selectedSection.sectionName = value;
    if (realtime) {
      timelineDebounce(() => updateTimeline(clonedState));
    } else {
      setState(clonedState);
    }
  }

  function addChoice(sectionIdx, colIdx, choice, realtime, updateTimeline) {
    const clonedState = _.cloneDeep(state);
    const sectionMatrix = getSectionMatrix(sectionIdx, clonedState);
    sectionMatrix[0][colIdx].choices.push(choice);
    if (realtime) {
      updateTimeline(clonedState);
    } else setState(clonedState);
  }

  function removeChoice(sectionIdx, colIdx, value, realtime, updateTimeline) {
    const clonedState = _.cloneDeep(state);
    const sectionMatrix = getSectionMatrix(sectionIdx, clonedState);
    const column = sectionMatrix[0][colIdx];
    if (column.inUseChoices.includes(value)) return;
    const idx = column.choices.indexOf(value);
    column.choices.splice(idx, 1);
    if (realtime) {
      updateTimeline(clonedState);
    } else setState(clonedState);
  }

  function handleSectionHeaderValueChange(
    sectionIdx,
    colIdx,
    value,
    realtime,
    updateTimeline
  ) {
    const clonedState = _.cloneDeep(state);
    const currentSection = getCurrentSection(sectionIdx, clonedState);
    if (currentSection.sectionHeaderValues) {
      if (currentSection.sectionHeaderValues[colIdx]) {
        currentSection.sectionHeaderValues[colIdx].value = value;
      } else {
        currentSection.sectionHeaderValues[colIdx] = {
          value,
        };
      }
    } else {
      currentSection.sectionHeaderValues = [];
      currentSection.sectionHeaderValues[colIdx] = {
        value,
      };
    }

    if (realtime) {
      timelineDebounce(() => updateTimeline(clonedState));
    }

    setState(clonedState);
  }

  return {
    state,
    addRow,
    addColumn,
    deleteRow,
    deleteColumn,
    updateRowData,
    updateHeaderData,
    addNewSection,
    removeSection,
    handleSectionNameChange,
    addChoice,
    removeChoice,
    handleSectionHeaderValueChange,
  };
}

export default useChatter;
