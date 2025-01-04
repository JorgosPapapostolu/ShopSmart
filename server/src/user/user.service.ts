import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE_POOL') private readonly pool: Pool,
  ) {}

  async register(userData: { email: string; password: string }) {

    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required');
    }    

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id, email
    `;

    const values = [userData.email, hashedPassword];

    try {
      const result = await this.pool.query(query, values);
      console.log('User registered:', result.rows[0]);
      return result.rows[0];
    } catch (err) {
      console.error('Error registering user:', err);
      throw err;
    }
  }

  async login(loginData: { email: string; password: string }) {
    const query = `
      SELECT * FROM users WHERE email = $1
    `;

    const values = [loginData.email];

    const result = await this.pool.query(query, values);
    const user = result.rows[0];

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}
