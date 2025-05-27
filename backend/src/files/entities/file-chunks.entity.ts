import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import { File } from "./file.entity";

@Entity()
export class FileChunk {
    @PrimaryGeneratedColumn('uuid')
    id: number; 

    @Column('text')
    content: string;

    @Column({ type: 'vector' as any})
    embedding: number[];

    @ManyToOne(() => File, (file) => file.chunks, { onDelete: 'CASCADE' })
    file: File;


    @BeforeUpdate()
    @BeforeInsert()
    stringifyVector() {
        if (this.embedding && Array.isArray(this.embedding)) {
            this.embedding= JSON.stringify(this.embedding) as any;
        }
    }
}   
