const {
  TYPE: type,
  PROJECT_ID: project_id,
  PRIVATE_KEY_ID: private_key_id,
  PRIVATE_KEY: private_key,
  CLIENT_EMAIL: client_email,
  CLIENT_ID: client_id,
  AUTH_URI: auth_uri,
  TOKEN_URI: token_uri,
  AUTH_PROVIDER_X509_CERT_URL: auth_provider_x509_cert_url,
  CLIENT_X509_CERT_URL: client_x509_cert_url
} = process.env

const credentials = {
    type,
    project_id,
    private_key_id,
    private_key: private_key.replace(/\\n/g, "\n"),
    client_email,
    client_id,
    auth_uri,
    token_uri,
    auth_provider_x509_cert_url,
    client_x509_cert_url
  }

module.exports = credentials
  