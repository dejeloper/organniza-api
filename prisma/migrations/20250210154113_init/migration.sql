-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unitId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "placeId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "observation" TEXT,
    "image" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Units" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nemonico" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Places" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatusProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchasesHistoryHeader" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "amountPurchase" INTEGER NOT NULL,
    "totalPurchase" DOUBLE PRECISION NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchasesHistoryHeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchasesHistoryDetail" (
    "id" SERIAL NOT NULL,
    "purchasesHistoryHeaderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "amountProduct" INTEGER NOT NULL DEFAULT 1,
    "unitProduct" INTEGER NOT NULL,
    "subTotalProduct" DOUBLE PRECISION NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchasesHistoryDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistHeader" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChecklistHeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistDetail" (
    "id" SERIAL NOT NULL,
    "checklistHeaderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "pantryAmountProduct" INTEGER NOT NULL,
    "pantryUnitProduct" INTEGER NOT NULL,
    "requiredAmountProduct" INTEGER NOT NULL,
    "requiredUnitProduct" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChecklistDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "StatusProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasesHistoryDetail" ADD CONSTRAINT "PurchasesHistoryDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasesHistoryDetail" ADD CONSTRAINT "PurchasesHistoryDetail_unitProduct_fkey" FOREIGN KEY ("unitProduct") REFERENCES "Units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasesHistoryDetail" ADD CONSTRAINT "PurchasesHistoryDetail_purchasesHistoryHeaderId_fkey" FOREIGN KEY ("purchasesHistoryHeaderId") REFERENCES "PurchasesHistoryHeader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistDetail" ADD CONSTRAINT "ChecklistDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistDetail" ADD CONSTRAINT "ChecklistDetail_pantryUnitProduct_fkey" FOREIGN KEY ("pantryUnitProduct") REFERENCES "Units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistDetail" ADD CONSTRAINT "ChecklistDetail_requiredUnitProduct_fkey" FOREIGN KEY ("requiredUnitProduct") REFERENCES "Units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistDetail" ADD CONSTRAINT "ChecklistDetail_checklistHeaderId_fkey" FOREIGN KEY ("checklistHeaderId") REFERENCES "ChecklistHeader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
