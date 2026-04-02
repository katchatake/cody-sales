import { UserRepository } from "../domain/UserRepository";
import { Boom } from "@hapi/boom";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: any }> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Boom("Credenciales inválidas", { statusCode: 401 });
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password || "",
    );

    if (!isPasswordValid) {
      throw new Boom("Credenciales inválidas", { statusCode: 401 });
    }

    const secret = process.env.JWT_SECRET || "default_secret";
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: "24h" },
    );

    const { password, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword,
    };
  }
}
