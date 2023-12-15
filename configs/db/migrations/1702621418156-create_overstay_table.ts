import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOverstayTable1702621418156 implements MigrationInterface {
    name = 'CreateOverstayTable1702621418156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservations" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "room_type" character varying(225) NOT NULL, "reservation_id" character varying NOT NULL, "customer_id" character varying NOT NULL, "rate_per_hour" numeric(10,2) NOT NULL, "overstay_price" numeric(10,2) DEFAULT '0', "status" character varying NOT NULL DEFAULT 'paid', "expected_checkin_time" TIMESTAMP NOT NULL, "expected_checkout_time" TIMESTAMP NOT NULL, "actual_checkout_time" TIMESTAMP, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id")); COMMENT ON COLUMN "reservations"."overstay_price" IS 'make it a nullable column incase there is no overstay'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reservations"`);
    }

}
