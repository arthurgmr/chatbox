import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRespository"

interface IMessageCreate {
  admin_id?: string; //question mark is used to check value(null);
  text: string;
  user_id: string;
}

class MessagesService {
  // create attributes to class;
  private messagesRepository: Repository<Message>;

  constructor () {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, user_id, text }: IMessageCreate) {
    const message = this.messagesRepository.create({
      admin_id,
      user_id,
      text
    });

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(user_id: string) {
    const list = await this.messagesRepository.find({ 
      where: {user_id},
      relations: ["user"],
    });

    return list;
  }

}

export { MessagesService };