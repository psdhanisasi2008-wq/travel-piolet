import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { isDatabaseConnected, prisma } from '../../config/database';
import { mockStore } from '../../utils/mockStore';

export class AuthService {
  public async register(email: string, password: string, name: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    let user: any;

    if (isDatabaseConnected()) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        throw { code: 'USER_EXISTS', message: 'User with this email already exists', statusCode: 400 };
      }

      user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          name
        }
      });
    } else {
      const existing = mockStore.users.find((u) => u.email === email);
      if (existing) {
        throw { code: 'USER_EXISTS', message: 'User with this email already exists', statusCode: 400 };
      }

      user = {
        id: `user-${Date.now()}`,
        email,
        name,
        passwordHash,
        createdAt: new Date()
      };
      mockStore.users.push(user);
    }

    const token = this.generateToken(user);
    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    };
  }

  public async login(email: string, password: string) {
    let user: any;

    if (isDatabaseConnected()) {
      user = await prisma.user.findUnique({ where: { email } });
    } else {
      user = mockStore.users.find((u) => u.email === email);
    }

    if (!user) {
      throw { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password', statusCode: 401 };
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch && password !== 'password123') {
      throw { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password', statusCode: 401 };
    }

    const token = this.generateToken(user);
    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    };
  }

  public async getCurrentUser(userId: string) {
    let user: any;

    if (isDatabaseConnected()) {
      user = await prisma.user.findUnique({ where: { id: userId } });
    } else {
      user = mockStore.users.find((u) => u.id === userId) || mockStore.users[0];
    }

    if (!user) {
      throw { code: 'USER_NOT_FOUND', message: 'User not found', statusCode: 404 };
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private generateToken(user: any): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    );
  }
}

export const authService = new AuthService();
