-- CreateTable
CREATE TABLE `User` (
    `discordId` INTEGER NOT NULL,
    `pteroApiKey` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_discordId_key`(`discordId`),
    UNIQUE INDEX `User_pteroApiKey_key`(`pteroApiKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Safemode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `killList` JSON NOT NULL,
    `stopList` JSON NOT NULL,
    `backupList` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Safemode_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Safemode` ADD CONSTRAINT `Safemode_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`discordId`) ON DELETE RESTRICT ON UPDATE CASCADE;
