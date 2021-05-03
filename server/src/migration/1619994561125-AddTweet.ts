import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTweet1619994561125 implements MigrationInterface {
    name = 'AddTweet1619994561125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweet" DROP CONSTRAINT "FK_d0f0cd7238f1c93d3e78f0fcdcf"`);
        await queryRunner.query(`ALTER TABLE "tweet" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "tweet" ADD CONSTRAINT "FK_a9703cf826200a2d155c22eda96" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweet" DROP CONSTRAINT "FK_a9703cf826200a2d155c22eda96"`);
        await queryRunner.query(`ALTER TABLE "tweet" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "tweet" ADD CONSTRAINT "FK_d0f0cd7238f1c93d3e78f0fcdcf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
