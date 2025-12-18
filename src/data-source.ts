import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Category } from "./entity/Category";
import { Record } from "./entity/Record";
import { Currency } from "./entity/Currency";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "lab3_db",
    synchronize: true, // В реальному житті - міграції, для лаби - автосинхронізація
    logging: false,
    entities: [User, Category, Record, Currency],
    subscribers: [],
    migrations: [],
});
