import { describe, expect, it } from 'vitest';
import type { ProductionTask } from '../../types';
import { generateGroupedTasks } from '../common.util';

describe('generateGroupedTasks', () => {
  it('should group tasks by department name', () => {
    const tasks: ProductionTask[] = [
      {
        id: '1',
        label: 'Task 1',
        departmentName: 'Engineering',
        departmentId: 'eng',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-05'),
        styleAllocationId: 'style1',
      },
      {
        id: '2',
        label: 'Task 2',
        departmentName: 'Design',
        departmentId: 'des',
        startDate: new Date('2024-01-02'),
        endDate: new Date('2024-01-06'),
        styleAllocationId: 'style2',
      },
    ];

    const grouped = generateGroupedTasks(tasks);

    expect(grouped).toHaveProperty('Engineering');
    expect(grouped).toHaveProperty('Design');
    expect(grouped.Engineering[0]).toContainEqual(tasks[0]);
    expect(grouped.Design[0]).toContainEqual(tasks[1]);
  });

  it('should handle overlapping tasks in same department', () => {
    const tasks: ProductionTask[] = [
      {
        id: '1',
        label: 'Task 1',
        departmentName: 'Engineering',
        departmentId: 'eng',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-05'),
        styleAllocationId: 'style1',
      },
      {
        id: '2',
        label: 'Task 2',
        departmentName: 'Engineering',
        departmentId: 'eng',
        startDate: new Date('2024-01-03'),
        endDate: new Date('2024-01-07'),
        styleAllocationId: 'style2',
      },
    ];

    const grouped = generateGroupedTasks(tasks);

    // Overlapping tasks should be in different rows
    expect(grouped.Engineering).toHaveLength(2);
    expect(grouped.Engineering[0]).toContainEqual(tasks[0]);
    expect(grouped.Engineering[1]).toContainEqual(tasks[1]);
  });

  it('should handle non-overlapping tasks in same row', () => {
    const tasks: ProductionTask[] = [
      {
        id: '1',
        label: 'Task 1',
        departmentName: 'Engineering',
        departmentId: 'eng',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-05'),
        styleAllocationId: 'style1',
      },
      {
        id: '2',
        label: 'Task 2',
        departmentName: 'Engineering',
        departmentId: 'eng',
        startDate: new Date('2024-01-06'),
        endDate: new Date('2024-01-10'),
        styleAllocationId: 'style2',
      },
    ];

    const grouped = generateGroupedTasks(tasks);

    // Non-overlapping tasks should be in same row
    expect(grouped.Engineering).toHaveLength(1);
    expect(grouped.Engineering[0]).toHaveLength(2);
  });

  it('should handle empty task list', () => {
    const grouped = generateGroupedTasks([]);
    expect(grouped).toEqual({});
  });
});
