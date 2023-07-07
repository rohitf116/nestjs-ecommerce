import { ConflictException, Injectable } from "@nestjs/common";
import { Model, Connection, Types } from "mongoose";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./model/user.model";
import {
  CommunicationDtoEmail,
  CommunicationDtoPhone,
} from "./dto/communication.dto";
import { OtpService } from "./otp.service";
import { OTP } from "./interface/otp.interface";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
    private otpServise: OtpService
  ) {}
  async create(createUserDto: CreateUserDto) {
    // const user
    await this.findOneByEmail(createUserDto.email);
    await this.findOneByPhone(createUserDto.phone);
    const email: CommunicationDtoEmail = {
      value: createUserDto.email,
      isVerfied: false,
    };
    const phone: CommunicationDtoPhone = {
      value: createUserDto.phone,
      isVerfied: false,
    };
    const otp = this.otpEmail();
    const user = new this.userModel({ ...createUserDto, email, phone, otp });
    const newUser = await user.save();
    return newUser;
  }

  otpEmail() {
    const emailOtp = this.otpServise.generateOtp();
    const emailExpiry = this.otpServise.generateExpiry();
    const otp: OTP = { value: emailOtp, expiry: emailExpiry };
    return otp;
  }

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ "email.value": email });
    return true;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ "email.value": email }).exec();
    if (user) {
      throw new ConflictException("Email already in use");
    }
    return true;
  }

  async findOneByPhone(phone: number) {
    const user = await this.userModel.findOne({ "phone.value": phone }).exec();
    if (user) {
      throw new ConflictException("Phone already in use");
    }
    return true;
  }

  findOne(id: string) {}

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
