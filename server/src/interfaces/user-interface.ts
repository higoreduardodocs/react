export interface ISave {
  name: string;
  email: string;
  password: string;
}

export interface IUpdate {
  user_id: string;
  name: string;
  password: string;
  newPassword: string;
  avatarUrl?: IFileUpload;
}

interface IFileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
