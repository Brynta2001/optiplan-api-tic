import { State } from 'src/states/entities/state.entity';

export const mockStateRepository = {
  findOneBy: jest.fn(),
};

export const mockStates: State[] = [
  {
    id: '1',
    name: 'To Do',
    sequence: 1,
    project: null,
    tasks: [],
  },
];
