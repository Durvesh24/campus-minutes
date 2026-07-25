# Architecture & Authentication Implementation Walkthrough

## Summary of Completed Tasks

The **Passwordless Email OTP Authentication** layer for **Campus Minutes** has been fully implemented using **Better Auth** with the **Prisma PostgreSQL Adapter**.

---

## 1. Authentication Flow Implemented

1. **Email Input (`/login`)**:
   Student/user inputs their email address. Validated and normalized (trimmed + lowercased) via `emailSchema`.
2. **OTP Dispatch**:
   Calls `sendOtpAction(email)`, which executes `auth.api.sendVerificationOTP({ email, type: 'sign-in' })`. Generates a 6-digit OTP code stored in `verifications` table (Sprint 2.2 logs OTP to dev console; Resend integration scheduled for Sprint 2.3).
3. **OTP Input & Verification (`/verify?email=...`)**:
   Student inputs the 6-digit OTP code (`otpSchema` validation). Calls `verifyOtpAction(email, otp)`, executing `auth.api.signInEmailOTP({ email, otp })`.
4. **Automatic User Creation / Session Establishment**:
   - If existing user → Authenticates and creates session.
   - If new user → Automatically creates User record (`UserRole.STUDENT`) without passwords or signup pages.
5. **Secure Session Cookie & Redirect**:
   Issues HTTP-only session cookie (`SameSite=Lax`, 7-day expiration, 1-day rotation) and redirects user to `/app`.

---

## 2. Better Auth Configuration

- **Server Instance ([`src/lib/auth/auth.ts`](file:///d:/All%20Projects/CampusMinutes/src/lib/auth/auth.ts))**:
  - `prismaAdapter(prisma)` targeting PostgreSQL.
  - `emailOTP` plugin with 6-digit code generation & 10-minute expiry.
  - `emailAndPassword: { enabled: false }` (No passwords).
  - Session expiration: 7 days (`expiresIn: 60 * 60 * 24 * 7`).
  - Session rotation: 1 day (`updateAge: 60 * 60 * 24`).
- **Client Instance ([`src/lib/auth/auth-client.ts`](file:///d:/All%20Projects/CampusMinutes/src/lib/auth/auth-client.ts))**:
  - Configured with `createAuthClient` and `emailOTPClient()`.
- **API Handler ([`src/app/api/auth/[...all]/route.ts`](file:///d:/All%20Projects/CampusMinutes/src/app/api/auth/%5B...all%5D/route.ts))**:
  - Exposes Next.js 15 App Router handler via `toNextJsHandler(auth.handler)`.

---

## 3. Database Schema Tables (`prisma/schema.prisma`)

- Added `emailVerified Boolean @default(false)` to `User` model.
- Added `Session` model (`id`, `token`, `expiresAt`, `userId`, `ipAddress`, `userAgent`, timestamps).
- Added `Account` model (`id`, `accountId`, `providerId`, `userId`, tokens, timestamps).
- Added `Verification` model (`id`, `identifier`, `value`, `expiresAt`, timestamps).

---

## 4. Modular Auth Architecture (`src/features/auth/`)

- **`schemas/`**: `auth.schema.ts` (Zod `emailSchema` with lowercasing & `otpSchema`).
- **`types/`**: `auth.types.ts` (`AuthUser`, `AuthSession`, `SendOtpParams`, `VerifyOtpParams`, `AuthActionResult`).
- **`constants/`**: `auth.constants.ts` (`OTP_LENGTH`, `RESEND_COOLDOWN_SECONDS`, `DEFAULT_REDIRECT`).
- **`services/`**: `auth.service.ts` (Server-side session validation via `headers()`).
- **`actions/`**: `send-otp.action.ts` & `verify-otp.action.ts` (Type-safe Server Actions).
- **`hooks/`**: `use-auth.ts` (React hook handling OTP state & cooldown timers).
- **`components/`**: `LoginForm.tsx` & `VerifyForm.tsx` (Clean form UI components).

---

## 5. Page Routes & Documentation

- **`/login`**: Email entry page ([`src/app/login/page.tsx`](file:///d:/All%20Projects/CampusMinutes/src/app/login/page.tsx)).
- **`/verify`**: OTP verification page ([`src/app/verify/page.tsx`](file:///d:/All%20Projects/CampusMinutes/src/app/verify/page.tsx)).
- **`/app`**: Authenticated dashboard target page ([`src/app/app/page.tsx`](file:///d:/All%20Projects/CampusMinutes/src/app/app/page.tsx)).
- **`docs/AUTH.md`**: Complete authentication flow sequence diagram, session architecture, and Better Auth configuration documentation.

---

## Verification Results

| Check                      | Command                | Status                          |
| -------------------------- | ---------------------- | ------------------------------- |
| **Prisma Generation**      | `npx prisma generate`  | ✅ **v6.19.3 Client Generated** |
| **TypeScript Compilation** | `npm run type-check`   | ✅ **0 Errors**                 |
| **Prettier Formatting**    | `npm run format:check` | ✅ **Passed**                   |
