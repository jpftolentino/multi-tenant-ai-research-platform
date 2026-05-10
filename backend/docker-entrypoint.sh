#!/usr/bin/env sh

set -e

SECRET_DIR="/app/.docker-secrets"
SECRET_FILE="$SECRET_DIR/jwt_secret"

mkdir -p "$SECRET_DIR"

if [ ! -f "$SECRET_FILE" ]; then
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" > "$SECRET_FILE"
  echo "Generated new JWT secret"
else
  echo "Using existing JWT secret"
fi

export JWT_SECRET="$(cat "$SECRET_FILE")"
export JWT_EXPIRES_IN="${JWT_EXPIRES_IN:-1h}"

exec "$@"