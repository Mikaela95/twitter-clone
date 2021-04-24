import {MigrationInterface, QueryRunner} from "typeorm";

export class userMigration1619224659636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "id" int, ADD "username" varchar(255), ADD "password" varchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
