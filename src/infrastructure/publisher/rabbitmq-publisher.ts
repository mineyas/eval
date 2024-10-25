export class RabbitMQPublisher implements IMessageeBroker {
    private connection: amqp.Connection | null = null
    private channel: amqp.Channel | null = null


    constructor (
        private readonly url: string
    ) {}
}