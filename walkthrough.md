# Architecture & Database Refactoring Walkthrough

## Summary of Architectural Upgrades

The **Campus Minutes** database architecture has been updated based on Principal Backend Architect review feedback to introduce a **Unified Order Architecture**.

---

## 1. Primary Architectural Refactoring: Unified `Order` Model

- **Change**: Replaced separate `Order` and `PrintOrder` models with a single unified `Order` entity.
- **Order Type Enum**: `OrderType` (`FOOD` | `PRINT`).
- **One-to-Many Food Items**: Food orders map to `OrderItem[]`.
- **One-to-One Print Specifications**: Print orders link to `PrintOrderDetails` (`pdfUrl`, `pages`, `copies`, `colorMode`, `paperSize`, `binding`) via `orderId` unique foreign key.
- **Zero Redundancy**: Common transactional data (`userId`, `vendorId`, `deliveryPartnerId`, `status`, `total`, `deliveryLocation`, `deliveryInstructions`, timestamps) lives exclusively on `Order`.

---

## 2. Standardized Order Lifecycle (`OrderStatus`)

Unified state machine for both food and Xerox printing:
`PLACED` → `CONFIRMED` → `PREPARING` → `READY_FOR_PICKUP` → `OUT_FOR_DELIVERY` → `DELIVERED` | `CANCELLED`

---

## 3. Delivery Partner Simplification

- `DeliveryPartner` relates exclusively to `Order` (`orders Order[]`). Direct relation to `PrintOrder` removed.

---

## 4. Vendor Operational Control (`Vendor`)

- Retained `VendorStatus` (`OPEN`, `CLOSED`, `BUSY`, `INACTIVE`).
- Added `acceptingOrders` boolean (`default true`) allowing vendors to temporarily pause incoming orders without altering store operating status.

---

## 5. Enhanced Notification Schema (`Notification`)

- Replaced `read` boolean with `readAt` (`DateTime?`).
- Replaced `message` with `body`.
- Added `actionUrl` (`String?`) for deep-linking.

---

## 6. Simplified Food Item Specification (`FoodItem`)

- Removed `veg` flag (Campus Minutes serves 100% vegetarian food).
- Maintained `available` boolean (`default true`).

---

## 7. Performance & Indexing Highlights

- Added composite index `[userId, createdAt]` on `orders` for instant, single-query student order history retrieval without `UNION` queries.
- Added composite index `[vendorId, status]` on `orders` for high-throughput live vendor dashboards.
- Indexing `deletedAt` for soft deletion filtering.

---

## Verification Results

| Check                      | Command                   | Status                          |
| -------------------------- | ------------------------- | ------------------------------- |
| **Prisma Generation**      | `npx prisma generate`     | ✅ **v6.19.3 Client Generated** |
| **SQL Migration Script**   | `npx prisma migrate diff` | ✅ **Valid DDL Generated**      |
| **TypeScript Compilation** | `npm run type-check`      | ✅ **0 Errors**                 |
| **ESLint Check**           | `npm run lint`            | ✅ **0 Warnings / Errors**      |
| **Prettier Formatting**    | `npm run format:check`    | ✅ **Passed**                   |
