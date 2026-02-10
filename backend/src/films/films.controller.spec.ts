import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const filmsServiceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    getSchedule: jest.fn(),
  } as unknown as FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: filmsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate findAll to FilmsService', async () => {
    const result = [{ id: '1', title: 'Film 1' }];
    (service.findAll as jest.Mock).mockResolvedValue(result);

    await expect(controller.findAll()).resolves.toBe(result);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('should delegate findOne to FilmsService with id', async () => {
    const film = { id: '1', title: 'Film 1' };
    (service.findOne as jest.Mock).mockResolvedValue(film);

    await expect(controller.findOne('1')).resolves.toBe(film);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should delegate getSchedule to FilmsService with id', async () => {
    const schedule = [{ time: '10:00' }];
    (service.getSchedule as jest.Mock).mockResolvedValue(schedule);

    await expect(controller.getSchedule('1')).resolves.toBe(schedule);
    expect(service.getSchedule).toHaveBeenCalledWith('1');
  });
});
