import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async register(userData: { email: string; password: string }) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = await this.userRepository.create({ ...userData, password: hashedPassword });
        return this.userRepository.save(newUser);
    }

    async login(loginUser: { email: string; password: string }) {
        const user = await this.userRepository.findOne({ where: { email: loginUser.email } });

        if (!user) {
            throw new UnauthorizedException('User existiert nicht');
        }

        const isPasswordValid = await bcrypt.compare(loginUser.password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Anmeldedaten ungültig')
        }

        return {
            message: 'Login erfolgreich',
            user: {
                id: user.id,
                email: user.email,
            }
        }
    }
}