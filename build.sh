#!/usr/bin/env bash
# Render build step. errexit so a failed install/collectstatic/migrate aborts
# the deploy instead of shipping a broken release.
set -o errexit

pip install --upgrade pip
pip install -r requirements.txt

# Gathers static/ (plus admin assets) into staticfiles/ for WhiteNoise.
python manage.py collectstatic --noinput

python manage.py migrate
