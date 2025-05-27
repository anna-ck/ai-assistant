import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FileChunk } from "./file-chunks.entity";

@Entity()
export class File {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    uploadedAt: Date;

    @OneToMany(() => FileChunk, (chunk) => chunk.file, { cascade: true })
    chunks: FileChunk[];
}