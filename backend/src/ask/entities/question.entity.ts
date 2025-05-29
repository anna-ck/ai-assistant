import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { File } from "src/files/entities/file.entity";

@Entity()
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    question: string;

    @Column('text')
    answer: string;

    @CreateDateColumn()
    askedAt: Date;

    @ManyToOne(() => File, { onDelete: 'CASCADE' })
    file: File;
} 