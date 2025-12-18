import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Record } from "./Record";

@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Record, record => record.category)
    records: Record[];
}
