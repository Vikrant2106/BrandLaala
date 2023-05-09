import _ from "lodash";

import { publishSectionDataApi } from "./apis.utils";
import { userAxios } from "./axios/user.axios";

export const getTransformSection = (sectionId, currentSection, columnId) => {
  return {
    sectionIdx: sectionId,
    rowIds: currentSection.RowIds,
    sectionName: currentSection.section_name,
    rows: currentSection.RowIds.reduce((acc, rowId) => {
      const currentRow = currentSection.rows[rowId];
      acc[rowId] = currentRow.values;
      acc[rowId][columnId].comments_count = currentRow.comments_count;
      return acc;
    }, {}),
  };
};

export const getSectionMatrix = (data) => {
  let timelineData = {
    id: data.project_table_id,
    template_permissions: data.template_permissions,
    sections: [],
    columnsIds: data.sectionColumnIds,
    columns: data.columns,
  };

  Object.keys(data.sections).forEach((sectionId) => {
    const currentSection = data.sections[sectionId];
    timelineData.sections.push(
      getTransformSection(sectionId, currentSection, data.sectionColumnIds[0])
    );
  });

  return timelineData;
};

export function getStartEndColumnIndex(data) {
  const ans = [];
  const columnIds = data.sectionColumnIds;
  columnIds.forEach((columnId) => {
    const column = data.columns[columnId];
    if (column.key && column.key === "start") {
      ans[0] = columnId;
    }

    if (column.key && column.key === "end") {
      ans[1] = columnId;
    }
  });
  return ans;
}

export function getGanttChartData(data) {
  const sections = data.sections;
  const [startColumnId, endColumnId] = getStartEndColumnIndex(data);
  const ganttData = Object.keys(sections)
    .map((sectionId) => {
      const ganttBySection = [];
      const section = sections[sectionId];
      ganttBySection.push({
        id: sectionId,
        name: section.section_name,
        type: "project",
        hideChildren: false,
      });
      let maxDate;
      let minDate;

      const ganttRowsData = section.RowIds.map((rowId) => {
        const row = section.rows[rowId];
        if (
          !row.values[startColumnId]?.value ||
          !row.values[endColumnId]?.value
        )
          return false;

        const startDate = new Date(row.values[startColumnId].value);
        const endDate = new Date(row.values[endColumnId].value);

        if (!minDate && startDate) {
          minDate = startDate;
        }

        if (minDate && startDate && minDate > startDate) {
          minDate = startDate;
        }

        if (!maxDate && endDate) {
          maxDate = endDate;
        }

        if (maxDate && endDate && endDate > maxDate) {
          maxDate = endDate;
        }

        return {
          project: sectionId,
          start: startDate,
          end: endDate,
          id: rowId,
          name: row.values[data.sectionColumnIds[0]].value,
        };
      }).filter(Boolean);

      ganttBySection[0].start = minDate;
      ganttBySection[0].end = maxDate;

      if (!minDate || !maxDate) return false;

      return ganttBySection.concat(ganttRowsData);
    })
    .filter(Boolean);

  return _.flatten(ganttData);
}

export const publishSection = async (projectId, successCb, failureCb) => {
  try {
    userAxios.post(publishSectionDataApi, {
      project_table_id: projectId,
    });
    successCb();
  } catch (err) {
    failureCb();
  }
};

export const getStartEndDateForProject = (tasks, projectId) => {
  const projectTasks = tasks.filter((t) => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
};
