import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMensajeria1781337186457 implements MigrationInterface {
    name = 'AddMensajeria1781337186457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`programaciones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`salida\` datetime NOT NULL, \`tolerancia\` int NULL, \`estado\` varchar(255) NOT NULL DEFAULT 'programado', \`recurrencia\` varchar(255) NULL, \`conductor_id\` int NULL, \`capacidad_maxima\` int NULL, \`ocupacion_actual\` int NOT NULL DEFAULT '0', \`ruta_id\` int NULL, \`bus_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`metodospago\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipo\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`metodospagociudadano\` (\`id\` int NOT NULL AUTO_INCREMENT, \`id_ciudadano\` varchar(255) NOT NULL, \`saldo\` int NOT NULL, \`monto\` int NOT NULL, \`cargo\` int NOT NULL, \`metodopago_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transacciones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`referencia\` varchar(255) NOT NULL, \`monto\` int NOT NULL, \`fecha\` datetime NOT NULL, \`estado\` varchar(255) NOT NULL, \`metodopagociudadanoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`destinatario_personas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`leido\` tinyint NOT NULL DEFAULT 0, \`mensaje_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`grupo_personas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`rol\` varchar(255) NOT NULL DEFAULT 'miembro', \`bloqueado\` tinyint NOT NULL DEFAULT 0, \`fechaUnion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`grupo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`grupos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`descripcion\` text NULL, \`imagen\` varchar(255) NULL, \`tipo\` varchar(255) NOT NULL DEFAULT 'publico', \`adminId\` varchar(255) NOT NULL, \`adminNombre\` varchar(255) NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 1, \`fechaCreacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`destinatario_grupos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`mensaje_id\` int NULL, \`grupo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mensajes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`emisorId\` varchar(255) NOT NULL, \`emisorNombre\` varchar(255) NOT NULL, \`contenido\` text NOT NULL, \`tipo\` varchar(255) NOT NULL DEFAULT 'directo', \`esUrgente\` tinyint NOT NULL DEFAULT 0, \`fechaEnvio\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP COLUMN \`marca_inicio\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP COLUMN \`marca_fin\``);
        await queryRunner.query(`ALTER TABLE \`paraderos\` ADD \`descripcion\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`rutas\` ADD \`tiempo_estimado\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD \`ciudadano_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD \`metodo_pago_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD \`paradero_abordaje_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD \`paradero_descenso_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD \`fecha_abordaje\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD \`fecha_descenso\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD \`monto\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD \`programacion_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` DROP COLUMN \`latitud\``);
        await queryRunner.query(`ALTER TABLE \`paraderos\` ADD \`latitud\` decimal(10,8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` DROP COLUMN \`longitud\``);
        await queryRunner.query(`ALTER TABLE \`paraderos\` ADD \`longitud\` decimal(11,8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` CHANGE \`clasificacion\` \`clasificacion\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP COLUMN \`estado\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD \`estado\` varchar(255) NOT NULL DEFAULT 'activo'`);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD CONSTRAINT \`FK_365ae3b69628ff0f5c5e24618e0\` FOREIGN KEY (\`programacion_id\`) REFERENCES \`programaciones\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD CONSTRAINT \`FK_d2a2fe9d49e3513d9b2d29b938f\` FOREIGN KEY (\`paradero_abordaje_id\`) REFERENCES \`paraderos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD CONSTRAINT \`FK_9ec25d3123e49c5f2b74c7f68ad\` FOREIGN KEY (\`paradero_descenso_id\`) REFERENCES \`paraderos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`programaciones\` ADD CONSTRAINT \`FK_84ff5ccccc8d03befac42644d23\` FOREIGN KEY (\`ruta_id\`) REFERENCES \`rutas\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`programaciones\` ADD CONSTRAINT \`FK_268023a8b8d040f970ef1183716\` FOREIGN KEY (\`bus_id\`) REFERENCES \`buses\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`metodospagociudadano\` ADD CONSTRAINT \`FK_c77f59278175e2a146dd4f24325\` FOREIGN KEY (\`metodopago_id\`) REFERENCES \`metodospago\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transacciones\` ADD CONSTRAINT \`FK_14eaf29780b39bd6fc2c76a09ed\` FOREIGN KEY (\`metodopagociudadanoId\`) REFERENCES \`metodospagociudadano\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`destinatario_personas\` ADD CONSTRAINT \`FK_1d8d6389fa9ad5f33af51f8fe28\` FOREIGN KEY (\`mensaje_id\`) REFERENCES \`mensajes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`grupo_personas\` ADD CONSTRAINT \`FK_3b9ed35282d946594dba6ca082c\` FOREIGN KEY (\`grupo_id\`) REFERENCES \`grupos\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`destinatario_grupos\` ADD CONSTRAINT \`FK_6d318159e72bfdfa0f1944e43dd\` FOREIGN KEY (\`mensaje_id\`) REFERENCES \`mensajes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`destinatario_grupos\` ADD CONSTRAINT \`FK_518630c5b622e4ce9068d039680\` FOREIGN KEY (\`grupo_id\`) REFERENCES \`grupos\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`destinatario_grupos\` DROP FOREIGN KEY \`FK_518630c5b622e4ce9068d039680\``);
        await queryRunner.query(`ALTER TABLE \`destinatario_grupos\` DROP FOREIGN KEY \`FK_6d318159e72bfdfa0f1944e43dd\``);
        await queryRunner.query(`ALTER TABLE \`grupo_personas\` DROP FOREIGN KEY \`FK_3b9ed35282d946594dba6ca082c\``);
        await queryRunner.query(`ALTER TABLE \`destinatario_personas\` DROP FOREIGN KEY \`FK_1d8d6389fa9ad5f33af51f8fe28\``);
        await queryRunner.query(`ALTER TABLE \`transacciones\` DROP FOREIGN KEY \`FK_14eaf29780b39bd6fc2c76a09ed\``);
        await queryRunner.query(`ALTER TABLE \`metodospagociudadano\` DROP FOREIGN KEY \`FK_c77f59278175e2a146dd4f24325\``);
        await queryRunner.query(`ALTER TABLE \`programaciones\` DROP FOREIGN KEY \`FK_268023a8b8d040f970ef1183716\``);
        await queryRunner.query(`ALTER TABLE \`programaciones\` DROP FOREIGN KEY \`FK_84ff5ccccc8d03befac42644d23\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP FOREIGN KEY \`FK_9ec25d3123e49c5f2b74c7f68ad\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP FOREIGN KEY \`FK_d2a2fe9d49e3513d9b2d29b938f\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP FOREIGN KEY \`FK_365ae3b69628ff0f5c5e24618e0\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP COLUMN \`estado\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD \`estado\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` CHANGE \`clasificacion\` \`clasificacion\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` DROP COLUMN \`longitud\``);
        await queryRunner.query(`ALTER TABLE \`paraderos\` ADD \`longitud\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paraderos\` DROP COLUMN \`latitud\``);
        await queryRunner.query(`ALTER TABLE \`paraderos\` ADD \`latitud\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP COLUMN \`programacion_id\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP COLUMN \`monto\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP COLUMN \`fecha_descenso\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP COLUMN \`fecha_abordaje\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP COLUMN \`paradero_descenso_id\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP COLUMN \`paradero_abordaje_id\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP COLUMN \`metodo_pago_id\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` DROP COLUMN \`ciudadano_id\``);
        await queryRunner.query(`ALTER TABLE \`rutas\` DROP COLUMN \`tiempo_estimado\``);
        await queryRunner.query(`ALTER TABLE \`paraderos\` DROP COLUMN \`descripcion\``);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD \`marca_fin\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`boletos\` ADD \`marca_inicio\` date NOT NULL`);
        await queryRunner.query(`DROP TABLE \`mensajes\``);
        await queryRunner.query(`DROP TABLE \`destinatario_grupos\``);
        await queryRunner.query(`DROP TABLE \`grupos\``);
        await queryRunner.query(`DROP TABLE \`grupo_personas\``);
        await queryRunner.query(`DROP TABLE \`destinatario_personas\``);
        await queryRunner.query(`DROP TABLE \`transacciones\``);
        await queryRunner.query(`DROP TABLE \`metodospagociudadano\``);
        await queryRunner.query(`DROP TABLE \`metodospago\``);
        await queryRunner.query(`DROP TABLE \`programaciones\``);
    }

}
