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
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nemonico" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductStatus_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "Product_enabled_idx" ON "Product"("enabled");

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "Product"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");

-- CreateIndex
CREATE INDEX "Unit_name_idx" ON "Unit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Place_name_key" ON "Place"("name");

-- CreateIndex
CREATE INDEX "Place_name_idx" ON "Place"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductStatus_name_key" ON "ProductStatus"("name");

-- CreateIndex
CREATE INDEX "ProductStatus_name_idx" ON "ProductStatus"("name");

-- CreateIndex
CREATE INDEX "PurchasesHistoryHeader_year_idx" ON "PurchasesHistoryHeader"("year");

-- CreateIndex
CREATE INDEX "PurchasesHistoryHeader_month_idx" ON "PurchasesHistoryHeader"("month");

-- CreateIndex
CREATE INDEX "PurchasesHistoryHeader_createdAt_idx" ON "PurchasesHistoryHeader"("createdAt");

-- CreateIndex
CREATE INDEX "PurchasesHistoryHeader_totalPurchase_idx" ON "PurchasesHistoryHeader"("totalPurchase");

-- CreateIndex
CREATE INDEX "PurchasesHistoryDetail_createdAt_idx" ON "PurchasesHistoryDetail"("createdAt");

-- CreateIndex
CREATE INDEX "PurchasesHistoryDetail_subTotalProduct_idx" ON "PurchasesHistoryDetail"("subTotalProduct");

-- CreateIndex
CREATE INDEX "ChecklistHeader_year_idx" ON "ChecklistHeader"("year");

-- CreateIndex
CREATE INDEX "ChecklistHeader_month_idx" ON "ChecklistHeader"("month");

-- CreateIndex
CREATE INDEX "ChecklistHeader_createdAt_idx" ON "ChecklistHeader"("createdAt");

-- CreateIndex
CREATE INDEX "ChecklistDetail_createdAt_idx" ON "ChecklistDetail"("createdAt");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ProductStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasesHistoryDetail" ADD CONSTRAINT "PurchasesHistoryDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasesHistoryDetail" ADD CONSTRAINT "PurchasesHistoryDetail_unitProduct_fkey" FOREIGN KEY ("unitProduct") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasesHistoryDetail" ADD CONSTRAINT "PurchasesHistoryDetail_purchasesHistoryHeaderId_fkey" FOREIGN KEY ("purchasesHistoryHeaderId") REFERENCES "PurchasesHistoryHeader"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistDetail" ADD CONSTRAINT "ChecklistDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistDetail" ADD CONSTRAINT "ChecklistDetail_pantryUnitProduct_fkey" FOREIGN KEY ("pantryUnitProduct") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistDetail" ADD CONSTRAINT "ChecklistDetail_requiredUnitProduct_fkey" FOREIGN KEY ("requiredUnitProduct") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistDetail" ADD CONSTRAINT "ChecklistDetail_checklistHeaderId_fkey" FOREIGN KEY ("checklistHeaderId") REFERENCES "ChecklistHeader"("id") ON DELETE CASCADE ON UPDATE CASCADE;
