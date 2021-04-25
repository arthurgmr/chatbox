
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";


class SettingsController {

  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    const settingsRepository = getCustomRepository(SettingsRepository);

    try {
      const settings = settingsRepository.create({ chat, username });

      await settingsRepository.save(settings);

      return response.json(settings);

    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { SettingsController }