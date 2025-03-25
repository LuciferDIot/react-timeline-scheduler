import moment from "moment";
import { create } from "zustand";
import { ProductionTask, TableData } from "../types/scheduler.types";

interface DataState {
  schedulerTasks: TableData;
  hasHydrated: boolean;
  startOffsetDays: number;
  endOffsetDays: number;
  tableStartDate: moment.Moment;
  tableEndDate: moment.Moment;

  setOffsetDays: (startOffset: number, endOffset: number) => void;
  setSchedulerTasks: (tasks: ProductionTask[]) => void;
  updateSchedulerTaskDates: (
    action: (prev: ProductionTask[]) => ProductionTask[]
  ) => void;
}

interface SetOffsetDays {
  (start: number, end: number): void;
}

interface SetSchedulerTasks {
  (tasks: ProductionTask[]): void;
}

interface UpdateSchedulerTask {
  (action: (prev: ProductionTask[]) => ProductionTask[]): void;
}

export const useDataStore = create<DataState>((set) => ({
  schedulerTasks: {
    isFirstInit: false,
    tableDate: [],
  },
  hasHydrated: false,
  startOffsetDays: 0,
  endOffsetDays: 0,
  tableStartDate: moment().startOf("week"),
  tableEndDate: moment().endOf("week"),

  setOffsetDays: ((start, end) =>
    set((state: DataState) => {
      const { start: tableStartDate, end: tableEndDate } = startEndDates(
        state.schedulerTasks.tableDate || [],
        start,
        end
      );

      return {
        startOffsetDays: start,
        endOffsetDays: end,
        tableStartDate,
        tableEndDate,
      };
    })) as SetOffsetDays,
  setSchedulerTasks: ((tasks) =>
    set((state: DataState) => {
      const { start: tableStartDate, end: tableEndDate } = startEndDates(
        state.schedulerTasks.tableDate || [],
        state.startOffsetDays,
        state.endOffsetDays
      );

      if (state.schedulerTasks.isFirstInit || tasks.length === 0) return state;

      return {
        schedulerTasks: {
          tableDate: tasks,
          isFirstInit: true,
        },
        tableStartDate,
        tableEndDate,
      };
    })) as SetSchedulerTasks,
  updateSchedulerTaskDates: ((action) =>
    set((state) => {
      const { start: tableStartDate, end: tableEndDate } = startEndDates(
        state.schedulerTasks.tableDate || [],
        state.startOffsetDays,
        state.endOffsetDays
      );

      return {
        schedulerTasks: {
          isFirstInit: true,
          tableDate: action(state.schedulerTasks.tableDate || []),
        },
        tableStartDate,
        tableEndDate,
      };
    })) as UpdateSchedulerTask,
}));

const startEndDates = (
  schedulerTasks: ProductionTask[],
  startOffsetDays: number,
  endOffsetDays: number
) => {
  if (schedulerTasks.length === 0) {
    return {
      start: moment().add(startOffsetDays, "days"),
      end: moment().add(endOffsetDays, "days"),
    };
  }

  return {
    start: moment
      .min(schedulerTasks.map((task) => moment(task.startDate)))
      .subtract(2, "days"),
    end: moment
      .max(schedulerTasks.map((task) => moment(task.endDate)))
      .add(2, "days"),
  };
};
