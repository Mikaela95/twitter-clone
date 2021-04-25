import {MigrationInterface, QueryRunner} from "typeorm";

export class updateId1619324334398 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "username" varchar(255), ADD "password" varchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
