import { Injectable, BadRequestException } from '@nestjs/common';
import {
  TicketDto,
  OrderFrontendDto,
  OrderResultDto,
  ListResponse,
} from './dto/order.dto';
import { FilmsTypeOrmRepository } from '../repository/films.typeorm.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepo: FilmsTypeOrmRepository) {}

  async create(order: OrderFrontendDto): Promise<ListResponse<OrderResultDto>> {
    const { email, phone, tickets } = order;

    if (!email || !phone || !Array.isArray(tickets) || tickets.length === 0) {
      throw new BadRequestException(
        'email, phone и непустой список tickets обязательны для заполнения',
      );
    }

    const results: OrderResultDto[] = [];

    for (const ticket of tickets) {
      const {
        film: filmId,
        session: scheduleId,
        row,
        seat,
      } = ticket as TicketDto & {
        row: number;
        seat: number;
      };

      if (!filmId || !scheduleId || !row || !seat) {
        throw new BadRequestException(
          'film, session, row и seat обязательны для заполнения',
        );
      }

      const film = await this.filmsRepo.findOne(filmId);
      if (!film) {
        throw new BadRequestException('Фильм не найден');
      }

      const schedule = await this.filmsRepo.getSchedule(filmId);
      if (!schedule) {
        throw new BadRequestException('Сеанс не найден');
      }

      const session = schedule.items.find((s) => s.id === scheduleId);

      if (!session) {
        throw new BadRequestException('Сеанс не найден');
      }

      const placeKey = `${row}:${seat}`;

      if (row < 1 || row > session.rows || seat < 1 || seat > session.seats) {
        throw new BadRequestException(
          `Место ${placeKey} находится вне диапазона зала`,
        );
      }

      if (session.taken.includes(placeKey)) {
        throw new BadRequestException(
          `К сожалению данное место ${placeKey} уже занято`,
        );
      }

      session.taken.push(placeKey);

      results.push({
        id: `${filmId}:${scheduleId}:${placeKey}`,
        film: filmId,
        session: scheduleId,
        daytime: session.daytime,
        day: session.daytime,
        time: session.daytime,
        row,
        seat,
        price: session.price,
      });
    }

    return {
      total: results.length,
      items: results,
    };
  }
}
