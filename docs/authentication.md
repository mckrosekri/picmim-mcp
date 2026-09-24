# Authentication

Picmim's hosted MCP server uses OAuth 2.1 authorization code flow with PKCE and Dynamic Client Registration (DCR).

## Endpoints

| Purpose | URL |
| --- | --- |
| MCP server | `https://picmim.com/mcp` |
| Protected-resource metadata | `https://picmim.com/.well-known/oauth-protected-resource` |
| Authorization-server metadata | `https://picmim.com/.well-known/oauth-authorization-server` |
| Dynamic client registration | `https://picmim.com/oauth/register` |
| Authorization | `https://picmim.com/oauth/authorize` |
| Token | `https://picmim.com/oauth/token` |
| UserInfo | `https://picmim.com/oauth/userinfo` |
| JWKS | `https://picmim.com/oauth/jwks` |

The metadata is the source of truth. Clients should discover endpoint URLs rather than hardcoding every OAuth path.

## Hosted redirect URIs

- ChatGPT stable callback: `https://chatgpt.com/connector_platform_oauth_redirect`
- Claude hosted callback: `https://claude.ai/api/mcp/auth_callback`

ChatGPT may use a callback-ID-specific URI under `https://chatgpt.com/connector/oauth/` when an authorization server does not meet its stable-callback requirements. Picmim advertises RFC 9207 issuer identification so the stable callback is supported. Dynamic registration accepts approved HTTPS origins, not arbitrary domains.

## Consent and access

Users authenticate directly with Picmim. The consent screen lets them select workspaces and optional capabilities. OAuth tokens are bound to the Picmim user, the selected workspaces, the registered client, and the consented scopes. Picmim rechecks current membership and role permissions on every call.

Default connections are read-only. Write and AI-backed tools require explicit scopes, an eligible workspace role, and available workspace credits. High-impact actions retain Picmim's server-side approval protections.

## Secrets

Never put access tokens, refresh tokens, Passport signing keys, OpenAI challenge tokens, or reviewer credentials in this repository. Review credentials are provided privately in each platform's submission portal.
