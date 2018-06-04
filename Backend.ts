
import { Repository } from './Repository'
import { Event } from './Event'

export class Backend {
    constructor(private repository: Repository) {}

    postNewEvent(event: Event) {
        this.repository.createEvent(event)
    }
}