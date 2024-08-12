export const msalConfig = {
  auth: {
    clientId: process.env.ENTRA_B2C_CLIENT_ID ?? "",
    authority: `https://${process.env.ENTRA_B2C_TENANT_NAME}.b2clogin.com/${process.env.ENTRA_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.ENTRA_B2C_SUSI_USERFLOW}`,
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
}

export const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
}
