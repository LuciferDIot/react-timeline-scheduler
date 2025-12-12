import { beforeEach, describe, expect, it } from 'vitest';
import { useActionStore } from '../actionStore';

describe('actionStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    const store = useActionStore.getState();
    store.setAll({
      scrollIntoToday: false,
      lockOperations: false,
    });
  });

  describe('lockOperations', () => {
    it('should have default value of false', () => {
      const { lockOperations } = useActionStore.getState();
      expect(lockOperations).toBe(false);
    });

    it('should toggle lockOperations', () => {
      const { setLockOperations } = useActionStore.getState();
      
      setLockOperations();
      expect(useActionStore.getState().lockOperations).toBe(true);
      
      setLockOperations();
      expect(useActionStore.getState().lockOperations).toBe(false);
    });
  });

  describe('dragConfig', () => {
    it('should have default dragConfig', () => {
      const { dragConfig } = useActionStore.getState();
      
      expect(dragConfig.enableLeftResize).toBe(true);
      expect(dragConfig.enableRightResize).toBe(true);
      expect(dragConfig.autoScroll?.enabled).toBe(true);
      expect(dragConfig.autoScroll?.edgeZone).toBe(50);
      expect(dragConfig.autoScroll?.maxSpeed).toBe(20);
    });

    it('should update dragConfig', () => {
      const { setDragConfig } = useActionStore.getState();
      
      const newConfig = {
        enableLeftResize: false,
        enableRightResize: true,
        autoScroll: {
          enabled: true,
          edgeZone: 100,
          maxSpeed: 30,
        },
      };

      setDragConfig(newConfig);
      
      const { dragConfig } = useActionStore.getState();
      expect(dragConfig).toEqual(newConfig);
    });
  });

  describe('animationConfig', () => {
    it('should have default animationConfig', () => {
      const { animationConfig } = useActionStore.getState();
      
      expect(animationConfig.enabled).toBe(true);
      expect(animationConfig.taskResize?.duration).toBe(0.3);
      expect(animationConfig.cellExpand?.duration).toBe(0.5);
    });

    it('should update animationConfig', () => {
      const { setAnimationConfig } = useActionStore.getState();
      
      const newConfig = {
        enabled: false,
        taskResize: { duration: 0.5, ease: 'easeIn' },
      };

      setAnimationConfig(newConfig);
      
      const { animationConfig } = useActionStore.getState();
      expect(animationConfig.enabled).toBe(false);
      expect(animationConfig.taskResize?.duration).toBe(0.5);
    });
  });
});
