import { Conference } from "../../domain/entities/conference.entity";
import { IIDGenerator } from "../../interfaces/id-generator.interface";
import { BookingSeat } from "../../usecases/booking-seats";
import { FixedIDGenerator } from "../fixed/fixed-id-generator";
import { InMemoryBookingRepository } from "../in-memory/in-memory-booking-repository";
import { InMemoryConferenceRepository } from "../in-memory/in-memory-conference-repository";
import { testBookings } from "./seeds/seeds-booking";
import { testConferences } from "./seeds/seeds-conference";
import { testUsers } from "./seeds/seeds-user";

describe("Usecase : Book seats", () => {
  let conferenceRepository: InMemoryConferenceRepository;
  let bookingRepository: InMemoryBookingRepository;
  let idGenerator: IIDGenerator;
  let usecase: BookingSeat;

  beforeEach(async () => {
    conferenceRepository = new InMemoryConferenceRepository();
    bookingRepository = new InMemoryBookingRepository();
    idGenerator = new FixedIDGenerator();

    // await conferenceRepository.create(testConferences.conference);
    // await bookingRepository.create(testBookings.booking);

    usecase = new BookingSeat(
      bookingRepository,
      conferenceRepository,
      idGenerator
    );
  });

  describe("Scenario: Happy path", () => {
    beforeEach(async () => {
      await conferenceRepository.create(testConferences.conference);
    });

    const payload = {
      user: testUsers.johnDoe,
      conferenceId: testConferences.conference.props.id,
    };

    it("should book seats", async () => {
      await usecase.execute(payload);

      const fetchNewBooking = await bookingRepository.database[0];
      expect(bookingRepository.database).toHaveLength(1);
      expect(fetchNewBooking.props.conferenceId).toEqual(payload.conferenceId);

      // const fetchedBooking = await bookingRepository.findByConferenceId(
      //     testBookings.booking.props.conferenceId
      // )
      // expect(fetchedBooking.length).toBe(1)
      // expect(fetchedBooking[0].props.userId).toBe(payload.user.props.id)
    });
  });

  describe("Scenario: no more seats available", () => {
    beforeEach(async () => {
      const noPlacaAvailable = new Conference({
        ...testConferences.conference.props,
        seats: 1,
        bookedSeats: 1,
      });
    });
  });
});
