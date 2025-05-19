/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintsController } from '../src/controllers/complaints.controller';
import { ComplaintsService } from '../src/services/complaints.service';

describe('ComplaintsController', () => {
  let controller: ComplaintsController;
  let service: ComplaintsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplaintsController],
      providers: [
        {
          provide: ComplaintsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: '1', title: 'Test' }),
          },
        },
      ],
    }).compile();

    controller = module.get<ComplaintsController>(ComplaintsController);
    service = module.get<ComplaintsService>(ComplaintsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of complaints', async () => {
    expect(await controller.findAll()).toEqual([]);
  });

  it('should return a complaint by id', async () => {
    expect(await controller.findOne('1')).toEqual({ id: '1', title: 'Test' });
  });
});
