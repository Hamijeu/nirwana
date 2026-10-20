# Warning and failure states

## Trying the demo
Open **Mode demo → Simulasi peringatan**. Login failure opens Login and applies to the next valid login submission. Timeout and save failure apply once to the next guarded operation. Offline remains active until **Pulihkan koneksi demo** or selecting Normal. Real browser offline/online events are also observed.

## Covered areas
| Area | Warnings / recovery |
| --- | --- |
| Login | Missing values, invalid mobile number, simulated mismatched credentials, offline and timeout. Retry retains input. No authentication service is connected. |
| Ticket/customer/service/profile-password/staff/settings forms | Required/native field constraints, offline, timeout and save failure. Failed submissions do not call the form handler or clear its draft. |
| Ticket progress/status/archiving | Guarded button operations; archived tickets, invalid transitions and empty progress show error notices instead of green success messages. |
| Voucher correction | Required fields, quantity constraints, stock exceeded and guarded submission. |
| Uploads | 5 MB limit and accepted file-type checks; invalid selection is cleared. A valid replacement dismisses the upload warning. |
| CSV import/export | CSV validation remains available locally; file-read exceptions show a retry notice. Final import and export actions support simulated failure. |
| Map | Existing loading/failure simulator now has an explicit retry button; service list remains available. |
| Nira demo | Local canned conversation is excluded from network submission interception. |

## Verification
Policy tests cover precedence, login-only failures, retry messages, mobile number validation, upload type/size and Indonesian validation copy. Browser checks covered login failure/retry, save/timeout/offline preserving a report draft, successful retry producing one new ticket, map retry, invalid/oversized/valid replacement CSV, required-field alerts and mobile banner bounds.

No real authentication, remote persistence, model, or backend connectivity was introduced. Network/server failures are demonstrable UI states.
