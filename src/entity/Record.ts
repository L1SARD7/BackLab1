import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";
import { Currency } from "./Currency";

@Entity()
export class Record {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number;

    @CreateDateColumn()
    timestamp: Date;

    @ManyToOne(() => User, user => user.records, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Category, category => category.records, { onDelete: "SET NULL" })
    category: Category;

    @ManyToOne(() => Currency, currency => currency.records)
    currency: Currency;
}
