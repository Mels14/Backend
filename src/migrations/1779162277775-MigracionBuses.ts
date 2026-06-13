import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionBuses1779162277775 implements MigrationInterface {
    name = 'MigracionBuses1779162277775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`paraderos\` ADD \`descripcion\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` DROP COLUMN \`latitud\``);
        await queryRunner.query(`ALTER TABLE \`paraderos\` ADD \`latitud\` decimal(10,8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` DROP COLUMN \`longitud\``);
        await queryRunner.query(`ALTER TABLE \`paraderos\` ADD \`longitud\` decimal(11,8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` CHANGE \`clasificacion\` \`clasificacion\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`buses\` DROP COLUMN \`fotoBus\``);
        await queryRunner.query(`ALTER TABLE \`buses\` ADD \`fotoBus\` longtext NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`buses\` DROP COLUMN \`fotoBus\``);
        await queryRunner.query(`ALTER TABLE \`buses\` ADD \`fotoBus\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` CHANGE \`clasificacion\` \`clasificacion\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` DROP COLUMN \`longitud\``);
        await queryRunner.query(`ALTER TABLE \`paraderos\` ADD \`longitud\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` DROP COLUMN \`latitud\``);
        await queryRunner.query(`ALTER TABLE \`paraderos\` ADD \`latitud\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` DROP COLUMN \`descripcion\``);
    }

}
