import { bookSeat } from "./../../app/controllers/conference.controllers";
import { differenceInDays, differenceInHours } from "date-fns";
import { User } from "./user.entity";

type ConferenceProps = {
  id: string;
  organizerId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  seats: number;
  bookedSeats: number;
};

export class Conference {
  constructor(public props: ConferenceProps) {
    // this.props.bookedSeats = this.props.bookedSeats || 0;
  }

  isTooClose(now: Date) {
    return differenceInDays(this.props.startDate, now) < 3;
  }

  hasNotEnoughSeats() {
    return this.props.seats < 20;
  }

  hasTooManySeats() {
    return this.props.seats > 1000;
  }

  getBookedSeats() {
    return this.props.bookedSeats;
  }

  bookSeat() {
    if (this.isFull()) {
      throw new Error("not enough seats available");
    }
    this.props.bookedSeats++;
  }
  isTooLong() {
    return differenceInHours(this.props.endDate, this.props.startDate) > 3;
  }

  isTheOrganizer(user: User) {
    return this.props.organizerId === user.props.id;
  }

  isFull(){
    return this.props.bookedSeats >= this.props.seats
  }

  update(data: Partial<ConferenceProps>) {
    this.props = { ...this.props, ...data };
  }

  //   update(data: Partial<ConferenceProps>) {
  //     if(data.seats !== undefined && data.seats < this.getBookedSeats()) {
  //         throw new Error("Cannot have less seats than already booked")

  //     }
  //     this.props = { ...this.props, ...data };
  //   }
}
