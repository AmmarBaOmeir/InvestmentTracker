# InvestmentTracker
Investment Tracker helps users monitor investments by recording capital contributions, returns, and additional fund injections. It provides profitability insights, making it easier to identify high- and low-performing investments and decide whether to invest more or explore other opportunities.

## Local auth (development)

Client-side login uses hardcoded credentials in `src/shared/config/auth.ts`:

- **Username:** `admin`
- **Password:** `admin123`

The session is stored in `localStorage` under the key `auth_token`. No backend auth is required for the login gate.

