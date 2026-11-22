# Authentication

Picmim's hosted MCP server uses OAuth 2.1 authorization code flow with PKCE and Dynamic Client Registration (DCR).

## Endpoints

| Purpose | URL |
| --- | --- |
| Full MCP server | `https://picmim.com/mcp` |
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

ChatGPT may use a callback-ID-specific URI under `https://chatgpt.com/connector/oauth/` when an authorization server does not meet its stable-callback requirements. Picmim advertises RFC 9207 issuer identification so the stable callback is supported. Dynamic registration accepts approved HTTPS origins, not arbitrary domains.

## Consent and access

Users authenticate directly with Picmim and select workspaces on the consent screen. Picmim may include available capabilities beyond those initially requested by the client; review the consent screen before connecting. OAuth tokens are bound to the Picmim MCP resource URL, the user, the selected workspaces, the registered client, and the consented scopes. Picmim rechecks current membership and role permissions on every call.

New connections receive available supported capabilities by default, including write capabilities. Picmim enables automatic execution by default. The connection owner can restrict capabilities and require approval for writes afterward in Picmim. Write and AI-backed tools remain subject to the granted capabilities, eligible workspace role, feature availability, and applicable workspace credits. Approval requirements depend on connection settings and individual tool policies. When approval-required mode is enabled, writes wait for approval in Picmim.

## Secrets

Never put access tokens, refresh tokens, Passport signing keys, OpenAI challenge tokens, or reviewer credentials in this repository. Review credentials are provided privately in each platform's submission portal.
