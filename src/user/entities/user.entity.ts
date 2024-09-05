import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import bcrypt, { genSalt, hash } from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({
    default:
      'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1711791946~exp=1711792546~hmac=cb0177caea245c1ef500bfb8cd100aabe648172ff3e092fb6e7b4da3cede6ec9',
  })
  profilePic: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: 'male' })
  gender: string;

  @Prop({ default: '' })
  dob: string;

  @Prop({ default: '' })
  country: string;

  @Prop({ default: '' })
  state: string;

  @Prop({ default: '' })
  city: string;

  @Prop({ default: '' })
  pincode: string;

  @Prop({ default: '' })
  latitude: string;

  @Prop({ default: '' })
  longitude: string;

  @Prop({ default: 'Asia/Karachi' })
  timezone: string;

  @Prop({ default: 'PKR' })
  currency: string;

  @Prop({ default: 'en' })
  language: string;

  @Prop({ default: [] })
  fcmToken: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  blockedUsers: User[];

  @Prop({ default: false })
  verified: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  friendRequests: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await genSalt(10);
  const hashed = await hash(this.password, salt);
  this.password = hashed;
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
