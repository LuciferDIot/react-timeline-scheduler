import moment from "moment";
import { create } from "zustand";
import { SchedulerConfig, SchedulerTask, TableData } from "../types";

interface DataState {
  schedulerData: TableData;
  hasHydrated: boolean;
  startOffsetDays: number;
  endOffsetDays: number;
  tableStartDate: moment.Moment;
  tableEndDate: moment.Moment;
  config?: SchedulerConfig;

  setConfig: (config: SchedulerConfig) => void;
  setOffsetDays: (startOffset: number, endOffset: number) => void;
  setSchedulerData: (tasks: SchedulerTask[]) => void;
  updateSchedulerTaskDates: (
    action: (prev: SchedulerTask[]) => SchedulerTask[]
  ) => void;
}

interface SetOffsetDays {
  (start: number, end: number): void;
}

interface SetSchedulerData {
  (tasks: SchedulerTask[]): void;
}

interface UpdateSchedulerTask {
  (action: (prev: SchedulerTask[]) => SchedulerTask[]): void;
}

export const useDataStore = create<DataState>((set) => ({
  schedulerData: {
    isFirstInit: false,
    tasks: [],
  },
  hasHydrated: false,
  startOffsetDays: 0,
  endOffsetDays: 0,
  tableStartDate: moment().startOf("week"),
  tableEndDate: moment().endOf("week"),
  config: undefined,

  setConfig: (config: SchedulerConfig) => set({ config }),

  setOffsetDays: ((start, end) =>
    set((state: DataState) => {
      const { start: tableStartDate, end: tableEndDate } = startEndDates(
        state.schedulerData.tasks || [],
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
  setSchedulerData: ((tasks) =>
    set((state: DataState) => {
      const { start: tableStartDate, end: tableEndDate } = startEndDates(
        state.schedulerData.tasks || [],
        state.startOffsetDays,
        state.endOffsetDays
      );

      if (state.schedulerData.isFirstInit || tasks.length === 0) return state;

      return {
        schedulerData: {
          tasks: tasks,
          isFirstInit: true,
        },
        tableStartDate,
        tableEndDate,
      };
    })) as SetSchedulerData,
  updateSchedulerTaskDates: ((action) =>
    set((state) => {
      const updatedTasks = action(state.schedulerData.tasks || []);
      const { start: tableStartDate, end: tableEndDate } = startEndDates(
        updatedTasks,
        state.startOffsetDays,
        state.endOffsetDays
      );

      return {
        schedulerData: {
          isFirstInit: true,
          tasks: updatedTasks,
        },
        tableStartDate,
        tableEndDate,
      };
    })) as UpdateSchedulerTask,
}));

const startEndDates = (
  tasks: SchedulerTask[],
  startOffsetDays: number,
  endOffsetDays: number
) => {
  if (tasks.length === 0) {
    return {
      start: moment().add(startOffsetDays, "days"),
      end: moment().add(endOffsetDays, "days"),
    };
  }

  let minStart = moment(tasks[0].startDate);
  let maxEnd = moment(tasks[0].endDate);

  for (let i = 1; i < tasks.length; i++) {
    const taskStart = moment(tasks[i].startDate);
    const taskEnd = moment(tasks[i].endDate);
    if (taskStart.isBefore(minStart)) minStart = taskStart;
    if (taskEnd.isAfter(maxEnd)) maxEnd = taskEnd;
  }

  return {
    start: minStart.subtract(2, "days"),
    end: maxEnd.add(2, "days"),
  };
};
