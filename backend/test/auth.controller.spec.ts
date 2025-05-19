/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/controllers/auth.controller';
import { AuthService } from '../src/services/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest
              .fn()
              .mockResolvedValue({ id: '1', email: 'test@example.com' }),
            login: jest.fn().mockResolvedValue({ access_token: 'token' }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    expect(await controller.register({} as any)).toEqual({
      id: '1',
      email: 'test@example.com',
    });
  });

  it('should login a user', async () => {
    expect(await controller.login({} as any)).toEqual({
      access_token: 'token',
    });
  });
});
