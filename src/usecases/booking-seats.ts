import { IIDGenerator } from "./../interfaces/id-generator.interface";
import { Booking } from "../domain/entities/booking.entity";
import { User } from "../domain/entities/user.entity";
import { IBookingRepository } from "../interfaces/booking-repository.interface";
import { IConferenceRepository } from "../interfaces/conference-repository.interface";
import { IExecutable } from "../interfaces/executable.interface";

type BookingSeatRequest = {
  user: User;
  conferenceId: string;
};

type BookingSeatResponse = {
  id: string;
};

export class BookingSeat
  implements IExecutable<BookingSeatRequest, BookingSeatResponse>
{
  constructor(
    private readonly repository: IBookingRepository,
    private readonly conferenceRepository: IConferenceRepository,
    private readonly idGenerator: IIDGenerator
  ) {}

  async execute({
    user,
    conferenceId,
  }: BookingSeatRequest): Promise<BookingSeatResponse> {
    
    const id = this.idGenerator.generate();

    const booking = new Booking({
      id,
      userId: user.props.id,
      conferenceId,
    });

    const conference = await this.conferenceRepository.findById(conferenceId);

    if (!conference) {
      throw new Error("Conference not found");
    }

    const existingBooking = await this.repository.findByConferenceId(
      conferenceId
    );

    if (existingBooking.length >= conference.props.seats) {
      throw new Error("Conference is full, no places available");
    }

    const userBooking = existingBooking.find(
      (booking) => booking.props.userId === user.props.id
    );

    if (userBooking) {
      throw new Error("User already has a booking for this conference");
    }

    // const newBooking = new Booking({
    //   // id: this.IIDGenerator.generate(),
    //   userId: user.props.id,
    //   conferenceId: conferenceId,
    // });

    await this.repository.create(booking);

    return { id };

    // conference.bookSeat();

    // await this.conferenceRepository.update(conference);
  }
}
