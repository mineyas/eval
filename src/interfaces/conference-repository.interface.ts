import { bookSeat } from './../app/controllers/conference.controllers';
import { Conference } from "../domain/entities/conference.entity";


export interface IConferenceRepository {
    create(conference: Conference): Promise<void>
    findById(id: string): Promise<Conference | null>
    update(conference: Conference): Promise<void>
    // bookSeat(conferenceId: string): Promise<void>
}