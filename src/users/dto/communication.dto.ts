import { Schema, Prop } from "@nestjs/mongoose";

@Schema({ _id: false })
export class CommunicationDtoEmail {
  @Prop()
  value: string;

  @Prop({ default: false })
  isVerfied: boolean;
}

@Schema({ _id: false })
export class CommunicationDtoPhone {
  @Prop()
  value: number;

  @Prop({ default: false })
  isVerfied: boolean;
}
