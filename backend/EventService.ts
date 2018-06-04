
import { Repository } from './Repository'
import { Event } from './Event'

/**
 * Provides high level actions that the user can take
 */
export class EventService {
    constructor(private repository: Repository) {}

    postNewEvent(event: Event) {
        this.repository.createEvent(event);
    }
}