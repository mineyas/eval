import { Booking } from "../../../domain/entities/booking.entity";
import { testConferences } from "./seeds-conference";
import { testUsers } from "./seeds-user";

export const testBookings = {
  booking: new Booking({
    id: "id-1",
    // id: testConferences.conference.props.,
    conferenceId: testConferences.conference.props.id,
    userId: testUsers.alice.props.id,
  }),
  aliceBooking: new Booking({
    id: "id-1",
    // id: 'id-1',
    conferenceId: testConferences.conference.props.id,
    userId: testUsers.alice.props.id,
  }),
};
