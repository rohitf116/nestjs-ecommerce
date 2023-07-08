import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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
import { EmailService } from "src/email/email.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
    private otpServise: OtpService,
    private emailService: EmailService //
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
    const otp = this.otpEmailGenerate();
    this.emailService.registrationMail(email.value, otp.value);
    const user = new this.userModel({ ...createUserDto, email, phone, otp });
    const newUser = await user.save();
    return newUser;
  }

  otpEmailGenerate() {
    const emailOtp = this.otpServise.generateOtp();
    const emailExpiry = this.otpServise.generateExpiry();
    const otp: OTP = { value: emailOtp, expiry: emailExpiry };
    return otp;
  }

  async sendMail(email: string, subject: string, body: string): Promise<void> {}

  async isEmailExist(email: string) {
    const user = await this.userModel.findOne({ "email.value": email });
    return user;
  }
  async verifyEmailOtp(email: string, otp: number) {
    const user = await this.isEmailExist(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (user.email.isVerfied) {
      throw new BadRequestException("User already verified");
    }
    this.emailService.verifyEmailWithOtp(otp, user);
    const newUser = this.resetOtpToNull(user);
    Object.assign(user, newUser);
    await user.save();
    return "email verified successfully";
  }

  resetOtpToNull(user: User) {
    const otp: OTP = { value: null, expiry: null };
    user.email.isVerfied = true;
    user.otp = otp;
    return user;
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
