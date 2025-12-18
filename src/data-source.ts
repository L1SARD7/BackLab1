import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Category } from "./entity/Category";
import { Record } from "./entity/Record";
import { Currency } from "./entity/Currency";

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5434;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: port,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "1234", // <--- Твій пароль
    database: process.env.DB_NAME || "lab3_db",
    synchronize: true,
    logging: false,
    entities: [User, Category, Record, Currency],
    subscribers: [],
    migrations: [],
});
