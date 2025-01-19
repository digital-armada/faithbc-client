import Speaker from "../entities/models/Speaker";

interface ISpeakerRepository {
  getAllSpeakers(): Promise<Speaker[]>;
  getSpeakerById(id: number): Promise<Speaker | null>;
  createSpeaker(speaker: Omit<Speaker, "id">): Promise<Speaker>;
  updateSpeaker(id: number, speaker: Partial<Speaker>): Promise<Speaker | null>;
  deleteSpeaker(id: number): Promise<void>;
}

export default ISpeakerRepository;
