# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Strict Collection Scope**: Only `/messages/{messageId}` is accessible; all other paths default to `allow read, write: if false;`.
2. **Valid Document IDs**: Every `{messageId}` must match `^[a-zA-Z0-9_\-]+$` and have length `<= 128`.
3. **Strict Schema & Volumetric Limits**:
   - `authorName`: required `string`, `1 <= size() <= 80`
   - `message`: required `string`, `1 <= size() <= 500`
   - `song`: optional `string`, `0 <= size() <= 120`
   - `createdAt`: required `timestamp`, must equal `request.time` (`incoming().createdAt == request.time`)
4. **No Shadow Fields**: `data.keys().hasAll(['authorName', 'message', 'createdAt']) && data.keys().hasOnly(['authorName', 'message', 'song', 'createdAt'])`.
5. **Immutable Guestbook**: Once a message is posted, it cannot be updated (`allow update: if false;`) or deleted by arbitrary users (`allow delete: if isAdmin();`).

## 2. The "Dirty Dozen" Payloads
1. **Shadow Field Injection**: `{ authorName: "Ana", message: "Feliz cumple!", createdAt: request.time, isAdmin: true }` -> `PERMISSION_DENIED`
2. **Oversized Author Name**: `{ authorName: "A".repeat(81), message: "Hola", createdAt: request.time }` -> `PERMISSION_DENIED`
3. **Empty Author Name**: `{ authorName: "", message: "Hola", createdAt: request.time }` -> `PERMISSION_DENIED`
4. **Oversized Message**: `{ authorName: "Ana", message: "M".repeat(501), createdAt: request.time }` -> `PERMISSION_DENIED`
5. **Empty Message**: `{ authorName: "Ana", message: "", createdAt: request.time }` -> `PERMISSION_DENIED`
6. **Oversized Song**: `{ authorName: "Ana", message: "Hola", song: "S".repeat(121), createdAt: request.time }` -> `PERMISSION_DENIED`
7. **Non-String Song**: `{ authorName: "Ana", message: "Hola", song: 12345, createdAt: request.time }` -> `PERMISSION_DENIED`
8. **Forged Past Timestamp**: `{ authorName: "Ana", message: "Hola", createdAt: timestamp.date(2020, 1, 1) }` -> `PERMISSION_DENIED`
9. **Missing Required Field (`message`)**: `{ authorName: "Ana", createdAt: request.time }` -> `PERMISSION_DENIED`
10. **Poisoned Document ID**: `messageId = "bad/id$!@#"` -> `PERMISSION_DENIED`
11. **Unauthorized Update Attempt**: Updating an existing message's `message` text -> `PERMISSION_DENIED`
12. **Unauthorized Delete Attempt**: Non-admin attempting to delete a message -> `PERMISSION_DENIED`
