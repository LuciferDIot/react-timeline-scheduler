import { endOfWeek, startOfWeek } from "date-fns";
import { create } from "zustand";
import { SchedulerConfig, SchedulerTask, TableData } from "../../types";
import { startEndDates } from "./startEndDates";

export interface DataState {
  schedulerData: TableData;
  hasHydrated: boolean;
  startOffsetDays: number;
  endOffsetDays: number;
  tableStartDate: Date;
  tableEndDate: Date;
  config?: SchedulerConfig;

  setConfig: (config: SchedulerConfig) => void;
  setOffsetDays: (startOffset: number, endOffset: number) => void;
  setSchedulerData: (tasks: SchedulerTask[]) => void;
  updateSchedulerTaskDates: (
    action: (prev: SchedulerTask[]) => SchedulerTask[]
  ) => void;
}

export const useDataStore = create<DataState>((set) => ({
  schedulerData: {
    isFirstInit: false,
    tasks: [],
  },
  hasHydrated: false,
  startOffsetDays: 0,
  endOffsetDays: 0,
  tableStartDate: startOfWeek(new Date()),
  tableEndDate: endOfWeek(new Date()),
  config: undefined,

  setConfig: (config: SchedulerConfig) => set({ config }),

  setOffsetDays: (start: number, end: number) =>
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
    }),

  setSchedulerData: (tasks: SchedulerTask[]) =>
    set((state: DataState) => {
      const { start: tableStartDate, end: tableEndDate } = startEndDates(
        tasks || [],
        state.startOffsetDays,
        state.endOffsetDays
      );
      return {
        schedulerData: {
          tasks: tasks || [],
          isFirstInit: true,
        },
        tableStartDate,
        tableEndDate,
      };
    }),

  updateSchedulerTaskDates: (action) =>
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
    }),
}));
