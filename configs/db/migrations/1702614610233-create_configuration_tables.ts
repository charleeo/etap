import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConfigurationTables1702614610233 implements MigrationInterface {
    name = 'CreateConfigurationTables1702614610233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "overstay_rates" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "roome_name" character varying(225) NOT NULL, "weekdays_rate" character varying NOT NULL, "weekend_rate" character varying NOT NULL, CONSTRAINT "UQ_a806761bdb6913103f13342c0be" UNIQUE ("roome_name"), CONSTRAINT "PK_3766dcda1024a693fb0216f5cda" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_types" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(225) NOT NULL, "rate" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "UQ_20180102ff8f034e54c5812f695" UNIQUE ("name"), CONSTRAINT "PK_b6e1d0a9b67d4b9fbff9c35ab69" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "room_types"`);
        await queryRunner.query(`DROP TABLE "overstay_rates"`);
    }

}
