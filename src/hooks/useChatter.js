import { useEffect, useState } from "react";

import { chatterType } from "../utils/enum";
import { debounce } from "../utils/global/global";
import {
  addChoiceApi,
  createNewSectionApi,
  deleteNewSectionApi,
  newColumnApi,
  newRowApi,
  removeChoiceApi,
  removeColumnApi,
  removeRowApi,
  shiftRowApi,
  updateSectionNameApi,
} from "../utils/apis.utils";
import { userAxios } from "../utils/axios/user.axios";
import { getTransformSection } from "../utils/timeline.utils";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { showFailureToast } from "../store/slices/toast/toast.slice";
import Badge from "@mui/material/Badge";
import { useParams } from "react-router-dom";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { fetchProjectTimelineThunk } from "../store/slices/project/project.slice";

const timelineDebounce = debounce(500);

function useChatter({ columnsIds, columns, sections: sectionsData, id }) {
  const params = useParams();
  const { timeline } = useSelector(({ project }) => project.selectedTimeline);
  const [colIds, setColIds] = useState(columnsIds);
  const [cols, setCols] = useState(columns);
  const [sections, setSections] = useState(sectionsData);
  const [showDrawer, setShowDrawer] = useState(false);
  const [timelineState, setTimelineState] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setColIds(columnsIds);
    setCols(columns);
    setSections(sectionsData);
  }, [columnsIds, columns, sectionsData]);

  function getCurrentSection(sectionIdx) {
    const newSections = [...sections];
    return [
      newSections,
      sections.find((section) => section.sectionIdx === sectionIdx),
    ];
  }

  async function addNewSection() {
    const response = await userAxios.post(createNewSectionApi, {
      project_table_id: id,
    });
    const data = response.data;
    setSections((sections) => [
      ...sections,
      getTransformSection(data.id, data),
    ]);
  }

  async function removeSection(sectionIdx) {
    await userAxios.put(deleteNewSectionApi, {
      project_table_id: id,
      section_id: sectionIdx,
    });
    setSections((sections) =>
      sections.filter((section) => section.sectionIdx !== sectionIdx)
    );
  }

  async function addRow(setionIdx) {
    const response = await userAxios.post(newRowApi, {
      project_table_id: id,
      section_id: setionIdx,
    });
    const data = response.data;
    const rowId = data.id;
    const [sectionsCopy, newSection] = getCurrentSection(setionIdx);
    newSection.rowIds.push(rowId);
    newSection.rows[rowId] = data.values;
    setSections(sectionsCopy);
    dispatch(fetchProjectTimelineThunk(params.id));
  }

  async function removeRow(sectionIdx, rowIdx) {
    await userAxios.put(removeRowApi, {
      project_table_id: id,
      section_id: sectionIdx,
      row_id: rowIdx,
    });

    const [sectionsCopy, newSection] = getCurrentSection(sectionIdx);

    const idx = newSection.rowIds.indexOf(rowIdx);
    newSection.rowIds.splice(idx, 1);
    setSections(sectionsCopy);
  }

  async function addColumn(type) {
    const response = await userAxios.post(newColumnApi, {
      project_table_id: id,
      data: { type: type, value: null },
    });

    const data = response.data;
    const columnId = data.id;
    const newColIds = [...colIds, columnId];
    const newCols = { ..._.cloneDeep(cols), [columnId]: data };
    const newSections = [...sections];

    newSections.forEach((section) => {
      section.rowIds.forEach((rowId) => {
        section.rows[rowId][columnId] = {
          type,
          value: null,
        };
      });
    });

    setColIds(newColIds);
    setCols(newCols);
    setSections(newSections);
  }

  function removeColumn(colId) {
    if (["task", "start", "end"].includes(columns[colId]?.key)) {
      return dispatch(
        showFailureToast({
          message: "Can't Delete This Column",
          vertical: "top",
          horizontal: "right",
        })
      );
    }
    const newColIds = [...colIds];
    const idx = newColIds.indexOf(colId);
    newColIds.splice(idx, 1);
    setColIds(newColIds);
    userAxios.put(removeColumnApi, {
      project_table_id: id,
      column_id: colId,
    });
  }

  function updateHeaderData(colIdx, value, type) {
    const newCols = _.cloneDeep(cols);
    newCols[colIdx].value = value;
    setCols(newCols);

    const applyChanges = () => {
      userAxios.put(newColumnApi, {
        project_table_id: id,
        column_id: colIdx,
        data: {
          value: value,
          type: type,
        },
      });
    };

    timelineDebounce(applyChanges);
  }

  function updateRowData(sectionIdx, rowIdx, colIdx, value, type, resetRow) {
    const [sectionsCopy, newSection] = getCurrentSection(sectionIdx);
    newSection.rows[rowIdx][colIdx].value = value;
    setSections(sectionsCopy);
   
    const applyChanges = () => {
      const newRowData = Object.keys(newSection.rows[rowIdx]).reduce(
        (acc, id) => {
          const rowData = newSection.rows[rowIdx][id];
          if (rowData.addRowExtra) {
            acc[id] = {
              ...rowData,
              addRowExtra: undefined,
            };
          } else {
            acc[id] = rowData;
          }
          return acc;
        },
        {}
      );
      userAxios.put(newRowApi, {
        row_id: rowIdx,
        data: newRowData,
        project_table_id: id,
      });
    };

    if (type === chatterType.text) {
      timelineDebounce(applyChanges);
    } else {
      applyChanges();
    }
  }

  function addChoice(colIdx, choice, type) {
    if (!choice) return;
    const newCols = _.cloneDeep(cols);
    newCols[colIdx].choices.push(choice);
    setCols(newCols);
    userAxios.put(addChoiceApi, {
      project_table_id: id,
      column_id: colIdx,
      choice: choice,
      type: type,
    });
  }

  function removeChoice(colIdx, choice, type) {
    const newCols = _.cloneDeep(cols);
    const idx = newCols[colIdx].choices.indexOf(choice);
    newCols[colIdx].choices.splice(idx, 1);
    setCols(newCols);
    userAxios.put(removeChoiceApi, {
      project_table_id: id,
      column_id: colIdx,
      choice: choice,
      type: type,
    });
  }

  function shiftRow({
    fromSection,
    toSection,
    rowId,
    sourceIndex,
    destinationIndex,
  }) {
    if (fromSection === toSection && sourceIndex === destinationIndex) return;

    if (fromSection === toSection) {
      // Means the row is dropped in the same section
      const newSections = [...sections];
      const currentSection = newSections.find(
        (section) => section.sectionIdx === fromSection
      );
      const newRowIds = Array.from(currentSection.rowIds);
      newRowIds.splice(sourceIndex, 1);
      newRowIds.splice(destinationIndex, 0, rowId);
      currentSection.rowIds = newRowIds;
      setSections(newSections);
    } else {
      // If reaches here, means they are been used in different section
      const newSections = [...sections];
      const fromSectionRef = newSections.find(
        (section) => section.sectionIdx === fromSection
      );
      const toSectionRef = newSections.find(
        (section) => section.sectionIdx === toSection
      );

      if (!fromSectionRef || !toSectionRef) return;

      fromSectionRef.rowIds.splice(sourceIndex, 1);
      const rowdata = fromSectionRef.rows[rowId];
      toSectionRef.rowIds.splice(destinationIndex, 0, rowId);
      toSectionRef.rows[rowId] = rowdata;
      setSections(newSections);
    }

    userAxios.put(shiftRowApi, {
      project_table_id: id,
      from_section_id: fromSection,
      to_section_id: toSection,
      row_id: rowId,
      index: destinationIndex,
    });
  }

  function shiftColumn() {}

  function handleSectionNamChange(sectionIdx, value) {
    const [sectionsCopy, newSection] = getCurrentSection(sectionIdx);
    newSection.sectionName = value;
    setSections(sectionsCopy);

    const applyChanges = () => {
      userAxios.put(updateSectionNameApi, {
        project_table_id: id,
        section_name: value,
        section_id: sectionIdx,
      });
    };

    timelineDebounce(applyChanges);
  }

  return {
    colIds,
    cols,
    sections,
    addRow,
    addNewSection,
    removeSection,
    removeRow,
    addColumn,
    removeColumn,
    updateHeaderData,
    updateRowData,
    addChoice,
    removeChoice,
    shiftRow,
    shiftColumn,
    handleSectionNamChange,
  };
}

export default useChatter;
