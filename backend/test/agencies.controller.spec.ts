/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AgenciesController } from '../src/controllers/agencies.controller';
import { AgenciesService } from '../src/services/agencies.service';

describe('AgenciesController', () => {
  let controller: AgenciesController;
  let service: AgenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgenciesController],
      providers: [
        {
          provide: AgenciesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: '1', name: 'Agency' }),
          },
        },
      ],
    }).compile();

    controller = module.get<AgenciesController>(AgenciesController);
    service = module.get<AgenciesService>(AgenciesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of agencies', async () => {
    expect(await controller.findAll()).toEqual([]);
  });

  it('should return an agency by id', async () => {
    expect(await controller.findOne('1')).toEqual({ id: '1', name: 'Agency' });
  });
});
