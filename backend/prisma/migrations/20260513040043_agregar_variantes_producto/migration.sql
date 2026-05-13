-- CreateTable
CREATE TABLE `ProductoVariante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productoId` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductoVariante` ADD CONSTRAINT `ProductoVariante_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
